// Variable para rastrear el estado del botón
let mostrarTodos = true;

// URL del endpoint de la API
const apiUrl = 'https://digimon-api.vercel.app/api/digimon';

// Función para realizar la solicitud a la API
function obtenerDigimons() {
    return fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error al realizar la solicitud:', error);
        });
}

// Función para mostrar Digimons filtrados por nombre
function buscarPorNombre(nombre) {
    obtenerDigimons().then(data => {
        const digimonsFiltrados = nombre === '' ? data : data.filter(digimon => digimon.name.toLowerCase().includes(nombre.toLowerCase()));
        mostrarLista(digimonsFiltrados);
    });
}

// Función para mostrar Digimons filtrados por nivel
function mostrarPorNivel(nivel) {
    obtenerDigimons().then(data => {
        const digimonsFiltrados = nivel === '' ? data : data.filter(digimon => digimon.level === nivel);
        mostrarLista(digimonsFiltrados);
    });
}

// Función para mostrar la lista de Digimons en el documento HTML
function mostrarLista(digimons) {
    const listaDigimons = document.getElementById('listaDigimons');
    listaDigimons.innerHTML = ''; // Limpiar contenido anterior

    // Mostrar la información de los Digimons en el documento HTML
    digimons.forEach(digimon => {
        const digimonInfo = document.createElement('div');
        digimonInfo.innerHTML = `
            <p>Nombre: ${digimon.name}</p>
            <p>Nivel: ${digimon.level}</p>
            <img src="${digimon.img}" alt="${digimon.name}">`;
        listaDigimons.appendChild(digimonInfo);
    });

    // Actualizar el texto del botón "Mostrar Todos" o "Ocultar"
    const mostrarOcultarBtn = document.getElementById('mostrarOcultar');
    mostrarOcultarBtn.textContent = mostrarTodos ? 'Ocultar' : 'Mostrar Todos';
}

// Función para mostrar u ocultar todos los Digimons
function mostrarOcultar() {
    mostrarTodos = !mostrarTodos;
    if (mostrarTodos) {
        obtenerDigimons().then(data => mostrarLista(data));
    } else {
        mostrarLista([]);
    }
}


// Mostrar todos los Digimons al cargar la página
document.addEventListener('DOMContentLoaded', () => mostrarOcultar());
