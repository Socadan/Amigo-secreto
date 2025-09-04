let amigos = [];

function agregarAmigo() {
    let amigoInput = document.getElementById('amigo');
    let nombreAmigo = amigoInput.value.trim();

    // Si ya hay resultados en pantalla, reinicia el juego antes de añadir un nuevo nombre.
    if (document.getElementById('resultado').textContent !== '') {
        reiniciarJuego();
    }

    // Validar que el campo no esté vacío
    if (nombreAmigo === '') {
        alert('Por favor, ingrese un nombre.');
        return;
    }

    // Validar que el nombre no esté repetido (ignorando mayúsculas/minúsculas)
    if (amigos.map(a => a.toLowerCase()).includes(nombreAmigo.toLowerCase())) {
        alert('Este nombre ya existe');
        amigoInput.value = '';
        amigoInput.focus();
        return;
    }

    // Agregar amigo y actualizar la interfaz
    amigos.push(nombreAmigo);
    actualizarListaAmigos();

    amigoInput.value = '';
    amigoInput.focus();
}

function sortearAmigo() {
    // Validar que haya al menos 3 nombres
    if (amigos.length < 3) {
        alert('Por favor, ingrese 3 nombres como mínimo');
        return;
    }

    // Elegir un ganador al azar
    let indiceGanador = Math.floor(Math.random() * amigos.length);
    let ganador = amigos[indiceGanador];

    // Mostrar el ganador
    let elementoResultado = document.getElementById('resultado');
    elementoResultado.innerHTML = `<li>¡El ganador es: <strong>${ganador}</strong>!</li>`;

    // Limpiar la lista de participantes para el próximo juego, manteniendo el resultado visible
    amigos = [];
    actualizarListaAmigos();
}

function actualizarListaAmigos() {
    let lista = document.getElementById('listaAmigos');
    lista.innerHTML = '';

    for (let i = 0; i < amigos.length; i++) {
        let li = document.createElement('li');
        li.textContent = amigos[i];
        lista.appendChild(li);
    }
}

function reiniciarJuego() {
    amigos = [];
    document.getElementById('listaAmigos').innerHTML = '';
    document.getElementById('resultado').innerHTML = '';
    document.getElementById('amigo').focus();
}

// Permite agregar amigos presionando la tecla "Enter"
document.getElementById('amigo').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Evita que el formulario se envíe si estuviera dentro de un <form>
        agregarAmigo();
    }
});