import * as THREE from 'https://unpkg.com/three@0.122.0/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.122.0/examples/jsm/loaders/GLTFLoader.js';

function cargarModelo(archivo,mundo,objeto){
    var loader = new GLTFLoader();
    loader.load(archivo, function(gltf){
        //objetoVacio.add(gltf.scene);
        gltf.scene.traverse( function ( child ) {
                   let l = child.name.split('_');
                   objeto.zonas[child.name] = child;
                   /*if(l[0]=='t'){
                       objeto.zonas[child.name] = child;
                   }else if(l[0]=='c'){
                       objeto.zonas[child.name] = child;
                   }else if(l[0]=='o'){
                       objeto.zonas[child.name] = child;
                   }*/
               } );
        objeto.objeto = gltf.scene;
        mundo.escena.add(gltf.scene);
        objeto.modeloCargado = true;
        objeto.mundo.moverCamara(0);
    });
}

export class Objeto{
    constructor(mundo,archivo){
        this.mundo = mundo;
        mundo.setObjeto(this);
        this.zonas = {};
        this.objeto = undefined;// = new THREE.Object3D();//undefined;//new THREE.Object3D();
        this.modeloCargado = false;
        cargarModelo(archivo, mundo, this);
    }
}

//import {Punto} from './Punto.js'
