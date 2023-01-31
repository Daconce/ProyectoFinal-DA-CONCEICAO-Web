let carrito = {};
let precioEmpanada = 450;

const mostrarLista = async () => {
  let lista = document.getElementById("listaEmpanadas");
  lista.innerHTML = "";

  const response = await fetch("../data/data.json");
  const empanadas = await response.json();

  empanadas.forEach((empanada) => {
    let item = document.createElement("li");
    item.innerHTML = `${empanada.gusto} - Cantidad: ${
      carrito[empanada.gusto] || 0
    }`;
    let botonAgregar = document.createElement("button");
    botonAgregar.style.cssText = "margin-left: 10px;background-color:green";
    botonAgregar.innerHTML = "Añadir";
    botonAgregar.onclick = () => {
      if (!carrito[empanada.gusto]) {
        carrito[empanada.gusto] = 1;
      } else {
        carrito[empanada.gusto]++;
      }
      localStorage.setItem("carrito", JSON.stringify(carrito));
      console.log("Carrito actualizado:", carrito);
      mostrarLista();
    };
    let botonQuitar = document.createElement("button");
    botonQuitar.style.cssText = "background-color:red";
    botonQuitar.innerHTML = "Quitar";
    botonQuitar.onclick = () => {
      if (carrito[empanada.gusto]) {
        carrito[empanada.gusto]--;
        if (carrito[empanada.gusto] === 0) {
          delete carrito[empanada.gusto];
        }
        localStorage.setItem("carrito", JSON.stringify(carrito));
        console.log("Carrito actualizado:", carrito);
        mostrarLista();
      }
    };
    item.appendChild(botonAgregar);
    item.appendChild(botonQuitar);
    lista.appendChild(item);
  });

  let carritoListado = document.getElementById("carrito-listado");
  carritoListado.innerHTML = "";
  let total = 0;
  for (let empanada in carrito) {
    let item = document.createElement("li");
    let precio = carrito[empanada] * precioEmpanada;
    total += precio;
    item.innerHTML = `${empanada} - Cantidad: ${carrito[empanada]} - Precio: $${precio}`;
    carritoListado.appendChild(item);
  }
  document.getElementById("total").innerHTML = `Total: $${total}`;

  let BotonesContainer = document.getElementById("botones-lista");
  BotonesContainer.style.cssText = "display:flex;justify-content:center";

  let botonLimpiar = document.getElementById("limpiar-carrito");
  botonLimpiar.style.cssText =
    "background-color:orange;padding:3px;font-size:18px;text-align:center;cursor:pointer";
  botonLimpiar.onclick = () => {
    carrito = {};
    localStorage.removeItem("carrito");
    console.log("Carrito limpiado.");
    estadoPedido.innerHTML = "";
    mostrarLista();
    Swal.fire({
      title: "Carrito vacío",
      text: "Aceptar para continuar...",
      icon: "success",
      iconColor: "orange",
      color: "#fff",
      background: "#000",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "orange",
    });
  };

  let estadoPedido = document.getElementById("estado-pedido");
  estadoPedido.style.cssText =
    "display:flex;justify-content:center;color:white;font-family:sans-serif";
  let botonFinalizar = document.getElementById("finalizar-compra");
  botonFinalizar.style.cssText =
    "background-color:orange;padding:3px;font-size:18px;text-align:center;cursor:pointer";
  botonFinalizar.onclick = () => {
    if (Object.keys(carrito).length === 0) {
      Swal.fire({
        title: "No ha seleccionado productos!",
        text: "Debe seleccionar al menos 1 producto...",
        icon: "warning",
        iconColor: "orange",
        color: "#fff",
        background: "#000",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "orange",
      });
    } else {
      estadoPedido.innerHTML = "Compra finalizada, ¡gracias por su compra!";
      Swal.fire({
        title: "Pedido realizado!",
        text: "Su pedido ha sido confirmado...",
        icon: "success",
        iconColor: "green",
        color: "#fff",
        background: "#000",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "orange",
      });
    }
  };
};

const cargarCarrito = () => {
  let carritoGuardado = localStorage.getItem("carrito");
  if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
  }
  console.log("Carrito cargado:", carrito);
};

cargarCarrito();
mostrarLista();
