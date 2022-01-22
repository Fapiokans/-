let i;
let end = 0;
document.getElementById("endv").load()
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
  const box = new THREE.Mesh(
    new THREE.SphereBufferGeometry(120, 30, 30),
    new THREE.MeshPhongMaterial({
      map:THREE.ImageUtils.loadTexture('e.jpg')
    })
  );
  
  const img = new THREE.Mesh(
    new THREE.PlaneGeometry(85, 85, 1, 1),
    new THREE.MeshPhongMaterial({
      map:THREE.ImageUtils.loadTexture(i)
    })
  )
  
  scene.add(box);
  scene.add(img);
  
  img.position.x=30;
  
  //ループ
  tick();
  function tick() {
    end++;
    if(end==500){
      document.getElementById("endv").style.display = "block";
      document.getElementById("endv").play()
    }
    box.rotation.y += 0.01;
    img.position.x += 0.4;
    img.position.y += 0.4;
    img.rotation.z -= 0.05;
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
}

function fileChanged(input) {
  let reader = new FileReader();
  reader.onload = (function() {
    i = reader.result;
    document.getElementById("endv").style.display = "none";
    init()
  })
  reader.readAsDataURL(input.files[0]);
}