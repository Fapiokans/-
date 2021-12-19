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
  camera.position.set(0, 0, +40);
  const controls = new THREE.OrbitControls(camera, document.body);
  
  //ライト
  const environment = new THREE.AmbientLight(0xFFFFFF, 1);
  scene.add(environment);
  
  //オブジェ
  let box = [];
  let x = 20;
  let y = 20;
  let a = generatePerlinNoise(x,y);
  let g = new THREE.BoxGeometry(1,1,1);
  let m =  [new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load('https://media.discordapp.net/attachments/913725588349517844/922137332688232458/grass_side_carried.png')}),new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load('https://media.discordapp.net/attachments/913725588349517844/922137332688232458/grass_side_carried.png')}),new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load('https://media.discordapp.net/attachments/913725588349517844/922137282159444008/grass_carried.png')}),new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load('https://media.discordapp.net/attachments/913725588349517844/922137178069430292/dirt.png')}),new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load('https://media.discordapp.net/attachments/913725588349517844/922137332688232458/grass_side_carried.png')}),new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load('https://media.discordapp.net/attachments/913725588349517844/922137332688232458/grass_side_carried.png')})];
  
  for(let i =0;i<x;i++){
    for(let j =0;j<y;j++){
      box[j] = new THREE.Mesh(g,m);
    box[j].position.x = i;
    box[j].position.z = j;
    box[j].position.y = Math.round(a[(i*x)+j]*7);
    scene.add(box[j]);
    }
  }
  
  //ループ
  tick();
  function tick() {
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
}
