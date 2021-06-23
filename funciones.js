import * as THREE from 'https://unpkg.com/three@0.121.1/build/three.module.js';
import { RGBELoader } from 'https://unpkg.com/three@0.121.1/examples/jsm/loaders/RGBELoader.js';
export function ilumnarConHDRI(archivo,mundo){
    var pmremGenerator = new THREE.PMREMGenerator( mundo.renderizador );
    pmremGenerator.compileEquirectangularShader();
    new RGBELoader()
    .setDataType( THREE.UnsignedByteType )
    .load( archivo, function(texture){
        var envMap = pmremGenerator.fromEquirectangular( texture ).texture;
        mundo.escena.environment = envMap;
        mundo.escena.background = envMap;
        texture.dispose();
        pmremGenerator.dispose();
    } );
}
