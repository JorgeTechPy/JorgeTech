// ========================================
// MODO OSCURO CON LOCALSTORAGE
// ========================================

// Función para aplicar el tema
function aplicarTema(tema) {
    if (tema === 'oscuro') {
        document.body.setAttribute('data-theme', 'dark');
        actualizarBotonModoOscuro(true);
    } else {
        document.body.removeAttribute('data-theme');
        actualizarBotonModoOscuro(false);
    }
}

// Función para actualizar el texto y el ícono del botón
function actualizarBotonModoOscuro(esOscuro) {
    const boton = document.querySelector('.btn-modo-oscuro');
    if (boton) {
        if (esOscuro) {
            boton.innerHTML = '<i class="bi bi-sun-fill me-1"></i> Modo Claro';
        } else {
            boton.innerHTML = '<i class="bi bi-moon-stars-fill me-1"></i> Modo Oscuro';
        }
    }
}

// Cargar el tema guardado al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    // Obtener el tema guardado en localStorage
    const temaGuardado = localStorage.getItem('tema') || 'claro';
    aplicarTema(temaGuardado);

    // Agregar evento al botón de modo oscuro
    const botonModoOscuro = document.querySelector('.btn-modo-oscuro');
    
    if (botonModoOscuro) {
        botonModoOscuro.addEventListener('click', function() {
            // Verificar el tema actual
            const temaActual = localStorage.getItem('tema') || 'claro';
            
            // Cambiar al tema opuesto
            if (temaActual === 'claro') {
                localStorage.setItem('tema', 'oscuro');
                aplicarTema('oscuro');
            } else {
                localStorage.setItem('tema', 'claro');
                aplicarTema('claro');
            }
        });
    }
});