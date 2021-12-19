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
  camera.position.set(0, 0, +100);
  const controls = new THREE.OrbitControls(camera, document.body);
  
  //オブジェ
  new THREE.MTLLoader().setPath('obj/').load('tapi.mtl',function(materials){
    materials.preload();
    new THREE.OBJLoader().setPath('obj/').setMaterials(materials).load('tapi.obj',function (object){
      scene.add(object);
    })
  })
  
  //ライト
  const light = new THREE.AmbientLight(0xFFFFFF, 1.0);
  scene.add(light);
  
  const directionalLight = new THREE.PointLight(0xFFFFFF, 4, 2, 1);
  directionalLight.position.set(-320, 450, 400);
  scene.add(directionalLight);
  
  //ループ
  tick();
  function tick() {
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
}