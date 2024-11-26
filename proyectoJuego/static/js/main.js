let velocidadEnemigo = 1500;
let puntaje = 0;
let bola = document.querySelector(".bola");
let campo = document.querySelector(".campo");
let puntos = document.querySelector("#puntos");
let dificultadText = document.querySelector("#dificultad");
puntos.textContent = puntaje;
let posicionX = 1;
let posicionY = 1;
let direccion = 1;
let rightPressed = false;
let leftPressed = false;
let downpressed = false;
let uppressed = false;
let posicionEnemigoX = 0;
let posicionEnemigoY = 0;
let listaLadrillos = [];
let interval = 0;
let dificultad = 0;
let nivel = document.querySelector("#dificultad");
let juegoIniciado = false;
let segundos = 0;
let ventanActivada = false;
nivel.textContent = dificultad;


// Funcion para contar el timepo que dura el jugador
function reloj() {
  segundos += 1;
  console.log(segundos);
}

// Definimos los cursores del usuario
document.addEventListener("keydown", keyDownHandler, false); // Le decimos al DOM que escuche cuando el usuario pulse la tecla derecha
document.addEventListener("keyup", keyUpHandler, false); // Le decimos al DOM que escuche cuando el usuario pulse la tecla izquierda



// Creamos una funcion que se activara cuando el usuario pulse la tecla especificada en el addEventListener
function keyDownHandler(e) {
  console.log("Evento: "+e);
  if (e.keyCode == 39) {
    //console.log("derecha") // He añadido esta linea para comprobar en la consola que se activa la funcion
    // al pulsar la tecla derecha
    rightPressed = true;
    moverDerecha();
  } else if (e.keyCode == 40) {
    moverAbajo();

    downpressed = true;
  } else if (e.keyCode == 38) {
    uppressed = true;
    moverArriba();
  } else if (e.keyCode == 37) {
    //console.log("izquierda") // He añadido esta linea para comprobar que se esta ejecutando la funcion con la tecla
    // izquierda
    leftPressed = true;
    moverIzquierda();
  } else if (e.keyCode == 32) {
    console.log("inicio");
    iniciarJuego();
  }else{
    // document.body.style.overflow = "visible";
  }

function visibleScroll(e){
  document.body.style.overflow = "visible";
}

}
function keyUpHandler(e) {
  console.log("Evento: "+e.keyCode);
  if (e.keyCode == 39) {
    rightPressed = false;
    detectarColision();
  } else if (e.keyCode == 40) {
    downpressed = false;
    detectarColision();
  } else if (e.keyCode == 38) {
    uppressed = false;
    detectarColision();
  } else if (e.keyCode == 37) {
    leftPressed = false;
    detectarColision();
  }
}

// Estado inicial
let estadoInicial = function () {
  let mensaje = document.createElement("div");
  mensaje.className = "mensaje";
  mensaje.classList.add("mensaje");
  campo.appendChild(mensaje);
  mensaje.style.width = "350px";
  mensaje.style.height = "150px";
  mensaje.style.borderRadius = "20px";
  mensaje.style.border = "5px solid black";
  mensaje.style.gridColumnStart = 5;
  mensaje.style.gridRowStart = 4;
  mensaje.style.marginTop = "200px";
  mensaje.style.background = "white";
  mensaje.style.display = "flex";
  mensaje.style.alignItems= "center";
  mensaje.style.justifyContent = "center";
  let texto = document.createElement("p");
  texto.style.font = "20px";
  texto.style.textAlign = "center";
  texto.style.verticalAlign = "center";
  texto.style.fontWeight = "bold";
  texto.textContent = "PRESIONE SPACE BAR PARA COMENZAR";
  texto.style.fontFamily = "Arial, Helvetica, sans-serif";
  mensaje.appendChild(texto);
};
estadoInicial();

