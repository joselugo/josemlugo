/**
 * ========================================
 * PORTFOLIO CV - MAIN.JS
 * Funcionalidad interactiva del sitio
 * ========================================
 */

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar todas las funcionalidades
    initNavbar();
    initMobileMenu();
    initScrollAnimations();
    initSmoothScroll();
    initSkillBars();
});

/**
 * ========================================
 * 1. NAVBAR - Efecto de scroll
 * ========================================
 */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    
    if (!navbar) return;
    
    // Función para manejar el scroll
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    
    // Escuchar eventos de scroll
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Verificar posición inicial
    handleScroll();
}

/**
 * ========================================
 * 2. MENÚ MÓVIL
 * ========================================
 */
function initMobileMenu() {
    const toggleBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (!toggleBtn || !mobileMenu) return;
    
    // Toggle del menú
    toggleBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        
        // Cambiar icono
        const icon = toggleBtn.querySelector('i');
        if (mobileMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Cerrar menú al hacer click en un enlace
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            const icon = toggleBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
    
    // Cerrar menú al hacer click fuera
    document.addEventListener('click', (e) => {
        if (!toggleBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.remove('active');
            const icon = toggleBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

/**
 * ========================================
 * 3. ANIMACIONES AL HACER SCROLL
 * ========================================
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if (animatedElements.length === 0) return;
    
    // Opciones del Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    // Callback cuando los elementos entran en viewport
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Opcional: dejar de observar después de mostrar
                // observer.unobserve(entry.target);
            }
        });
    };
    
    // Crear el observador
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observar todos los elementos
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

/**
 * ========================================
 * 4. SCROLL SUAVE PARA ENLACES
 * ========================================
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    if (links.length === 0) return;
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Ignorar si es solo "#"
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * ========================================
 * 5. BARRAS DE HABILIDADES ANIMADAS
 * ========================================
 */
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill__fill');
    
    if (skillBars.length === 0) return;
    
    // Opciones del Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    // Callback cuando las barras entran en viewport
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const targetWidth = bar.style.width;
                
                // Resetear width para crear animación
                bar.style.width = '0';
                
                // Animar después de un pequeño delay
                setTimeout(() => {
                    bar.style.width = targetWidth;
                }, 100);
                
                // Dejar de observar esta barra
                skillObserver.unobserve(bar);
            }
        });
    };
    
    // Crear el observador
    const skillObserver = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observar todas las barras
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

/**
 * ========================================
 * 6. FUNCIÓN AUXILIAR: Debounce
 * Útil para optimizar eventos de scroll
 * ========================================
 */
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * ========================================
 * 7. FUNCIÓN AUXILIAR: Throttle
 * Útil para optimizar eventos de resize
 * ========================================
 */
function throttle(func, limit = 100) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}