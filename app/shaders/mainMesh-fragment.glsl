
uniform float time;
uniform sampler2D uTexture;
uniform float color1;
uniform float color2;
uniform float color3;

varying float pulse;
varying vec2 vUv;  // between 0 and 1
varying vec3 vNormal;

void main() {
  gl_FragColor =
    vec4(
      vec3(color1 - vUv.y / 3.,
      color2 - vUv.x / 5.,
      color3 - vUv.x / 5.),
      0.4);

  gl_FragColor =
    vec4(
      vec3(0.28 - vUv.y / 3.,
      0.66 - vUv.x / 5.,
      0.77 - vUv.y / 5.),
      0.15);
}