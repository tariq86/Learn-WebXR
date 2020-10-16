import * as THREE from '../../libs/three/three.module.js';
import { OrbitControls } from '../../libs/three/jsm/OrbitControls.js';

class App {
    constructor() {
        const viewHeight = window.innerHeight;
        const viewWidth = window.innerWidth;
        // Create a main div
        const container = document.createElement('div');
        // Add it to the DOM
        document.body.appendChild(container);

        // Create Camera (FOV in degrees, Aspect Ratio, "Near Plane", "Far Plane")
        // Anything nearer than the Near Plane, or father than the Far Plane, will be hidden
        this.camera = new THREE.PerspectiveCamera(60, viewWidth / viewHeight, 0.1, 100);
        // Position the camera
        this.camera.position.set(0, 0, 4);

        // Create your Scene
        this.scene = new THREE.Scene();
        // Set the background of the scene
        this.scene.background = new THREE.Color(0xaaaaaa);

        // Turn on the lights
        // Create + add a global light source first
        const ambient = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 0.3);
        this.scene.add(ambient);
        // Create a second directional light
        const light = new THREE.DirectionalLight();
        light.position.set(0.2, 1, 1);
        this.scene.add(light);

        // Create WebGL Renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        // Set the renderer's pixel ratio to match the device's pixel ratio
        this.renderer.setPixelRatio(window.devicePixelRatio);
        // Set the size and width of the renderer to match the current viewport
        this.renderer.setSize(viewWidth, viewHeight);
        // Bind the renderer DOM element to the current HTML page
        container.appendChild(this.renderer.domElement);
        // Call the render() function for every animation loop
        this.renderer.setAnimationLoop(this.render.bind(this));

        // Create a Cube
        const geometry = new THREE.BoxBufferGeometry();
        const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
        this.mesh = new THREE.Mesh(geometry, material);
        this.scene.add(this.mesh);

        const controls = new OrbitControls(this.camera, this.renderer.domElement);

        // Call the resize function on window resize
        window.addEventListener('resize', this.resize.bind(this));
    }

    resize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    /**
     * Render the scene!
     */
    render() {
        this.mesh.rotateY(0.01);
        // Render the scene!
        this.renderer.render(this.scene, this.camera);
    }
}

export { App };