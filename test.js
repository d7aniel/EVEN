import * as THREE from 'https://unpkg.com/three@0.121.1/build/three.module.js';//'../threegit/build/three.module.js';;//'https://unpkg.com/three@0.118.3/build/three.module.js';//'../threeLibs/build/three.module.js';
import {Mundo} from './Mundo.js'
import {cargarModelo} from './CargarModelo.js'
var mixer = [];
var mundo;
var yaCargo=false;
function inicializar() {
    mundo = new Mundo();
    mundo.iluminar();
    mundo.crearOrbitControl();
    cargarModelo('modelos/modelo.glb', mundo, mixer);
}

function animar() {
    requestAnimationFrame( animar );
    //mesh.rotar();
    mundo.renderizar();
    if(mixer[0]!=undefined && yaCargo==false){
        console.log(mixer[0]);
        yaCargo = true;
    }
}


inicializar();
animar();
