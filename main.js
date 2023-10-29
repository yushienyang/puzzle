let scene, camera, renderer, model;

init();
animate();

function init() {
    // Scene
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Resize listener
    window.addEventListener('resize', function() {
        let width = window.innerWidth;
        let height = window.innerHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });

    // Load 3D model
    const loader = new THREE.GLTFLoader();
    loader.load('https://cdn.glitch.global/a6278515-94c6-4213-9280-e53c4ee3fa94/tropical_dog_house.glb?v=1698603139744', function(gltf) {
        model = gltf.scene;
        scene.add(model);
    });

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(2, 2, 2);
    scene.add(directionalLight);
}

function animate() {
    requestAnimationFrame(animate);
    if (model) model.rotation.y += 0.005;
    renderer.render(scene, camera);
}
