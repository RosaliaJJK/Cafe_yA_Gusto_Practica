const formulario = document.querySelector("form");

formulario.addEventListener("submit", async (e) => {

    e.preventDefault();

    const datos = {
        nombre: document.getElementById("nombre").value,
        producto: document.getElementById("producto").value,
        tamano: document.getElementById("tamano").value,
        metodo_pago: document.getElementById("metodo_pago").value
    };

    try {

        const respuesta = await fetch("/guardar-pedido", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(datos)

        });

        const texto = await respuesta.text();

        console.log("RESPUESTA:");
        console.log(texto);

        if (!texto) {

            alert("Servidor devolvió vacío");
            return;

        }

        const resultado = JSON.parse(texto);

        alert(resultado.mensaje);

        formulario.reset();

    } catch (error) {

        console.log("ERROR:");
        console.log(error);

        alert("Error conectando con servidor");

    }

});

// =========================
// CARRUSEL PROMOCIONES
// =========================

const track = document.querySelector('.carousel-track');
const slides = document.querySelectorAll('.slide');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

let currentIndex = 0;

function updateCarousel() {

    track.style.transform =
        `translateX(-${currentIndex * 100}%)`;

}

nextBtn.addEventListener('click', () => {

    currentIndex++;

    if (currentIndex >= slides.length) {
        currentIndex = 0;
    }

    updateCarousel();

});

prevBtn.addEventListener('click', () => {

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = slides.length - 1;
    }

    updateCarousel();

});

// AUTO PLAY

setInterval(() => {

    currentIndex++;

    if (currentIndex >= slides.length) {
        currentIndex = 0;
    }

    updateCarousel();

}, 4000);