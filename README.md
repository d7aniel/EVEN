# TestVideoInteractivo
El programa tiene **tres carpetas** donde se alojan los tres archivos claves para desarrollar nuestro proyecto: audios, modelos y guiones.

### audios
Es donde se aloja el archivo de audio que servirá como guía del video. Características:

- aconsejamos formato *.mp3* en calidad 320kbps;
- su duración determinará la extensión del video interactivo.

### modelos
Es donde se aloja el modelo 3D que vamos a recorrer. Características:

- aconsejamos un archivo máximo de 10Mb (cuanto menos más ágil será la carga y visualización)
- la extensión debe ser *.glb*: incluye texturas y puede ser exportada desde Blender. 

### guiones
Es donde se aloja el archivo tipo *.json*, esencial para configurar nuestro proyecto:

1. setear la ubicación del audio;
2. setear la ubicación del modelo;
3. elegir el color de fondo de la web;
4. establecer los movimientos de cámara.

Para los tres primeros seteos veremos las siguientes líneas de código:

~~~
"audio":"audios/audio.mp3",
"modelo":"modelos/modelo1.glb",
"fondo":"rgb(0,20,50)",
~~~

Los movimientos de cámara son un arreglo denominado “data” que tiene marcas en la línea de tiempo, con algunos datos obligatorios y otros opcionales, con la sintaxis <nombre>:<valor>.

#### Datos obligatorios


~~~
“tiempo”:”00:00”	//minutos:segundos
“cámara”:”c_1”	//posición pre-seteada en Blender o [x,y,z]
“target”:[0,0,-5]	//posición pre-seteada en Blender o [x,y,z]
~~~

#### Datos opcionales
~~~
“duración”:4000	//valor en milisegundos
“nombre”:”Vista Uno”	//valor tipo String
~~~

En la carpeta [guiones](https://github.com/d7aniel/TestVideoInteractivo/tree/main/guiones) puedes encontrar tres ejemplos concretos, con sus correspondientes audios y modelos.
