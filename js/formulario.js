// Configuración de EmailJS
const EMAILJS_CONFIG = {
    publicKey: 'Vbx64AZ7tZFZJ1IxY',
    serviceId: 'service_ppl8b96',
    templateId: 'template_3t9w5qh'
};

// INICIALIZAR EMAILJS

(function() {
    emailjs.init(EMAILJS_CONFIG.publicKey);
})();

// MANEJAR ENVÍO DEL FORMULARIO

document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('contact-form');
    
    if (formulario) {
        formulario.addEventListener('submit', function(event) {
            event.preventDefault();
            enviarFormulario();
        });
    }
});

// FUNCIÓN PARA ENVIAR EL FORMULARIO

function enviarFormulario() {
    // Obtener referencias a elementos
    const formulario = document.getElementById('contact-form');
    const boton = formulario.querySelector('button[type="submit"]');
    const mensajeExito = document.getElementById('mensaje-exito');
    const mensajeError = document.getElementById('mensaje-error');

    // Validar que se haya seleccionado un tipo
    const tipoSeleccionado = formulario.querySelector('input[name="tipo"]:checked');
    if (!tipoSeleccionado) {
        alert('Por favor selecciona si es una Queja o Sugerencia');
        return;
    }

    // Obtener fecha y hora actual
    const ahora = new Date();
    const fecha = ahora.toLocaleString('es-PY', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });

    // Preparar los parámetros del template
    const templateParams = {
        nombre: document.getElementById('nombre').value.trim(),
        email: document.getElementById('email').value.trim(),
        telefono: document.getElementById('telefono').value.trim(),
        tipo: tipoSeleccionado.value,
        categoria: document.getElementById('categoria').value,
        mensaje: document.getElementById('mensaje').value.trim(),
        fecha: fecha
    };

    // Guardar texto original del botón
    const textoOriginal = boton.innerHTML;

    // Deshabilitar botón y mostrar loading
    boton.disabled = true;
    boton.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Enviando...';

    // Ocultar mensajes previos
    mensajeExito.style.display = 'none';
    mensajeError.style.display = 'none';

    // Enviar email usando EmailJS
    emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        templateParams
    )
    .then(function(response) {
        console.log('✅ Email enviado correctamente', response.status, response.text);
        
        // Mostrar mensaje de éxito
        mensajeExito.style.display = 'block';
        mensajeError.style.display = 'none';
        
        // Scroll al mensaje
        mensajeExito.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Limpiar el formulario
        formulario.reset();
        
        // Restaurar el botón
        boton.disabled = false;
        boton.innerHTML = textoOriginal;
        
        // Ocultar mensaje de éxito después de 8 segundos
        setTimeout(() => {
            mensajeExito.style.display = 'none';
        }, 8000);
        
        // Opcional: Mostrar confetti o animación de éxito
        mostrarAnimacionExito();
        
    })
    .catch(function(error) {
        console.error('❌ Error al enviar email:', error);
        
        // Mostrar mensaje de error
        mensajeError.style.display = 'block';
        mensajeExito.style.display = 'none';
        
        // Scroll al mensaje
        mensajeError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Restaurar el botón
        boton.disabled = false;
        boton.innerHTML = textoOriginal;
        
        // Ocultar mensaje de error después de 8 segundos
        setTimeout(() => {
            mensajeError.style.display = 'none';
        }, 8000);
    });
}

function mostrarAnimacionExito() {
    // Crear elemento de confetti o animación simple
    const body = document.body;
    const celebracion = document.createElement('div');
    celebracion.innerHTML = '🎉';
    celebracion.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        font-size: 80px;
        z-index: 10000;
        pointer-events: none;
        animation: celebrar 1s ease-out forwards;
    `;
    
    // Agregar animación CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes celebrar {
            0% {
                transform: translate(-50%, -50%) scale(0) rotate(0deg);
                opacity: 1;
            }
            50% {
                transform: translate(-50%, -50%) scale(1.5) rotate(180deg);
                opacity: 1;
            }
            100% {
                transform: translate(-50%, -50%) scale(0) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    
    document.head.appendChild(style);
    body.appendChild(celebracion);
    
    // Remover después de la animación
    setTimeout(() => {
        celebracion.remove();
        style.remove();
    }, 1000);
}

document.addEventListener('DOMContentLoaded', function() {
    // Validar teléfono (solo números y guiones)
    const telefonoInput = document.getElementById('telefono');
    if (telefonoInput) {
        telefonoInput.addEventListener('input', function(e) {
            // Permitir solo números, espacios y guiones
            this.value = this.value.replace(/[^0-9\s-]/g, '');
        });
    }

    // Contador de caracteres para el mensaje (opcional)
    const mensajeTextarea = document.getElementById('mensaje');
    if (mensajeTextarea) {
        const maxCaracteres = 500;
        const contador = document.createElement('div');
        contador.className = 'form-text text-end';
        contador.id = 'contador-caracteres';
        mensajeTextarea.parentNode.appendChild(contador);

        mensajeTextarea.addEventListener('input', function() {
            const caracteresActuales = this.value.length;
            contador.textContent = `${caracteresActuales} / ${maxCaracteres} caracteres`;
            
            if (caracteresActuales > maxCaracteres) {
                contador.style.color = '#dc3545';
                this.value = this.value.substring(0, maxCaracteres);
            } else {
                contador.style.color = '#6c757d';
            }
        });

        // Mostrar contador inicial
        mensajeTextarea.dispatchEvent(new Event('input'));
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('contact-form');
    const botonReset = formulario.querySelector('button[type="reset"]');
    
    if (botonReset) {
        botonReset.addEventListener('click', function(e) {
            // Si hay contenido en el formulario, pedir confirmación
            const nombreValue = document.getElementById('nombre').value;
            const mensajeValue = document.getElementById('mensaje').value;
            
            if (nombreValue || mensajeValue) {
                const confirmacion = confirm('¿Estás seguro de que deseas limpiar el formulario?');
                if (!confirmacion) {
                    e.preventDefault();
                }
            }
        });
    }
});