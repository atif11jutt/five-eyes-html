
uniform float time;
uniform sampler2D uTexture;
uniform float color1;
uniform float color2;
uniform float color3;

varying float pulse;
varying vec2 vUv;  // between 0 and 1
varying vec3 vNormal;

void main() {
  gl_FragColor = vec4(vec3(color1 - vUv.y / 5., color2 - vUv.y / 5. , color3 - vUv.y / 5.), 1.);
  // gl_FragColor = vec4(vec3(color1 - vUv.x, color2 - vUv.x , color3 - vUv.x ), 1.);
  // gl_FragColor = vec4(color, 0., 0., 1.);
  // 0.16 / 0.82 / 0.76
  // gl_FragColor = vec4(0.56 - vUv.y, 0.67 - vUv.y, 0.77 - vUv.y, 1.);
  // gl_FragColor = vec4(0.81 - vUv.y, 0.82 - vUv.y, 1. - vUv.y, 1.);
  // gl_FragColor = vec4(0.57 - vUv.y, 0.83 - vUv.y, 0.87 - vUv.y, 1.);
  // gl_FragColor = vec4(vec3(0. - vUv.y / 5., 0.34 - vUv.y / 5. , 0.49 - vUv.y / 5.), 1.);
  
  
  // gl_FragColor =
  //   vec4(vec3(color1 - vUv.y / 2.,
  //   color2 - vUv.x / 5.,
  //   color3 - vUv.y / 5.),
  //   0.2);

  gl_FragColor =
    vec4(vec3(0. - vUv.y / 5.,
    0.63 - vUv.y / 5.,
    0.77 - vUv.y / 5.),
    0.15);
}