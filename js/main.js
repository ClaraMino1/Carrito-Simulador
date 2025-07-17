/*MEJORAS FUTURAS

-corregir los decimales en el carrito
-limitar los decimales en la suma total del carrito
- LocalStorage para el carrito
-poder buscar un libro(filter)
*/

const productos = [
    {"id": 1,
     "titulo":"Libertad y cuerpo",
     "precio": 15.070,
     "imagen": "https://minoydavila.com.ar/wp-content/uploads/2025/05/Libertad-y-cuerpo_1600-400x623.jpg"
    },
    {"id": 2,
     "titulo":"Pedagogia integral por niveles de profundidad",
     "precio": 10.500,
     "imagen": "https://minoydavila.com.ar/wp-content/uploads/2025/02/Pedagogia-integral-por-niveles-de-profundidad_1600-400x636.jpg"
    },
    {"id": 3,
     "titulo":"La anti-vida y el destino cósmico",
     "precio": 31.100,
     "imagen": "https://minoydavila.com.ar/wp-content/uploads/2025/03/HP-Lovecraft_1600-400x621.jpg"
    },
    {"id": 4,
     "titulo":"Teología verde",
     "precio": 25.000,
     "imagen": "https://minoydavila.com.ar/wp-content/uploads/2025/03/Teologia-verde_1600-1-400x619.jpg"
    },
    {"id": 5,
     "titulo":"Educacion critica e inclusion",
     "precio": 17.900,
     "imagen": "https://minoydavila.com.ar/wp-content/uploads/2025/01/Educacion-critica-e-inclusion_1600-400x617.jpg"
    }
];

const subtitulo = document.getElementById("subtitulo") //obtiene el subtitulo
let seccionProductos = document.getElementsByTagName("section");//obtiene el section
const carritoElemento = document.getElementById("carrito");//obtiene el aside carrito

seccionProductos = seccionProductos[0];

if(productos.length === 0){ //si no hay libros muestra no hay publicaciones disponibles y elimina el carrito
    const tituloCarrito = carritoElemento.querySelector("h3"); //obtiene el titulo del carrito para posteriormente poder borrarlo
    carritoElemento.removeAttribute("id") //elimina el id que referencia a los estilos del carrito
    carritoElemento.removeChild(tituloCarrito)//borra el h3 titulo del carrito
    subtitulo.innerText = "no hay publicaciones disponibles"
}else{ //si hay libros, los crea dinamicamente en el dom

    //formato de moneda:
    const opcionesFormato = {
        style: 'currency', // Indica que hay formato de moneda
        currency: 'ARS',   // Código de la moneda
        minimumFractionDigits: 3, // Asegura al menos 3 decimales
        };

    // Crea un formateador de números para español de Argentina
    const formateador = new Intl.NumberFormat('es-AR', opcionesFormato);


    productos.forEach(producto=>{//crea tantos productos como haya en el array

        const nuevoProducto = document.createElement("div"); //crea un div
        nuevoProducto.classList.add("producto"); //le asigno la clase producto
        
        const link = document.createElement("a"); //crea un link
        link.setAttribute("href","pages/detalle-producto.html") //le asigno un enlace
        link.setAttribute("target","_blank") //El enlace se va a abrir en otra pestaña

        const tituloProducto = document.createElement("h3"); //crea el titulo del producto
        tituloProducto.classList.add("producto-titulo"); //le asigno la clase producto-titulo
        tituloProducto.innerText = producto.titulo //valor del titulo
        
        const img = document.createElement("img"); //crea una imagen
        img.setAttribute("src",producto.imagen) //le asigno la imagen
        img.classList.add("producto-img");


        const precioElemento = document.createElement("p"); //crea un p para mostrar los precios
        precioElemento.innerText = formateador.format(producto.precio);//asigna los valores a p
        precioElemento.classList.add("producto-precio");


        const button = document.createElement("button"); //crea un boton
        button.classList.add("producto-boton");
        button.innerText = "Añadir al carrito"; //valor del boton
        button.addEventListener("click",()=>{ //le agrego un evento a cada botón para poder añadir al carrito
            anadirAlCarrito(producto) //llama a la lógica para añadir al carrito
        })


        //inserta la estructura html de libros al dom
        seccionProductos.append(nuevoProducto); 
        link.append(tituloProducto,img);
        nuevoProducto.append(link,precioElemento,button)
        
    })
}
    //      ----LOGICA CARRITO------
    
    const carrito = []; //carrito inicial vacio (array de objetos)
    const listaCarrito = document.getElementById("lista-carrito");//ul
    const boton = document.getElementsByClassName("producto-boton")// Selecciona todos los elementos con la clase 'producto-boton'
    const itemVacio = document.createElement("li");//crea un item para mostrar el carrito vaciov

    const total = document.createElement("h3")//crea un h3 para mostrar el total al final de la ul
    total.innerText = "" //por defecto la suma total es vacía
    carritoElemento.append(total)

    function anadirAlCarrito(producto){ //recibe(objeto) el producto clickeado
        carrito.push(producto)
        actualizarCarritoDOM()
        sumaTotal() //calcular el total
    }

    function sumaTotal(){
        const suma = carrito.reduce((acc, producto)=> acc + producto.precio ,0) //va acumulando el total
        total.innerText = "total $" + suma
    }

    function actualizarCarritoDOM(){
        if(carrito.length === 0){ //si el carrito está vacío dice que no hay productos
            itemVacio.innerText = "Aún no hay productos en el carrito"
            listaCarrito.append(itemVacio)
        }else{//si hay productos en el carrito los muestra
            
            listaCarrito.innerHTML = ''; //limpia el carrito
            
            //Iterar sobre cada producto del carrito
            carrito.forEach(producto => {
                const itemCarrito = document.createElement("li");//por cada producto del array crea un item de carrito
                itemCarrito.innerText = producto.titulo + " $" +producto.precio; // Asigna el nombre del producto y precio al li
                listaCarrito.append(itemCarrito); // muestra el li en el dom
            });
        }
    }
    
actualizarCarritoDOM(); //muestra que el carrito está vacío al cargar la página