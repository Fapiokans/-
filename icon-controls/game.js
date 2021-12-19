window.addEventListener('load', init);
function init() {
  //レンダラー
  const width = window.innerWidth;
  const height = window.innerHeight;
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#my')
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  
  //スクリーン
  const scene = new THREE.Scene();
  
  //カメラ
  const camera = new THREE.PerspectiveCamera(45, width / height);
  camera.position.set(0, 0, +1000);
  const controls = new THREE.OrbitControls(camera, document.body);
  
  //オブジェ
  const geometry = new THREE.BoxGeometry(200,200,200);
  const material = new THREE.MeshStandardMaterial({map:new THREE.TextureLoader().load('https://media.discordapp.net/attachments/913725588349517844/922024797632864286/pro.fapiokan.png')});
  const box = new THREE.Mesh(geometry, material);
  scene.add(box);
  
  const loader = new THREE.TextureLoader();
  
  //ライト
  const environment = new THREE.AmbientLight(0xFFFFFF, 0.1);
  scene.add(environment);
  
  const directionalLight = new THREE.PointLight(0xFFFFFF, 4, 1000, 2.4);
  directionalLight.position.set(320, 450, 400);
  scene.add(directionalLight);
  
  //ループ
  tick();
  function tick() {
    directionalLight.rotation.x += 1;
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
}