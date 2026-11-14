export const vertexShader = `
  attribute vec3 aColor;
  attribute vec3 aTarget;
  attribute vec3 aSeed;
  uniform vec2 uViewport;
  uniform vec4 uPortrait;
  uniform vec4 uLine;
  uniform vec3 uAccent;
  uniform float uMorph;
  uniform float uTravel;
  uniform float uFade;
  uniform vec4 uFlow;
  uniform vec2 uSpread;
  uniform vec4 uPointer;
  uniform float uDensity;
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
    float turn = uFlow.w * 9.42477796;
    float wave = uFlow.w * 12.56637061;
    float flow = uFlow.w * 48.0;
    float lane = aTarget.x * 2.0;
    float phase = lane * 3.14159265 + aSeed.y * 2.4;
    float pace = 0.85 + aSeed.x * 0.2;
    float bend = pow(abs(sin(turn)), 4.0);
    float lag = (lane * 0.16 + aSeed.y * 0.07) * sin(uFlow.w * 3.14159265);
    vec2 current = vec2(
      sin(flow * pace + phase) * 0.28 + cos(flow * 0.61 - aSeed.y * 4.0) * 0.18,
      cos(flow * pace * 0.83 + phase) * 0.34 + sin(flow * 0.73 + aSeed.x * 5.0) * 0.22
    );
    vec2 drift = vec2(
      (sin(turn) - sin(turn + lag)) * uFlow.z,
      (sin(wave + lag * 1.6) - sin(wave)) * uViewport.y * 0.1
    );
    vec2 spread = vec2(
      (aSeed.x * 0.48 + current.x) * uSpread.x * (1.12 - bend * 0.28),
      (aSeed.y * 0.42 + current.y) * uSpread.y * (0.7 + bend * 0.45)
    );
    spread += vec2(
      sin(flow * 0.9 + aSeed.y * 5.0 + lane * 2.0),
      cos(flow * 0.8 + aSeed.x * 4.0 - lane * 3.0)
    ) * bend * uSpread.y * 0.16;
    vec2 swimming = uFlow.xy + drift + spread;
    p = mix(p, swimming, uTravel);
    float interaction = smoothstep(0.18, 0.65, uMorph) * uPointer.w;
    vec2 delta = p - uPointer.xy;
    float distance = length(delta);
    float influence = 1.0 - smoothstep(uPointer.z, uPointer.z * 2.0, distance);
    vec2 direction = distance > 0.001 ? delta / distance : vec2(cos(aSeed.z * 6.2831853), sin(aSeed.z * 6.2831853));
    float push = sqrt(distance * distance + uPointer.z * uPointer.z) - distance;
    float orbit = influence * interaction * 0.22;
    direction = vec2(direction.x * cos(orbit) - direction.y * sin(orbit), direction.x * sin(orbit) + direction.y * cos(orbit));
    p += direction * push * influence * interaction;
    gl_Position = vec4(p.x / uViewport.x * 2.0 - 1.0, 1.0 - p.y / uViewport.y * 2.0, 0.0, 1.0);
    gl_PointSize = mix(uSize, 1.65, morph) * uDpr;
    vColor = mix(aColor, uAccent, smoothstep(0.02, 0.65, morph));
    float member = 1.0 - smoothstep(uDensity * 0.85, uDensity, aSeed.z);
    float opacity = mix(mix(0.92, 0.12, morph), 0.56 * member, uTravel);
    vAlpha = opacity * (1.0 - uFade);
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
