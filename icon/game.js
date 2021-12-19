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
  
  const directionalLight = new THREE.DirectionalLight('#ffffff', 1);
  directionalLight.position.set(0, 10, 400);
  scene.add(directionalLight);
  
  //オブジェ
  const geometry = new THREE.BoxGeometry(200,200,200);
  const texture = THREE.ImageUtils.loadTexture('hi.png');
  const material = new THREE.MeshPhongMaterial({map: texture});
  const box = new THREE.Mesh(geometry, material);
  scene.add(box);
  
  //ループ
  tick();
  function tick() {
    box.rotation.y += 0.01;
    box.rotation.x += 0.01;
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
}
