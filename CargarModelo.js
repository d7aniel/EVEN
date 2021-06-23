import { GLTFLoader } from 'https://unpkg.com/three@0.122.0/examples/jsm/loaders/GLTFLoader.js';
import  {AnimationMixer} from 'https://unpkg.com/three@0.121.1/build/three.module.js';//'../threegit/build/three.module.js';;//'https://unpkg.com/three@0.118.3/build/three.module.js';//'../threeLibs/build/three.module.js';

//import {Punto} from './Punto.js'
export function cargarModelo(archivo,mundo,mixer){
    var loader = new GLTFLoader();
    loader.load(archivo,gltf => {
    mixer[0] = new AnimationMixer(gltf.scene);
    //console.log(mixer);
        mundo.escena.add(gltf.scene);
    });
}
