
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
    vec4(vec3(0.87 - vUv.x / 2.,
    0.47 - vUv.x / 5.,
    0.55 - vUv.y / 5.),
    0.9);
}