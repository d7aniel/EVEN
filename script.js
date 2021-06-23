import * as THREE from 'https://unpkg.com/three@0.121.1/build/three.module.js';//'../threegit/build/three.module.js';;//'https://unpkg.com/three@0.118.3/build/three.module.js';//'../threeLibs/build/three.module.js';
import {Mundo} from './Mundo.js'
import {Objeto} from './Objeto.js'
//import {cargarModelo} from './CargarModelo.js'
//var guion;
//var guionCargado = false;


//import { OrbitControls } from 'https://unpkg.com/three@0.121.1/examples/jsm/controls/OrbitControls.js';
console.log("hola three.js");
var mundo;
var cubo;
var objeto;
var meshCono;
var lista = {};
var audio;
function inicializar() {
    mundo = new Mundo();
    mundo.iluminar();
    mundo.crearOrbitControl();
    //mesh = new Objeto(mundo);
    //mesh = new THREE.Object3D()
    //cargarModelo('modelos/modelo.glb', mundo, lista)
    objeto = new Objeto(mundo);
    //console.log(mundo.controls)
    document.addEventListener( 'keypress', onDocumentKeyPress );
    fetch('guion.json').then(response => {
       return response.json();
    }).then(function(data){
        mundo.setGuion(data);
        crearLista(mundo.guion);
    });

    var cancion = document.createElement("source");
    cancion.setAttribute("src", "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/3.mp3");
    document.getElementById("audiop").append(cancion);

    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        // initialize plyr
        audio = new Plyr('#audiop', {
            controls: [
                'restart',
                'play',
                'progress',
                'current-time',
                'duration',
                'mute',
                'volume'
            ]
        });
    }

    //audio = document.getElementById("audiop");
    //console.log(audio);
    //audio.on('timeupdate', function () {console.log("funciona uptate"+audio.currentTime)})
    //audio.addEventListener('onmouseup',function () {console.log("funciona uptate"+audio.currentTime)})

    document.getElementsByClassName('plyr__progress')[0].addEventListener('mouseup',
    function () {
        mundo.setTiempo(audio.currentTime);
    });
    /*document.addEventListener('on', event => {
        const player = event.detail.plyr;
        console.log(player);plyr__progress
    });*/
}


function onDocumentKeyPress( event ) {
	const keyCode = event.which;
	if ( String.fromCharCode( keyCode ) == 'a' ) {
	}
}

function crearLista(guion){
    var listaSecuencias = document.createElement("details");
	var nom = document.createElement("summary");
	nom.innerHTML = "Secuencias ";
	listaSecuencias.appendChild(nom);
    //var arr = ["aksdmlasldkaksd","asdlkaklsdlk","aksdaksldlkas"];
    //console.log(guion);
    for(var i in guion){
        console.log(guion[i].nombre);
        var p = document.createElement("p");
        var a = document.createElement("a");
        a.innerHTML = guion[i].nombre;
        a.href="#";
        a.valor = guion[i].tiempo;
        a.addEventListener('mouseup', function(){saltarTiempo(this.valor)})
        p.append(a);
        listaSecuencias.appendChild(p);
    }
    document.body.appendChild(listaSecuencias);
}

function saltarTiempo(nuevoTiempo){
    audio.currentTime = nuevoTiempo;
    mundo.moverCamara(nuevoTiempo);
}


function animar() {
    requestAnimationFrame( animar );
    //mesh.rotar();
    mundo.actulizarConAudio(audio);
    mundo.animar();
    mundo.renderizar();
}


inicializar();
animar();
