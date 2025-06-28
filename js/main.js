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
]

const carrito = []; //carrito inicial vacio

const subtitulo = document.getElementById("subtitulo")
let seccionProductos = document.getElementsByTagName("section");

seccionProductos = seccionProductos[0];

if(productos.length === 0){ //si no hay libros
    subtitulo.innerText = "no hay publicaciones disponibles"
}else{ //si hay libros, los crea dinamicamente en el dom


    //ESTO LO INVESTIGUÉ YA QUE ME DABA ERROR PONER precioElemento.innerText = "$"+producto.precio 
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


    //inserta los elementos al dom
    seccionProductos.append(nuevoProducto); 
    link.append(tituloProducto,img);
    nuevoProducto.append(link,precioElemento,button)
    })

    const botones = document.querySelectorAll('.producto-boton'); // Selecciona todos los elementos con la clase 'producto-boton'

//     //cada vez que se haga click en un boton
//     botones.forEach(boton => {
//      boton.addEventListener("click", () => {
        
//      });
//  });
    
}







