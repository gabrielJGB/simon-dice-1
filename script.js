const $options = document.querySelector('.options');
const $red = document.querySelector('.red');
const $yellow = document.querySelector('.yellow');
const $green = document.querySelector('.green');
const $blue = document.querySelector('.blue');
const $scorenum = document.querySelector('.scorenum');
const $playb = document.querySelector('.playb');
const $resetb = document.querySelector('.resetb');
const $turn = document.querySelector('.turn');
const $state = document.querySelector('.state');
const $score = document.querySelector('.score');
const $cont = document.querySelector('.cont');
const juegoMaquina = [];
const juegoUsuario = [];
let puntaje=0;
let perderVar = false;
let k = -1;

$cont.textContent='';
$turn.textContent = 'Pulsa JUGAR';
$resetb.style.display='none';
$red.addEventListener('click', redPressed);
$green.addEventListener('click', greenPressed);
$yellow.addEventListener('click', yellowPressed);
$blue.addEventListener('click', bluePressed);


function empezarJuego() {
    let delay = 0;

    if(juegoMaquina.length == 0){
        conteo();
        delay = 1000;
    }
    $playb.style.display ='none';
    setTimeout(function(){
    k=-1;
    juegoUsuario.length = 0;
    bloquearInputUsuario();
    agregarCuadroMaquina();
    resaltarJuegoMaquina();
    setTimeout(function () {
        agregarEventListeners();
    }, (juegoMaquina.length * 1000) + 500);
   },delay);
    
}
function conteo(){
    let i=0;
    
    setTimeout(function(){
        $cont.textContent = '3';
            setTimeout(function(){
                $cont.textContent = '2';
                setTimeout(function(){
                    $cont.textContent = '1';
                        setTimeout(function(){
                            $cont.textContent='';
                        },500);
                },500);
            },500);
    },0);
}

function resetear(){
    juegoMaquina.length = 0;
    juegoUsuario.length = 0;
    k=-1;
    puntaje = 0;
    $turn.textContent = 'Pulsa JUGAR';
    $scorenum.textContent = 0;
    $playb.style.display='block';
    $resetb.style.display='none';
    $state.style['background-color'] = 'rgb(243, 226, 196)';
    $score.style['background-color'] = 'rgb(243, 226, 196)';    
}

function compararJuegos() {
    k++;

    if (juegoMaquina[k].className == juegoUsuario[k]) {
        if(juegoMaquina.length == juegoUsuario.length){
            puntaje++;

            setTimeout(function () {
                $scorenum.textContent = puntaje;
                $score.style['background-color'] = 'rgb(122, 216, 79)';
                setTimeout(function () {
                $score.style['background-color'] = 'rgb(243, 226, 196)';                
                }, 500);
            }, 100);
            setTimeout(function(){empezarJuego()},1000);
        }
    }
    else {  
        $resetb.style.display='block';
        perder();
    }
}
function perder(){
    perderVar = true;
    bloquearInputUsuario();
}

function agregarCuadroMaquina() {
    juegoMaquina.push(obtenerCuadroAleatorio());
}
function obtenerCuadroAleatorio() {
    return $options.children[(Math.floor(Math.random() * 4))];
}
function resaltarJuegoMaquina() {
    let offset = 0;
    // console.log("--------------");
    juegoMaquina.forEach(function (i) {
        // console.log(i.className);
        setTimeout(function () {
            i.style.filter = 'brightness(100%)';
            setTimeout(function () {
                i.style.filter = 'brightness(60%)';
            }, 500);
        }, 1000 + offset);
        offset += 1000;
    });
}

function agregarEventListeners() {
    
    setTimeout(function(){
        $turn.textContent = 'Tu turno';
    },500);
    $red.addEventListener('click', redPressed);
    $green.addEventListener('click', greenPressed);
    $yellow.addEventListener('click', yellowPressed);
    $blue.addEventListener('click', bluePressed);
}

function redPressed() {
    juegoUsuario.push('red');
    setTimeout(function () {
        $red.style.filter = 'brightness(100%)';
        setTimeout(function () {
            $red.style.filter = 'brightness(60%)';
        }, 300);
    }, 0);
    compararJuegos();
}

function greenPressed() {
    juegoUsuario.push('green');
    setTimeout(function () {
        $green.style.filter = 'brightness(100%)';
        setTimeout(function () {
            $green.style.filter = 'brightness(60%)';
        }, 300);
    }, 0);
    compararJuegos();
}
function yellowPressed() {
    juegoUsuario.push('yellow');
    setTimeout(function () {
        $yellow.style.filter = 'brightness(100%)';
        setTimeout(function () {
            $yellow.style.filter = 'brightness(60%)';
        }, 300);
    }, 0);
    compararJuegos();
}
function bluePressed() {
    juegoUsuario.push('blue');
    setTimeout(function () {
        $blue.style.filter = 'brightness(100%)';
        setTimeout(function () {
            $blue.style.filter = 'brightness(60%)';
        }, 300);
    }, 0);
    compararJuegos();
}

function bloquearInputUsuario() {
    if(!perderVar){
        setTimeout(function(){
            $turn.textContent = 'Turno de la maquina';
        },500);
    }else{
        $turn.textContent = 'Perdiste';
        $state.style['background-color'] = 'rgb(244, 80, 80)';
        $score.style['background-color'] = 'rgb(244, 80, 80)';
        perderVar = false;
    }
    $red.removeEventListener('click', redPressed);
    $green.removeEventListener('click', greenPressed);
    $yellow.removeEventListener('click', yellowPressed);
    $blue.removeEventListener('click', bluePressed);
    console.log('removeEventListener');
}


