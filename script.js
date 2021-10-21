import * as THREE from 'https://unpkg.com/three@0.121.1/build/three.module.js';//'../threegit/build/three.module.js';;//'https://unpkg.com/three@0.118.3/build/three.module.js';//'../threeLibs/build/three.module.js';
import {Mundo} from './Mundo.js'
import {Objeto} from './Objeto.js'


var nombre_guion = "guiones/guion00.json";
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
    document.addEventListener( 'keypress', onDocumentKeyPress );
    fetch(nombre_guion).then(response => {
       return response.json();
    }).then(function(data){
        objeto = new Objeto(mundo,data.modelo);
        return data;
    }).then(function(data){
        setAudio(data.audio);
        mundo.setGuion(data);
        crearLista(mundo.movimiento.guion);
    });
}


function onDocumentKeyPress( event ) {
	const keyCode = event.which;
	if ( String.fromCharCode( keyCode ) == 'a' ) {
	}
}

function setAudio( archivoAudio ) {
    var cancion = document.createElement("source");
    cancion.setAttribute("src", archivoAudio);//"https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/3.mp3");
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


    document.getElementsByClassName('plyr__progress')[0].addEventListener('mouseup',
    function () {
        mundo.setTiempo(audio.currentTime);
    });
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