//Ventana para volver a empezar y guardar progreso
function ventanaRegresar() {
  if (juegoIniciado == true) {
    juegoIniciado = false;
    ventanActivada = true;
    // Creacion de ventana para volver a jugar y guardar datos de progreso del usuario
    let ventana = document.createElement("div");
    ventana.className = "ventana";
    ventana.classList.add("ventana");
    ventana.style.display = "flex";
    ventana.style.flexDirection = "column";
    ventana.style.justifyContent = "space-between";
    campo.appendChild(ventana);
    ventana.style.width = "300px";
    ventana.style.height = "400px";
    ventana.style.gridColumnStart = 5;
    ventana.style.gridRowStart = 5;
    ventana.style.background = "white";
    ventana.style.background = "#ccc";
    ventana.style.alignItems = "center";
    ventana.style.justifyContent = "center";
    ventana.style.border = "5px solid black";
    let p = document.createElement("p");
    p.style.fontSize = "24px";
    p.textContent = "Guardar puntos";

    ventana.appendChild(p);
    //Creacion de formulario
    let formulario = document.createElement("form");
    formulario.style.display = "flex";
    formulario.style.flexDirection = "column";
    formulario.style.justifyContent = "center";
    // formulario.method = "post";
    // Creacion de input para ingresar el nombre de usuario
    let nombreUsuario = document.createElement("input");
    nombreUsuario.type = "text";
    nombreUsuario.name = "nombre";
    nombreUsuario.maxLength = "20";
    nombreUsuario.minLength = "4";
    nombreUsuario.id = "nombre";
    nombreUsuario.style.width = "200px";
    nombreUsuario.style.height = "40px";
    nombreUsuario.style.marginBottom = "40px";
    nombreUsuario.style.fontSize = "16px";
    nombreUsuario.style.textAlign = "center";
    nombreUsuario.style.placeContent = "Nombre de usuario";
    nombreUsuario.placeholder = "Ingrese su nombre: "; 
    ventana.appendChild(nombreUsuario);
    formulario.appendChild(nombreUsuario);
    // Creacion de input para guardar progreso del usuario en la base de datos
    let guardar = document.createElement("input");
    guardar.type = "submit";
    guardar.style.width = "170px";
    guardar.style.height = "50px";
    guardar.style.marginBottom = "40px";
    guardar.style.marginRight = "auto";
    guardar.style.marginLeft = "auto";
    guardar.style.fontSize = "20px";
    guardar.style.fontWeight = "bold";
    guardar.style.borderRadius = "10px";
    guardar.value = "Guardar";
    guardar.addEventListener("click", post);
    guardar.addEventListener("click", redirigir);
    ventana.appendChild(guardar);
    formulario.appendChild(guardar);
    // Creacion del boton para volver a jugar
    let volver = document.createElement("input");
    volver.type = "button";
    volver.style.width = "170px";
    volver.style.height = "50px";
    volver.style.margin = "auto";
    volver.style.fontWeight = "bold";
    volver.value = "Volver a Jugar";
    volver.style.fontSize = "20px";
    volver.style.borderRadius = "10px";
    volver.addEventListener("click", regresar);
    formulario.appendChild(volver);
    ventana.appendChild(formulario);
  }
}

function redirigir() {
  window.location.href = "/";
}

// Funcion para guardar los datos del usuario en la base de datos
function crearUsuario() {
  // Limpiamos el input de texto del nombre de usuario
  console.log("DATOS GUARDADOS.");
  let nombreUsuario = document.querySelector("#nombre").value;
  let puntosUsuario = puntaje;
  let dificultadUsuario = dificultad;
  //Creamos objeto de JavaScript Usuario
  let usuario = {
    nombre: nombreUsuario,
    puntos: puntosUsuario,
    dificultad: dificultadUsuario,
  };
  console.log(usuario);
  // Creamos la peticion de fetch
  // La peticion FECTH recibe 2 argumentos: ('url',{method:"",contenido= headers:"Content-Type:=''",body:formato-headers=contenido})
  return usuario;
}

const post = async () => {
  let usuario = crearUsuario();
  try {
    const response = await fetch("/", {
      // Definimos el metodo que vamos a utilizar GET,POST,PUT,DELETE,etc...
      method: "POST",
      //Definimos un headers que sera el tipo de dato que vamos a enviar
      headers: { "Content-Type": "application/json" },
      //Agregamos el contenido que vamos a enviar
      body: JSON.stringify(usuario),
    });
    if (response.ok) {
      let jsonResponse = JSON.stringify(usuario);
      console.log(jsonResponse);
    }
  } catch (error) {
    console.log(error);
  }
};

function regresar() {
  puntaje = 0;
  dificultad = 0;
  velocidadEnemigo = 1500;
  nivel.textContent = dificultad;
  puntos.textContent = puntaje;
  clearInterval(reloj);
  let ventana = document.querySelector(".ventana");
  juegoIniciado = false;
  ventanActivada = false;
  ventana.remove(campo);
  let ladrillo = document.querySelector(".ladrillo");
  let enemigo = document.querySelector(".enemigo");
  estadoInicial();
  ladrillo.remove(campo);
  enemigo.remove(campo);
}
// Funcion inicial
function iniciarJuego() {
  if (juegoIniciado == false && ventanActivada == false) {
    crearBola();
    crearLadrillo();
    crearEnemigo();
    setInterval(reloj,1000);
    document.body.style.overflow = "hidden";
    let mensaje = document.querySelector(".mensaje");
    mensaje.remove(campo);
    intervalo = setInterval(moverEnemigo, velocidadEnemigo);
    segundos = setInterval(reloj,1000);
    juegoIniciado = true;
  } else {
    console.log("El juego ya ha sido iniciado");
  }
}

function crearBola() {
  bola = document.createElement("div");
  bola.className = "bola";
  bola.classList.add("bola");
  campo.appendChild(bola);
  bola.style.gridColumnStart = posicionX;
  bola.style.gridRowStart = posicionY;
  bola.style.background = "url('static/img/pez.png')";
  bola.style.backgroundRepeat = "no-repeat";
}

// Definimos la funcion para mover la bola
function moverDerecha() {
  if (posicionX < 10) {
    posicionX += 1;
    bola.style.gridColumnStart = posicionX;
    detectarColision();
  } else {
    bola.remove(campo);
    ventanaRegresar();
  }
}

