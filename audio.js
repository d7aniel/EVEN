/*moveProgressBar();
function moveProgressBar() {
    var getPercent = 0.1;
    var getProgressWrapWidth = document.getElementById("wp").clientWidth;
    var progressTotal = getPercent * getProgressWrapWidth;
    document.getElementById("bp").style.left = progressTotal+"px";
}


*/

var cancion = document.createElement("source");
cancion.setAttribute("src", "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/3.mp3");
document.getElementById("audiop").append(cancion);

var supportsAudio = !!document.createElement('audio').canPlayType;
if (supportsAudio) {
    // initialize plyr
    var player = new Plyr('#audiop', {
        controls: [
            'restart',
            'play',
            'progress',
            'current-time',
            'duration',
            'mute',
            'volume',
            'download'
        ]
    });
}

audio = document.getElementById("audiop");
// audio.on('play', function () {playing = true;})
// audio.on('pause', function () {playing = false;})
// audio.on('ended', function () { })
// Mythium Archive: https://archive.org/details/mythium/
