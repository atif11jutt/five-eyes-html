
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
      vec3(0.57 - vUv.y / 2.,
      0.37 - vUv.x / 5.,
      0.58 - vUv.y / 5.),
      0.4);
  gl_FragColor =
    vec4(
      vec3(0.66 - vUv.y / 2.,
      0.43 - vUv.x / 5.,
      0.75 - vUv.y / 5.),
      0.4);
}