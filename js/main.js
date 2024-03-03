import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

export const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.PCFSoftShadowMap;
camera.position.set(0,15,50);

const grid = new THREE.GridHelper(50,10);
scene.add(grid);

// Controles de órbita da visualização 3D
const controls = new OrbitControls(camera, renderer.domElement);
// controls.enablePan = false;

export let activeObject = null;
// MODELO 3D CUSTOM
const loader = new GLTFLoader(); //Instância do GLTFLoader
const objToRender = 'eredin'     //Modelo a ser carregado
export let loadedObject = null;         //Armazenara o objeto do modelo 3D
loader.load(
    `models/${objToRender}/scene.gltf`,
    function (gltf) {
        gltf.scene.position.y=6;
        gltf.scene.scale.set(.5,.5,.5)
        gltf.scene.castShadow = true;
        // gltf.scene.receiveShadow = true;

        scene.add(gltf.scene);

        // Armazene o objeto carregado na variável loadedObject
        loadedObject = gltf.scene;
        activeObject = loadedObject;
    },
    undefined,
    function (error) {
        console.error('Erro ao carregar o modelo 3D', error);
    }
);

export function setActiveObject(object) {
    activeObject = object;
    activeObject.position.y=7;  
}

const planeGeometry = new THREE.BoxGeometry(20,2,20);
const planeMaterial = new THREE.MeshStandardMaterial({color: 0x000000})

const plane = new THREE.Mesh(planeGeometry, planeMaterial)
plane.position.set(0,1,0);
plane.receiveShadow=true;
// plane.rotation.x = -Math.PI / 2;
scene.add(plane);


// default models

let defaultMaterial = new THREE.MeshStandardMaterial(0x555555);
const boxGeometry = new THREE.BoxGeometry(5,5,5);
const sphereGeometry = new THREE.SphereGeometry(5,32,32);
export const box = new THREE.Mesh(boxGeometry, defaultMaterial);
export const sphere = new THREE.Mesh(sphereGeometry, defaultMaterial);
sphere.castShadow = true;




// Fontes de luz
const dl = new THREE.DirectionalLight(0xffffbb, 1);
dl.position.set(0,20,0);
const dlHelper = new THREE.DirectionalLightHelper(dl, 3);
scene.add(dl, dlHelper)

export const sl = new THREE.SpotLight(0xffffff, 1, 8, Math.PI / 8 , 1, 0);
sl.castShadow = true;
// sl.distance=-50
// sl.decay = 0;
sl.position.set(0,20,20);
const slHelper = new THREE.SpotLightHelper(sl);
scene.add(sl, slHelper);

const pl = new THREE.PointLight(0x00ffff, 100, 20, 2);
pl.position.set(10,20,10);
const plHelper = new THREE.PointLightHelper(pl, 0.5);
scene.add(pl, plHelper)

const al = new THREE.AmbientLight(0xffffcc, 0.5);
scene.add(al);

const hl = new THREE.HemisphereLight(0xffffff, 0x003300, 0.5);
scene.add(hl);

// Variáveis de controle para iluminação
let spotLightsOn = true;
let ambientLightsOn = true;
export function disableLight(source){
    if(source == 'spot'){
        if(spotLightsOn){
            scene.remove(pointLight);
            spotLightsOn = false;
        }
        else{
            scene.add(pointLight);
            spotLightsOn = true;
        }
    }
    else if(source == 'ambient'){
        if(ambientLightsOn){
            scene.remove(ambientLight);
            ambientLightsOn = false;
        }
        else{
            scene.add(ambientLight);
            ambientLightsOn = true;
        }
    }

}

// TIPOS DE MATERIAIS

const basicMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
const lambertMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff00, emissive: 0x003300 });
const phongMaterial = new THREE.MeshPhongMaterial({ color: 0x0000ff, specular: 0x555555, shininess: 30 });
const standardMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00, metalness: 0.5, roughness: 0.8 });
const toonMaterial = new THREE.MeshToonMaterial({ color: 0x00ffff });
const depthMaterial = new THREE.MeshDepthMaterial({});
const basicLineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
const dashedLineMaterial = new THREE.LineDashedMaterial({ color: 0x00ff00, dashSize: 3, gapSize: 1 });

export function changeMaterial(object, material) {
    if (object) {
        // Armazena o material padrão do objeto caso ainda não tenha sido armazenado
        let defaultMaterial = null;
        object.traverse(function (child) {
            if (child.isMesh) {
                if (!defaultMaterial) {
                    defaultMaterial = child.material.clone();
                }
                if (material == 'basic') {
                    child.material = basicMaterial;
                } else if (material == 'lambert') {
                    child.material = lambertMaterial;
                } else if (material == 'phong') {
                    child.material = phongMaterial;
                } else if (material == 'standard') {
                    child.material = standardMaterial;
                } else if (material == 'toon') {
                    child.material = toonMaterial;
                } else if (material == 'depth') {
                    child.material = depthMaterial;
                } else if (material == 'basicline') {
                    child.material = basicLineMaterial;
                } else if (material == 'dashedline') {
                    child.material = dashedLineMaterial;
                } else if (material == 'default') {
                    child.material = defaultMaterial;
                }
            }
        });
    } else {
        console.error('O objeto ainda não foi carregado.');
    }
}
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();