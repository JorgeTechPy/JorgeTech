// ======================
// DATOS DE PRODUCTOS
// ======================

const productos = [
    {
        nombre: "iPhone 11 128gb",
        precio: "Gs. 1.300.000",
        imagen: "../img/produc1.jpeg",
        categoria: "celulares"
    },
    {
        nombre: "iPhone 14 Pro Max 256gb",
        precio: "Gs. 4.850.000",
        imagen: "../img/produc2.jpeg",
        categoria: "celulares"
    },
    {
        nombre: "iPhone 13 Pro 128gb",
        precio: "Gs. 3.400.000",
        imagen: "../img/produc3.jpeg",
        categoria: "celulares"
    },
    {
        nombre: "Stronger With You",
        precio: "Gs. 700.000",
        imagen: "../img/produc4.jpeg",
        categoria: "computadoras"
    },
    {
        nombre: "AZZARO THE MOST WANTED",
        precio: "Gs. 700.000",
        imagen: "../img/produc5.jpeg",
        categoria: "accesorios"
    },
    {
        nombre: "SCANDAL Jean Paul",
        precio: "Gs. 850.000",
        imagen: "../img/produc7.jpeg",
        categoria: "accesorios"
    }
];

// ======================
// LIGHTBOX
// ======================

let currentIndex = 0;

function openLightbox(index) {
    currentIndex = index;
    updateLightbox();
    document.getElementById('lightbox').classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevenir scroll del body
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = ''; // Restaurar scroll
}

function changeImage(direction) {
    currentIndex += direction;
    
    // Loop: si llega al final, vuelve al inicio
    if (currentIndex >= productos.length) {
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = productos.length - 1;
    }
    
    updateLightbox();
}

function updateLightbox() {
    const producto = productos[currentIndex];
    
    document.getElementById('lightboxImg').src = producto.imagen;
    document.getElementById('lightboxImg').alt = producto.nombre;
    document.getElementById('lightboxNombre').textContent = producto.nombre;
    document.getElementById('lightboxPrecio').textContent = producto.precio;
    
    // Actualizar enlace de WhatsApp con nombre del producto
    const whatsappBtn = document.querySelector('.btn-whatsapp-modal');
    const mensaje = encodeURIComponent(`Hola JorgeTech, me interesa el producto: ${producto.nombre}`);
    whatsappBtn.href = `https://wa.me/595975270148?text=${mensaje}`;
}

// Cerrar lightbox con tecla ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});

// Navegación con flechas del teclado
document.addEventListener('keydown', function(e) {
    const lightbox = document.getElementById('lightbox');
    if (lightbox.classList.contains('active')) {
        if (e.key === 'ArrowRight') {
            changeImage(1);
        } else if (e.key === 'ArrowLeft') {
            changeImage(-1);
        }
    }
});

// ======================
// FILTROS DE CATEGORÍA
// ======================

const filterButtons = document.querySelectorAll('.btn-filter');
const productItems = document.querySelectorAll('.producto-item');

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        const category = this.getAttribute('data-category');
        
        // Actualizar botón activo
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        // Filtrar productos
        productItems.forEach(item => {
            if (category === 'todos' || item.getAttribute('data-category') === category) {
                item.style.display = 'block';
                // Animación de entrada
                item.style.animation = 'none';
                setTimeout(() => {
                    item.style.animation = 'fadeInUp 0.5s ease';
                }, 10);
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// ======================
// SCROLL SUAVE (opcional)
// ======================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ======================
// LOADING ANIMATION
// ======================

window.addEventListener('load', function() {
    document.querySelectorAll('.producto-item').forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
});