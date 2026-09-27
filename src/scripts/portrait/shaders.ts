export const vertexShader = `
  attribute vec3 aColor;
  attribute vec3 aTarget;
  attribute vec3 aSeed;
  uniform vec2 uViewport;
  uniform vec4 uPortrait;
  uniform vec4 uLine;
  uniform vec3 uAccent;
  uniform float uMorph;
  uniform float uFall;
  uniform float uDpr;
  uniform float uSize;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float morph = smoothstep(aSeed.z * 0.12, 0.88 + aSeed.z * 0.12, uMorph);
    vec2 photo = uPortrait.xy + position.xy * uPortrait.zw;
    vec2 line = uLine.xy + aTarget.xy * uLine.zw;
    vec2 p = mix(photo, line, morph);
    float cloud = sin(morph * 3.14159265);
    p += vec2(aSeed.x * min(uPortrait.z, 150.0), aSeed.y * 75.0) * cloud;
    p.x += aSeed.x * uFall * 80.0;
    p.y += uFall * (uViewport.y * 0.48 + aSeed.z * 100.0);
    gl_Position = vec4(p.x / uViewport.x * 2.0 - 1.0, 1.0 - p.y / uViewport.y * 2.0, 0.0, 1.0);
    gl_PointSize = mix(uSize, 1.65, morph) * uDpr;
    vColor = mix(aColor, uAccent, smoothstep(0.02, 0.65, morph));
    vAlpha = mix(0.92, 0.12, morph) * (1.0 - smoothstep(0.0, 1.0, uFall));
  }
`;

export const fragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float radius = length(gl_PointCoord - 0.5);
    float alpha = (1.0 - smoothstep(0.25, 0.5, radius)) * vAlpha;
    if (alpha < 0.003) discard;
    gl_FragColor = vec4(vColor, alpha);
    #include <colorspace_fragment>
  }
`;
