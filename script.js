const canvas = document.getElementById("bg");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);

const particleCount = 1200;
const geometry = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);
for (let i = 0; i < particleCount * 3; i++) positions[i] = (Math.random() - .5) * 25;
geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
const material = new THREE.PointsMaterial({ color: 0x00f7ff, size: .025, transparent: true, opacity: .7 });
const particles = new THREE.Points(geometry, material);
scene.add(particles);

const sphereGeometry = new THREE.IcosahedronGeometry(2.5, 2);
const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x00f7ff, wireframe: true, transparent: true, opacity: .08 });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);

let mouseX = 0, mouseY = 0;
document.addEventListener("mousemove", e => {
    mouseX = e.clientX / window.innerWidth - .5;
    mouseY = e.clientY / window.innerHeight - .5;
});