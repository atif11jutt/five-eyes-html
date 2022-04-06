
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
    vec4(vec3(0.7 - vUv.y / 2.,
    0.54 - vUv.x / 5.,
    0.81 - vUv.y / 5.),
    0.4);

  gl_FragColor =
    vec4(vec3(0.45 - vUv.y / 2.,
    0.6 - vUv.x / 5.,
    0.8 - vUv.y / 5.),
    0.4);
}