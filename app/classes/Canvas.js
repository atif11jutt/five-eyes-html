import gsap from "gsap";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";

import vertex from "../shaders/cyberSec-vertex.glsl";
import fragment from "../shaders/cyberSec-fragment.glsl";

export default class Canvas {
  constructor(options) {
    this.canvas = options.canvas;

    this.settings = {
      height: this.canvas.getBoundingClientRect().height,
      width: this.canvas.getBoundingClientRect().width
    };

    this.time = 0;

    this.addCamera();
    this.addRenderer();

    this.resize();
    this.setupResize();
    this.addControls(options.geometryType);

    this.addObjects(
      options.geometryType,
      options.vertexFile,
      options.fragmentFile
    );
    // this.addGui();

    this.render();
  }

  addObjects(geometryType, vertexFile, fragmentFile) {
    this.getGeometryType(geometryType);

    this.material = new THREE.ShaderMaterial({
      wireframe: true,
      transparent: true,
      uniforms: {
        time: { value: this.time },
        resolution: { value: new THREE.Vector2() },
        color1: { value: 0.59 },
        color2: { value: 0.66 },
        color3: { value: 0.77 },
        hover: { value: new THREE.Vector2(0.5, 0.5) }
      },
      vertexShader: vertexFile,
      fragmentShader: fragmentFile
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    if (!(geometryType === "torus" || geometryType === "mainBall")) {
      this.mesh.rotation.x = Math.PI;
    } else if (geometryType === "mainBall") {
      this.mesh.rotation.x = 1.9;
    } else if (geometryType === "contacts" && geometryType === "careers") {
      this.mesh.rotation.x = -Math.PI;
    } else {
      this.mesh.rotation.x = -Math.PI / 2;
      this.mesh.rotation.z = -Math.PI / 2;
    }

    this.scene.add(this.mesh);

    this.canvas.addEventListener("mousemove", () => {
      gsap.to(this.material.uniforms.hoverState, {
        duration: 1,
        value: 1,
        ease: "expo.out"
      });
    });

    this.canvas.addEventListener("mouseleave", () => {
      gsap.to(this.material.uniforms.hoverState, {
        duration: 1,
        value: 0,
        ease: "expo.out"
      });
    });
  }

  getGeometryType(geometry) {
    if (geometry === "dodecahedron") {
      this.geometry = new THREE.DodecahedronBufferGeometry(
        this.settings.width / 20,
        10
      );
    } else if (geometry === "plane") {
      this.geometry = new THREE.DodecahedronBufferGeometry(
        this.settings.width / 20,
        20
      );
    } else if (geometry === "torus") {
      this.geometry = new THREE.DodecahedronBufferGeometry(
        this.settings.width / 22,
        10
      );
    } else if (geometry === "plane2") {
      this.geometry = new THREE.DodecahedronBufferGeometry(
        this.settings.width / 20,
        16
      );
    } else if (geometry === "mainBall") {
      this.geometry = new THREE.DodecahedronBufferGeometry(
        this.settings.width / 16,
        28
      );
    } else if (geometry === "contacts") {
      this.geometry = new THREE.DodecahedronBufferGeometry(
        this.settings.width / 24,
        10
      );
    } else if (geometry === "careers") {
      this.geometry = new THREE.DodecahedronBufferGeometry(
        this.settings.width / 24,
        10
      );
    }
  }

  addGui() {
    this.gui = new dat.GUI();
    this.gui
      .add(this.material.uniforms.color1, "value", 0, 2)
      .name("Color")
      .step(0.01)
      .min(0)
      .max(1);

    this.gui
      .add(this.material.uniforms.color2, "value", 0, 2)
      .name("Color 2")
      .step(0.01)
      .min(0)
      .max(1);

    this.gui
      .add(this.material.uniforms.color3, "value", 0, 2)
      .name("Color 3")
      .step(0.01)
      .min(0)
      .max(1);

    // this.gui.add(this.mesh.rotation, "x").name("Angle");
  }

  addControls(geometryType) {
    this.controls = new OrbitControls(this.camera, this.canvas);

    if (geometryType === "mainBall") {
      this.controls.enabled = false;
    }

    this.controls.enableZoom = false;
  }

  addRenderer() {
    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      canvas: this.canvas
    });
    this.renderer.setSize(this.settings.width, this.settings.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // this.container.appendChild(this.renderer.domElement);
  }

  addCamera() {
    this.camera = new THREE.PerspectiveCamera(
      45,
      this.settings.width / this.settings.height,
      1.0,
      2000
    );
    this.camera.position.z = 50;
  }

  /**
   * Calculates the right Three.js FOV
   * @returns FOV calculations
   */
  getFOV() {
    let height = this.settings.height;

    let fov = Math.atan(height / (2 * this.camera.position.z)) * 2;

    return (fov / Math.PI) * 180;
  }

  resize() {
    this.settings.height = this.canvas.getBoundingClientRect().height;
    this.settings.width = this.canvas.getBoundingClientRect().width;
    

    // this.camera.fov = this.getFOV();
    this.camera.aspect = this.settings.width / this.settings.height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.settings.width, this.settings.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  setupResize() {
    window.addEventListener("resize", this.resize.bind(this));
  }

  render() {
    this.time += 0.05;
    this.material.uniforms.time.value = this.time;

    // this.setMeshScale(this.mesh);

    this.renderer.render(this.scene, this.camera);

    requestAnimationFrame(this.render.bind(this));
  }
}
