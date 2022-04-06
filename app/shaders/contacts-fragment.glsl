
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
  vec3(0. - vUv.y / 5.,
  0.64 - vUv.y / 5.,
  0.85 - vUv.y / 5.),
  0.2);
}