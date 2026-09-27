export async function samplePortrait(image: HTMLImageElement, count: number) {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const context = canvas.getContext('2d', { willReadFrequently: true });
  if (!context) throw new Error('Portrait sampling is unavailable');
  context.beginPath();
  context.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
  context.clip();
  context.drawImage(image, 0, 0, size, size);
  const { data } = context.getImageData(0, 0, size, size);
  const luminance = new Float32Array(size * size);
  const distribution = new Float32Array(size * size);
  const position = new Float32Array(count * 3);
  const color = new Float32Array(count * 3);
  const target = new Float32Array(count * 3);
  const seed = new Float32Array(count * 3);
  const linear = (value: number) => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  let state = 4187;
  const random = () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 4294967296;
  };
  for (let i = 0; i < luminance.length; i++) {
    luminance[i] = (data[i * 4] * 0.299 + data[i * 4 + 1] * 0.587 + data[i * 4 + 2] * 0.114) / 255;
  }
  let total = 0;
  for (let i = 0; i < distribution.length; i++) {
    const edge = Math.abs(luminance[i] - luminance[Math.min(i + 1, luminance.length - 1)])
      + Math.abs(luminance[i] - luminance[Math.min(i + size, luminance.length - 1)]);
    total += data[i * 4 + 3] / 255 * (0.35 + Math.min(edge * 4, 1));
    distribution[i] = total;
  }
  if (!total) throw new Error('Portrait contains no visible pixels');
  for (let i = 0; i < count; i++) {
    const weight = random() * total;
    let low = 0;
    let high = distribution.length - 1;
    while (low < high) {
      const middle = (low + high) >>> 1;
      if (distribution[middle] <= weight) low = middle + 1;
      else high = middle;
    }
    const offset = i * 3;
    position[offset] = ((low % size) + random()) / size - 0.5;
    position[offset + 1] = (Math.floor(low / size) + random()) / size - 0.5;
    for (let channel = 0; channel < 3; channel++) color[offset + channel] = linear(data[low * 4 + channel] / 255);
    target[offset] = random() - 0.5;
    target[offset + 1] = (random() + random() - 1) * 0.5;
    seed[offset] = random() * 2 - 1;
    seed[offset + 1] = random() * 2 - 1;
    seed[offset + 2] = random();
    if (i % 4096 === 4095) await new Promise<void>((resolve) => setTimeout(resolve, 0));
  }
  return { position, color, target, seed };
}