function moverIzquierda() {
  if (posicionX - 1 > 0 || posicionX != 0) {
    posicionX -= 1;
    bola.style.gridColumnStart = posicionX;
    detectarColision();
  } else {
    bola.remove(campo);
    ventanaRegresar();
  }
}
function moverArriba() {
  if (posicionY - 1 > 0 || posicionY != 0) {
    posicionY -= 1;
    bola.style.gridRowStart = posicionY;
    detectarColision();
    //document.body.style.overflow = "hidden";
  } else {
    bola.remove(campo);
    ventanaRegresar();
    //document.body.style.overflow = "hidden";
  }
}

function moverAbajo() {
  if (posicionY < 10) {
    posicionY += 1;
    bola.style.gridRowStart = posicionY;
    detectarColision();
    //document.body.style.overflow = "hidden";
  } else {
    bola.remove(campo);
    ventanaRegresar();
    //document.body.style.overflow = "hidden";
  }
}

// Crear ladrillo
let crearLadrillo = function () {
  let poscicionLadrillo = Math.floor(Math.random() * 10) + 1;
  let ladrillo = document.createElement("div");
  ladrillo.className = "ladrillo";
  ladrillo.style.width = "50px";
  ladrillo.style.height = "50px";
  ladrillo.style.borderRadius = "50%";
  ladrillo.style.background = "yellow";
  ladrillo.style.gridColumnStart = poscicionLadrillo;
  ladrillo.style.gridRowStart = poscicionLadrillo;
  campo.appendChild(ladrillo);
};
// crearLadrillo();

// Funcion para detectar colision
function detectarColision() {
  let bola = document.querySelector(".bola");
  let ladrillo = document.querySelector(".ladrillo");
  if (
    bola.style.gridColumnStart == ladrillo.style.gridColumnStart &&
    bola.style.gridRowStart == ladrillo.style.gridRowStart
  ) {
    puntaje += 1;
    console.log("DETECTADA");
    if (puntaje % 2 == 0 && dificultad != 13) {
      dificultad += 1;
      nivel.textContent = dificultad;
      incrementarVelocidad();
    }
    puntos.textContent = puntaje;
    ladrillo.remove(campo);
    crearLadrillo();
  }
}
// Funcion para crear un enemigo
let crearEnemigo = function () {
  let poscicionEnemigo = Math.floor(Math.random() * 9);
  poscicionEnemigo = poscicionEnemigo * 1;
  let diferencia = poscicionEnemigo - posicionX;
  if (diferencia < 0) {
    diferencia *= -1;
  }
  while (poscicionEnemigo == posicionX && diferencia < 8) {
    poscicionEnemigo = Math.floor(Math.random() * 9);
    poscicionEnemigo = poscicionEnemigo * 1;
    diferencia = poscicionEnemigo - posicionX;
  }
  let enemigo = document.createElement("div");
  campo.appendChild(enemigo);
  enemigo.className = "enemigo";
  // enemigo.style.width = "50px";
  // enemigo.style.height = "50px";
  enemigo.style.gridColumnStart = poscicionEnemigo;
  enemigo.style.gridRowStart = poscicionEnemigo;
  enemigo.style.background = "url('static/img/tiburon.png')";
  enemigo.style.backgroundRepeat = "no-repeat";
  enemigo.style.width = "200px";
  enemigo.style.height = "90px";
};
// crearEnemigo();

// Funcion para mover enemigo
function moverEnemigo() {
  let enemigo = document.querySelector(".enemigo");
  if (posicionEnemigoX < posicionX) {
    posicionEnemigoX += 1;
  } else if (posicionEnemigoX == posicionX) {
    comer();
  } else {
    posicionEnemigoX -= 1;
  }
  if (posicionEnemigoY < posicionY) {
    posicionEnemigoY += 1;
  } else if (posicionEnemigoY == posicionX) {
    comer();
  } else {
    posicionEnemigoY -= 1;
  }
  enemigo.style.gridColumnStart = posicionEnemigoX;
  enemigo.style.gridRowStart = posicionEnemigoY;
}

// Intervalo para mover enemigo
// intervalo = setInterval(moverEnemigo, velocidadEnemigo);

// Funcion para que el enemigo se coma al usuario
function comer() {
  let bola = document.querySelector(".bola");
  let enemigo = document.querySelector(".enemigo");
  if (posicionX == posicionEnemigoX && posicionY == posicionEnemigoY) {
    if (campo.contains(bola)) {
      bola.remove(campo);
      //Llamamos a la funcion para preguntar si desea guardar los puntajes y volver a empezar
      ventanaRegresar();
    }
    clearInterval(intervalo);
  }
}

// Funcion para incrementar velocidad del enemigo
function incrementarVelocidad() {
  if (velocidadEnemigo > 200) {
    velocidadEnemigo -= 100;
  }
  clearInterval(intervalo);
  intervalo = setInterval(moverEnemigo, velocidadEnemigo);
}
