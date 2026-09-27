import { BufferAttribute, BufferGeometry, Camera, Color, Points, Scene, ShaderMaterial, Vector2, Vector4, WebGLRenderer } from 'three';
import { samplePortrait } from './sampling';
import { fragmentShader, vertexShader } from './shaders';

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const smooth = (from: number, to: number, value: number) => {
  const t = clamp((value - from) / (to - from));
  return t * t * (3 - 2 * t);
};

export async function mountPortrait(image: HTMLImageElement, title: HTMLElement, underline: HTMLElement) {
  const device = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  if (device.connection?.saveData || (device.deviceMemory !== undefined && device.deviceMemory < 2)) return;
  const compact = matchMedia('(pointer: coarse)').matches || innerWidth < 600
    || (device.deviceMemory ?? 8) <= 4 || (device.hardwareConcurrency || 8) <= 4;
  const count = compact ? 22000 : 44000;
  const samples = await samplePortrait(image, count);
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('webgl2', { alpha: true, antialias: false, powerPreference: 'low-power', failIfMajorPerformanceCaveat: true });
  if (!context) return;
  const stage = document.createElement('div');
  stage.className = 'portrait-stage';
  stage.setAttribute('aria-hidden', 'true');
  stage.append(canvas);
  const renderer = new WebGLRenderer({ canvas, context, alpha: true, antialias: false });
  const geometry = new BufferGeometry();
  const uniforms = {
    uViewport: { value: new Vector2() },
    uPortrait: { value: new Vector4() },
    uLine: { value: new Vector4() },
    uAccent: { value: new Color(getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()) },
    uMorph: { value: 0 },
    uFall: { value: 0 },
    uDpr: { value: 1 },
    uSize: { value: 2 },
  };
  geometry.setAttribute('position', new BufferAttribute(samples.position, 3));
  geometry.setAttribute('aColor', new BufferAttribute(samples.color, 3));
  geometry.setAttribute('aTarget', new BufferAttribute(samples.target, 3));
  geometry.setAttribute('aSeed', new BufferAttribute(samples.seed, 3));
  const material = new ShaderMaterial({ uniforms, vertexShader, fragmentShader, transparent: true, depthTest: false, depthWrite: false });
  const points = new Points(geometry, material);
  points.frustumCulled = false;
  const scene = new Scene();
  scene.add(points);
  const camera = new Camera();
  const events = new AbortController();
  let disposed = false;
  let frame = 0;
  let previous = 0;
  let progress = window.scrollY;
  let morphEnd = 1;
  let fadeStart = 1;
  let fadeEnd = 1;
  let photo = new DOMRect();
  let line = new DOMRect();
  let needsLayout = true;
  let slowFrames = 0;
  let severeFrames = 0;
  let drawCount = count;
  let resizeObserver: ResizeObserver | undefined;

  const dispose = () => {
    if (disposed) return;
    disposed = true;
    cancelAnimationFrame(frame);
    events.abort();
    resizeObserver?.disconnect();
    image.style.removeProperty('opacity');
    stage.remove();
    geometry.dispose();
    material.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
  };

  const measure = () => {
    const imageRect = image.getBoundingClientRect();
    const lineRect = underline.getBoundingClientRect();
    const titleRect = title.getBoundingClientRect();
    const headerHeight = document.querySelector('header')?.getBoundingClientRect().height ?? 86;
    photo = new DOMRect(imageRect.x + scrollX, imageRect.y + scrollY, imageRect.width, imageRect.height);
    line = new DOMRect(lineRect.x + scrollX, lineRect.y + scrollY, lineRect.width, lineRect.height);
    morphEnd = Math.max(90, (titleRect.top + scrollY - headerHeight) * 0.62);
    fadeStart = morphEnd + Math.max(45, titleRect.height * 0.45);
    fadeEnd = fadeStart + Math.max(170, innerHeight * 0.33);
    renderer.setPixelRatio(Math.min(devicePixelRatio, compact ? 1.5 : 2));
    const width = document.documentElement.clientWidth;
    renderer.setSize(width, innerHeight, false);
    uniforms.uViewport.value.set(width, innerHeight);
    uniforms.uDpr.value = renderer.getPixelRatio();
    uniforms.uSize.value = Math.max(1.5, photo.width / Math.sqrt(drawCount) * 1.7);
    needsLayout = false;
  };

  const requestFrame = () => {
    if (!disposed && !document.hidden && !frame) frame = requestAnimationFrame(render);
  };

  const render = (now: number) => {
    frame = 0;
    if (disposed || document.hidden) return;
    const elapsed = previous ? now - previous : 16;
    previous = now;
    if (needsLayout) measure();
    progress += (scrollY - progress) * (1 - Math.exp(-Math.min(elapsed, 64) / 110));
    if (Math.abs(scrollY - progress) < 0.15) progress = scrollY;
    const morph = clamp(progress / morphEnd);
    const fall = smooth(fadeStart, fadeEnd, progress);
    uniforms.uMorph.value = morph;
    uniforms.uFall.value = fall;
    uniforms.uPortrait.value.set(photo.x + photo.width / 2 - scrollX, photo.y + photo.height / 2 - scrollY, photo.width, photo.height);
    uniforms.uLine.value.set(line.x + line.width / 2 - scrollX, line.y + line.height / 2 - scrollY, line.width, line.height);
    const dissolve = smooth(0, 0.18, morph);
    image.style.opacity = String(1 - dissolve);
    stage.style.opacity = String(smooth(0, 0.08, morph));
    stage.hidden = progress === 0 || fall === 1;
    try {
      if (!stage.hidden) renderer.render(scene, camera);
    } catch {
      dispose();
      return;
    }
    if (elapsed > 34 && elapsed < 200 && morph > 0 && fall < 1) slowFrames++;
    else slowFrames = Math.max(0, slowFrames - 1);
    severeFrames = elapsed > 200 && elapsed < 1000 ? severeFrames + 1 : 0;
    if (severeFrames >= 10) { dispose(); return; }
    if (slowFrames > 35 && drawCount > 8000) {
      drawCount = Math.max(8000, Math.floor(drawCount * 0.65));
      geometry.setDrawRange(0, drawCount);
      slowFrames = 0;
      uniforms.uSize.value = Math.max(1.5, photo.width / Math.sqrt(drawCount) * 1.7);
    }
    if (progress !== scrollY) requestFrame();
    else previous = 0;
  };

  const relayout = () => { needsLayout = true; requestFrame(); };
  const options = { passive: true, signal: events.signal };
  window.addEventListener('scroll', requestFrame, options);
  window.addEventListener('resize', relayout, options);
  window.visualViewport?.addEventListener('resize', relayout, options);
  document.addEventListener('visibilitychange', () => {
    cancelAnimationFrame(frame);
    frame = 0;
    previous = 0;
    if (!document.hidden) relayout();
  }, { signal: events.signal });
  canvas.addEventListener('webglcontextlost', dispose, { signal: events.signal });
  renderer.debug.onShaderError = dispose;
  if ('ResizeObserver' in window) {
    resizeObserver = new ResizeObserver(relayout);
    resizeObserver.observe(title);
    resizeObserver.observe(image);
    resizeObserver.observe(document.body);
  }
  document.body.append(stage);
  requestFrame();
  return dispose;
}
