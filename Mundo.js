import * as THREE from 'https://unpkg.com/three@0.121.1/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.121.1/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'https://unpkg.com/three@0.121.1/examples/jsm/environments/RoomEnvironment.js';
import { Movimiento } from './Movimiento.js';
export class Mundo{
    constructor(){
        this.camara = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,1,1000);
        this.camara.position.z = 5;

        this.renderizador = new THREE.WebGLRenderer();
        this.renderizador.setSize( window.innerWidth, window.innerHeight );

        document.body.appendChild( this.renderizador.domElement );
        this.guionCargado = false;
        this.deboActualizarCamara = false;
        this.reloj = new Reloj();
        this.movimiento = new Movimiento(this,this.reloj);


        this.escena = new THREE.Scene();



			// const scene = new THREE.Scene();
			// scene.background = new THREE.Color( 0xbfe3dd );


        //this.usarOrbitControl = false;
    }
    setObjeto(obj){
        this.objeto = obj;
    }
    crearOrbitControl(){
        this.controls = new OrbitControls( this.camara, this.renderizador.domElement );
		this.controls.minDistance = 1;
		this.controls.maxDistance = 1000;
    }
    iluminar(){
        //this.escena.add( new THREE.AmbientLight( 0xffffff ) );
        var luzd = new THREE.DirectionalLight( 0xffddcc, 1 );
        luzd.position.set( 1, 0.75, 0.5 );
        this.escena.add( luzd );
        var lud2 = new THREE.DirectionalLight( 0xccccff, 1 );
        lud2.position.set( - 1, 0.75, - 0.5 );
        this.escena.add( lud2 );
        this.renderizador.back
    }
    animar(){
        // this.destinoCamara.position.x =  nCamara.x;
        // this.destinoCamara.position.y =  nCamara.y;
        // this.destinoCamara.position.z =  nCamara.z;
        // this.destinoCamara.target.x =  nTarget.x;
        // this.destinoCamara.target.y =  nTarget.y;
        // this.destinoCamara.target.z =  nTarget.z;
        // this.camara.position.x = nCamara.x;
        // this.camara.position.y = nCamara.y;
        // this.camara.position.z = nCamara.z;

        if(this.deboActualizarCamara){
            this.deboActualizarCamara = this.movimiento.actualizarCamara();
            // let dCamara = this.camara.position.distanceToSquared(this.destinoCamara.position);
            // let dTarget = this.controls.target0.distanceToSquared(this.destinoCamara.target);
            //
            // if(dCamara>0.01){
            //     this.camara.position.lerp(this.destinoCamara.position,0.05);
            //     this.controls.position0.lerp(this.destinoCamara.position,0.05);
            // }
            // if(dTarget>0.01){
            //     this.controls.target.lerp(this.destinoCamara.target,0.05);
            //     this.controls.target0.lerp(this.destinoCamara.target,0.05);
            // }
            // this.controls.update();
            // if(dCamara<0.01 && dTarget<0.01){
            //     this.deboActualizarCamara = false;
            //     this.controls.reset();
            // }
        }

        // this.camara.position.x = nCamara.x;
        // this.camara.position.y = nCamara.y;
        // this.camara.position.z = nCamara.z;
        //this.controls.position0.x = nCamara.x;
       // this.controls.position0.y = nCamara.y;
       // this.controls.position0.z = nCamara.z;
       // this.controls.target0.x = nTarget.x;
       // this.controls.target0.y = nTarget.y;
       // this.controls.target0.z = nTarget.z;
    }

    renderizar(){
        this.renderizador.render( this.escena, this.camara );
    }

    moverCamara(indice){
        if(this.guionCargado && this.objeto.modeloCargado){
            this.movimiento.moverCamara(indice);
            this.deboActualizarCamara = true;

            /*let nCamara = {};
            let nTarget = {};
            if(Array.isArray(this.guion[indice].camara)){
                nCamara.x = this.guion[indice].camara[0];
                nCamara.y = this.guion[indice].camara[1];
                nCamara.z = this.guion[indice].camara[2];
            }else{
                nCamara = this.objeto.zonas[this.guion[indice].camara].position;
            }
            if(Array.isArray(this.guion[indice].target)){
                nTarget.x = this.guion[indice].target[0];
                nTarget.y = this.guion[indice].target[1];
                nTarget.z = this.guion[indice].target[2];
            }else{
                nTarget = this.objeto.zonas[this.guion[indice].target].position;
            }
            this.destinoCamara.position.x =  nCamara.x;
            this.destinoCamara.position.y =  nCamara.y;
            this.destinoCamara.position.z =  nCamara.z;
            this.destinoCamara.target.x =  nTarget.x;
            this.destinoCamara.target.y =  nTarget.y;
            this.destinoCamara.target.z =  nTarget.z;
            this.deboActualizarCamara = true;
            this.movimientoTemporizado = this.guion[indice].esTemporizado;
            //this.movimientoTemporizado = this.guion[indice].esTemporizado;

            this.siguienteTiempo = this.encontrarSiguienteTiempo(indice);*/
        }else{
            console.log(this.objeto)
            console.log('guion no esta listo');
        }
    }
    setGuion(guion){
        this.movimiento.setGuion(guion);
        this.guionCargado = true;
        this.moverCamara(0);

        const pmremGenerator = new THREE.PMREMGenerator( this.renderizador );
        this.escena.background = new THREE.Color( 0xbfe3dd );
        if(guion.hasOwnProperty("fondo")){
            console.log(guion.fondo)
            this.escena.background = new THREE.Color( guion.fondo );
        }
        this.escena.environment = pmremGenerator.fromScene( new RoomEnvironment(), 0.04 ).texture;


        /*this.guion = {};
        this.guion[0] = {
            "tiempo":0,
            "nombre":"00:00",
            "camara":[0,0,5],
            "target":[0,0,0],
            "esTemporizado":false}
        for(var cambio of guion.data){
            let tiempo = this.deTextoATiempo(cambio.tiempo);
            this.guion[tiempo] = cambio;

            if(!this.guion[tiempo].hasOwnProperty("nombre")){
                this.guion[tiempo]['nombre'] = this.guion[tiempo].tiempo;
            }
            this.guion[tiempo].tiempo = tiempo;
            this.guion[esTemporizado].tiempo = tiempo;

        }
        this.guionCargado = true;
        this.moverCamara(0);*/
    }

    setTiempo(ahorita){
        let indice = this.movimiento.encontrarTiempoMasCercano(ahorita);
        this.moverCamara(indice);
    }


    actulizarConAudio(audio){
        /**/
        this.reloj.actualizar();
        if(this.guionCargado && audio.playing){
            if(audio.currentTime >= this.movimiento.siguienteTiempo){
                this.moverCamara(this.movimiento.siguienteTiempo);
            }
        }
    }
}

class Reloj{
    constructor(){
        this.ultimo = Date.now();
        this.dt = 0;
    }
        //myInterval = setInterval(tick, 0);

    actualizar() {
        let ahora = Date.now();
        this.dt = ahora - this.ultimo;
        this.ultimo = ahora;
    }

    getDelta(){
        return this.dt;
    }
}
