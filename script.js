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


function animate() {
    requestAnimationFrame(animate);
    particles.rotation.y += .0007;
    particles.rotation.x += .0002;
    sphere.rotation.x += .0005;
    sphere.rotation.y += .001;
    camera.position.x += (mouseX * .4 - camera.position.x) * .02;
    camera.position.y += (-mouseY * .4 - camera.position.y) * .02;
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

const cards = document.querySelectorAll(".skill-card,.project-card,.timeline-item");
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, { threshold: .15 });

cards.forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(40px)";
    card.style.transition = "opacity .7s ease,transform .7s ease";
    observer.observe(card);
});

document.getElementById("contactForm").addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    alert(`Thanks ${name}! Your message has been received.`);
    e.target.reset();
});
