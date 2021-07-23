document.addEventListener("DOMContentLoaded", function () {
  scrollNav();
  navegacionFija();
});

//funcion para que la barra se quede fija al realizar scroll
function navegacionFija() {
  const barra = document.querySelector(".header");

  //utilizamos una api llamada intersection observer la cual nos pide
  const observer = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting) {
      console.log(entries[0]);
      barra.classList.remove("fijo");
    } else {
      console.log(entries[0]);
      barra.classList.add("fijo");
    }
  });

  //indicamos el elemento que vamos a observar
  observer.observe(document.querySelector(".video"));
}

// Registrar el Intersection Observer
function scrollNav() {
  const enlaces = document.querySelectorAll(".nav_bar_principal a");
  //Nota importante, no se puede atar un evento a una variable tipo arreglo porque marca error, lo que tenemos que hacer es recorrer el arreglo como lo hacemos que
  //a continuacion
  enlaces.forEach(function (enlace) {
    enlace.addEventListener("click", function (e) {
      //evitamos el funcionamiento por default del enlace
      e.preventDefault();
      //al hacer click en el enlace vamos a obtener el valor del atributo del href es decir el #galeria
      //asi de todos los enlaces
      const seccion = document.querySelector(e.target.attributes.href.value);

      seccion.scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  crearGaleria();
});
//creando funcion para crear la galeria de imagenes
function crearGaleria() {
  const galeria = document.querySelector(".galeria-imagenes");
  //for para recorrer las imagenes debido a que su nombre es un numero
  for (let i = 1; i <= 30; i++) {
    //creamos un elemento imagen de html
    const imagen = document.createElement("IMG");
    //le damos el src a nuestra imagen dando la ruta del archivo el nombre que sera recorrido del 1 al 30 y su extension
    //aqui podiamos hacer un arreglo pero solo son 30 imagenes y no se meteran mas
    imagen.src = `build/img/thumb/${i}.webp`;

    //esta linea lo que hace es darle un atributo a nuestros li de html con el cual nos podemos referir a el
    imagen.dataset.imagenId = i;

    // Añadir la función de mostrarImagen
    imagen.onclick = mostrarImagen;

    //creando el elemento lista
    const lista = document.createElement("LI");

    //agrgando la imagen a la lista
    lista.appendChild(imagen);

    //agregando la lista al ul que es el id al que le corresponde esta variable
    galeria.appendChild(lista);
  }
}

function mostrarImagen(e) {
  // convertira el atributo en numero ya que asi lo tenemos en texto
  const id = parseInt(e.target.dataset.imagenId);

  // Generar la imagen grande
  const imagen = document.createElement("IMG");
  imagen.src = `build/img/grande/${id}.webp`;
  //crea el contenedor de la imagen
  const overlay = document.createElement("DIV");
  overlay.appendChild(imagen);
  overlay.classList.add("overlay");

  // Cuando se da click, cerrar la imagen
  overlay.onclick = function () {
    overlay.remove();
    body.classList.remove("fijar-body");
  };

  // Boton para cerrar la imagen
  const cerrarImagen = document.createElement("P");
  cerrarImagen.textContent = "X";
  cerrarImagen.classList.add("btn-cerrar");

  // Cuando se presiona, se cierra la imagen
  cerrarImagen.onclick = function () {
    overlay.remove();
    body.classList.remove("fijar-body");
  };

  overlay.appendChild(cerrarImagen);

  // Mostrar en el HTML
  const body = document.querySelector("body");
  body.appendChild(overlay);
  body.classList.add("fijar-body");
}
