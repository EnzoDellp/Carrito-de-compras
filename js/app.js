const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
  //*cuando agregas un curso presionando "Agregar al Carrito"
  listaCursos.addEventListener("click", agregarCurso);

  //elimina curso del carrito
  carrito.addEventListener("click", eliminarCurso);

  //muestra los cursos del localStorage
  document.addEventListener("DOMContentLoaded", () => {
    articulosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carritoHTML();
  });
  //vaciar el carrito
  vaciarCarritoBtn.addEventListener("click", () => {
    articulosCarrito = []; //vaciar el arreglo
    limparHTML(); //Eliminamos todo el HTML
  });
}

//funciones

function agregarCurso(e) {
  e.preventDefault();

  if ((e.target.classList.contains = "agregar-carrito")) {
    const cursoSelecionado = e.target.parentElement.parentElement;
    leerDatosCurso(cursoSelecionado);
  }
}
//eliminar curso del carrito
function eliminarCurso(e) {
  if (e.target.classList.contains("borrar-curso")) {
    const cursoId = e.target.getAttribute("data-id");
    //elimina del arreglo de articulosCarrito por el data-id

    articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId);

    carritoHTML(); //iteramos sobre el carrito y mostramos su HTML
  }
}

//lee el contenido del HTML y extrae info del curso
function leerDatosCurso(curso) {
  //crear un ojeto con el contenido del curso actual
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  //revisa si un elemento ya existe en el carrito
  const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);
  if (existe) {
    const cursos = articulosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso; //retorna el objeto acutalizado
      } else {
        return curso; //retorna los objetos que no son los duplicados
      }
    });
    articulosCarrito = [...cursos];
  } else {
    articulosCarrito = [...articulosCarrito, infoCurso];
  }
  //agregar elementos al carrito
  carritoHTML();
}
//muestra el carrito de compras en el HTML

function carritoHTML() {
  //limpiar el HTML
  limparHTML();
  //recorre el carrito y genera el HTML
  articulosCarrito.forEach((curso) => {
    const { imagen, titulo, precio, cantidad, id } = curso;
    const row = document.createElement("tr");
    row.innerHTML = `
    <td> <img src="${imagen}" width=100> </td>
    <td>${titulo}</td>
    <td>${precio}</td>
    <td>${cantidad}</td>
    <td>
    <a href="#" class="borrar-curso" data-id="${id}" > x </a>
    </td>

    `;
    //agrega el HTML en el tbody
    contenedorCarrito.appendChild(row);
  });
  //Agregar al local Storage
  sincornizarStorage();
}
function sincornizarStorage() {
  localStorage.setItem("carrito", JSON.stringify(articulosCarrito));
}
//elimina los cursos de tbody
function limparHTML() {
  //forma lenta
  //   contenedorCarrito.innerHTML = "";
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
