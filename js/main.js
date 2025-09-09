// Ejecutar cuando el DOM esté completamente cargado
// main.js

// Ejecutar cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // INTERSECTION OBSERVER PARA ANIMACIONES
    // ==========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observar elementos para animaciones
    document.querySelectorAll('.intro-content, .service-card, .project-card, .project-section, .stat-card, .card, .step').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // ==========================================
    // FORMAS INTERACTIVAS QUE SIGUEN EL MOUSE
    // ==========================================
    const shapes = document.querySelectorAll('.shape');
    let mouseX = 0, mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.02;
            const x = (mouseX * speed) * 0.5;
            const y = (mouseY * speed) * 0.5;
            
            requestAnimationFrame(() => {
                shape.style.transform = `translate(${x}px, ${y}px) scale(${1 + Math.sin(Date.now() * 0.002 + index) * 0.1})`;
            });
        });
    });

    // ==========================================
    // FUNCIONALIDAD DE FILTRADO DEL PORTAFOLIO
    // ==========================================
    const filterButtons = document.querySelectorAll('.portfolio-filter-btn');
    const portfolioItems = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover clase active de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Añadir clase active al botón clickeado
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all') {
                    item.classList.remove('hide');
                    item.classList.add('show');
                } else {
                    if (item.classList.contains(filterValue)) {
                        item.classList.remove('hide');
                        item.classList.add('show');
                    } else {
                        item.classList.add('hide');
                        item.classList.remove('show');
                    }
                }
            });
        });
    });

    // ==========================================
    // REDIRECCIÓN A PÁGINAS INDIVIDUALES DE PROYECTOS
    // ==========================================
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project');
            // Redireccionar a la página individual del proyecto
            window.location.href = `project-${projectId}.html`;
        });
        
        // Efectos visuales mejorados para indicar que es clickeable
        card.addEventListener('mouseenter', () => {
            if (!card.style.transform.includes('scale')) {
                card.style.transform = 'translateY(-8px) scale(1.02)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (!card.classList.contains('hide')) {
                card.style.transform = 'translateY(0) scale(1)';
            }
        });
    });

    // ==========================================
    // SCROLL SUAVE PARA ENLACES INTERNOS
    // ==========================================
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

    // ==========================================
    // NAVEGACIÓN ACTIVA SEGÚN SCROLL
    // ==========================================
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionHeight = section.offsetHeight;
            
            if (sectionTop <= 100 && sectionTop + sectionHeight > 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Actualizar navegación activa en scroll
    window.addEventListener('scroll', updateActiveNav);
    
    // ==========================================
    // LOADING INICIAL
    // ==========================================
    // Opcional: Añadir clase loaded al body después de que todo esté cargado
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        console.log('Portfolio loaded successfully!');
    });

    // ==========================================
    // PREVENCIÓN DE ERRORES
    // ==========================================
    // Manejar errores de imágenes (si añades imágenes reales después)
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            console.log('Error loading image:', this.src);
            // Opcional: añadir imagen de respaldo
            // this.src = 'images/placeholder.jpg';
        });
    });

    particlesJS('particles-js',
  
  {
    "particles": {
    "number": {
      "value": 110,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#3f89cc"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#8e8080",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 6,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "repulse"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true,
    "config_demo": {
      "hide_card": false,
      "background_color": "#f4f9ff",
      "background_image": "",
      "background_position": "50% 50%",
      "background_repeat": "no-repeat",
      "background_size": "cover"
    }
  }

);

    console.log('Main.js loaded and initialized!');
});
