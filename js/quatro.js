/**
 * Quatro • Pastelería Artesanal
 * Script compartido: Navegación elástica, menúes, WhatsApp helper y accesibilidad
 */

(function () {
  'use strict';

  // 1. Quitar clase sin-js y marcar cuando el DOM esté listo para animar garabatos
  document.documentElement.classList.remove('sin-js');
  document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('cargado');
    initLoaderCookie();
    initParticulas();
    initNav();
    initMenuMovil();
    initDesplegableEscritorio();
  });

  // 2. Helper de WhatsApp (con número corregido a formato internacional +54 9 343 468-5501)
  const NUMERO_WA = '5493434685501';

  function linkWhatsApp(texto) {
    return `https://wa.me/${NUMERO_WA}?text=${encodeURIComponent(texto)}`;
  }

  window.Quatro = {
    linkWhatsApp,
    numeroWhatsApp: '343 468-5501'
  };

  // --------------------------------------------------------------------------
  // Navegación con Pastilla Elástica & Scrollspy
  // --------------------------------------------------------------------------
  function initNav() {
    const desktopNav = document.getElementById('navEscritorio');
    const pill = document.getElementById('navPastilla');
    if (!desktopNav || !pill) return;

    const navItems = desktopNav.querySelectorAll('[data-nav]');
    const itemInicio = desktopNav.querySelector('[data-nav="inicio"]');
    const itemProductos = desktopNav.querySelector('[data-nav="productos"]');
    const itemHistoria = desktopNav.querySelector('[data-nav="historia"]');
    const historiaSection = document.getElementById('nuestra-historia');
    const preguntasSection = document.getElementById('preguntas');

    const paginaActual = document.body.getAttribute('data-pagina') || 'inicio';
    let activeItem = paginaActual === 'inicio' ? itemInicio : itemProductos;
    let hoveredItem = null;

    function moverPastilla(targetEl) {
      if (!pill || !desktopNav) return;

      if (!targetEl) {
        pill.style.opacity = '0';
        navItems.forEach(item => {
          const btn = item.tagName === 'A' ? item : (item.querySelector('button') || item);
          btn.classList.remove('activo');
        });
        return;
      }

      const btn = targetEl.tagName === 'A' ? targetEl : (targetEl.querySelector('button') || targetEl);
      const navRect = desktopNav.getBoundingClientRect();
      const targetRect = btn.getBoundingClientRect();

      pill.style.left = `${targetRect.left - navRect.left}px`;
      pill.style.top = `${targetRect.top - navRect.top}px`;
      pill.style.width = `${targetRect.width}px`;
      pill.style.height = `${targetRect.height}px`;
      pill.style.opacity = '1';

      navItems.forEach(item => {
        const itemBtn = item.tagName === 'A' ? item : (item.querySelector('button') || item);
        if (item === targetEl) {
          itemBtn.classList.add('activo');
        } else {
          itemBtn.classList.remove('activo');
        }
      });
    }

    function sincronizarPastilla() {
      moverPastilla(hoveredItem || activeItem);
    }

    // Eventos hover
    navItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        hoveredItem = item;
        moverPastilla(item);
      });
    });

    desktopNav.addEventListener('mouseleave', () => {
      hoveredItem = null;
      moverPastilla(activeItem);
    });

    // Scrollspy solo para index.html
    if (paginaActual === 'inicio' && historiaSection && itemHistoria && itemInicio) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const scrollBehavior = prefersReducedMotion ? 'auto' : 'smooth';

      const mobileLinkHistoria = document.querySelector('#menuMovil a[href$="#nuestra-historia"]');
      const mobileLinkInicio = document.querySelector('#menuMovil a[href="index.html"], #menuMovil a[href="#inicio"]');

      function onScroll() {
        if (hoveredItem) return;
        const historiaRect = historiaSection.getBoundingClientRect();
        const preguntasRect = preguntasSection ? preguntasSection.getBoundingClientRect() : null;
        const mitadPantalla = window.innerHeight * 0.5;

        // Mientras no esté sobre la sección de nuestra historia (arriba o abajo), marcar 'inicio'
        const enHistoria = (historiaRect.top <= mitadPantalla) && (!preguntasRect || preguntasRect.top > mitadPantalla);
        const nuevoItem = enHistoria ? itemHistoria : itemInicio;

        if (mobileLinkHistoria && mobileLinkInicio) {
          if (enHistoria) {
            mobileLinkHistoria.classList.add('activo');
            mobileLinkInicio.classList.remove('activo');
          } else {
            mobileLinkInicio.classList.add('activo');
            mobileLinkHistoria.classList.remove('activo');
          }
        }

        if (activeItem !== nuevoItem) {
          activeItem = nuevoItem;
          moverPastilla(activeItem);
        }
      }

      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();

      function calcularOffsetNav() {
        const cabecera = document.querySelector('.cabecera');
        const navHeight = cabecera ? cabecera.offsetHeight : 72;
        return navHeight + 36; // Margen generoso para que el nav no tape ni quede pegado al título
      }

      function scrollAHistoria() {
        activeItem = itemHistoria;
        moverPastilla(itemHistoria);
        const navOffset = calcularOffsetNav();
        const targetY = Math.max(0, historiaSection.getBoundingClientRect().top + window.pageYOffset - navOffset);
        window.scrollTo({ top: targetY, behavior: scrollBehavior });
        history.pushState(null, '', '#nuestra-historia');
      }

      function scrollAInicio() {
        activeItem = itemInicio;
        moverPastilla(itemInicio);
        window.scrollTo({ top: 0, behavior: scrollBehavior });
        if (window.location.hash) {
          history.pushState(null, '', window.location.pathname);
        }
      }

      // Click suave en Nuestra Historia
      itemHistoria.addEventListener('click', (e) => {
        e.preventDefault();
        scrollAHistoria();
      });

      // Click suave en Inicio
      itemInicio.addEventListener('click', (e) => {
        e.preventDefault();
        scrollAInicio();
      });
    }

    // Inicializar posición
    sincronizarPastilla();
    requestAnimationFrame(sincronizarPastilla);
    setTimeout(sincronizarPastilla, 100);
    setTimeout(sincronizarPastilla, 300);

    if (document.fonts) {
      document.fonts.ready.then(sincronizarPastilla);
    }
    window.addEventListener('resize', sincronizarPastilla);
  }

  // --------------------------------------------------------------------------
  // Menú Móvil & Acordeón
  // --------------------------------------------------------------------------
  function initMenuMovil() {
    const btnMenu = document.getElementById('botonMenu');
    const menuMovil = document.getElementById('menuMovil');
    const iconoMenu = document.getElementById('iconoMenu');
    if (!btnMenu || !menuMovil) return;

    function cerrarMenu() {
      menuMovil.setAttribute('hidden', '');
      btnMenu.setAttribute('aria-expanded', 'false');
      btnMenu.setAttribute('aria-label', 'Abrir menú');
      if (iconoMenu) {
        iconoMenu.innerHTML = '<path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>';
      }
    }

    function abrirMenu() {
      menuMovil.removeAttribute('hidden');
      btnMenu.setAttribute('aria-expanded', 'true');
      btnMenu.setAttribute('aria-label', 'Cerrar menú');
      if (iconoMenu) {
        iconoMenu.innerHTML = '<path d="M6 6l12 12M6 18L18 6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>';
      }
    }

    btnMenu.addEventListener('click', () => {
      const estaAbierto = btnMenu.getAttribute('aria-expanded') === 'true';
      if (estaAbierto) {
        cerrarMenu();
      } else {
        abrirMenu();
      }
    });

    // Cerrar al presionar Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && btnMenu.getAttribute('aria-expanded') === 'true') {
        cerrarMenu();
        btnMenu.focus();
      }
    });

    // Cerrar al clickear cualquier enlace dentro
    menuMovil.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        cerrarMenu();
      });
    });

    // Navegación suave dentro del menú móvil (especialmente en index.html)
    const paginaActual = document.body.getAttribute('data-pagina') || 'inicio';
    const historiaSection = document.getElementById('nuestra-historia');
    const mobileLinkHistoria = menuMovil.querySelector('a[href$="#nuestra-historia"]');
    const mobileLinkInicio = menuMovil.querySelector('a[href="index.html"], a[href="#inicio"]');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scrollBehavior = prefersReducedMotion ? 'auto' : 'smooth';

    if (paginaActual === 'inicio') {
      if (mobileLinkHistoria && historiaSection) {
        mobileLinkHistoria.addEventListener('click', (e) => {
          e.preventDefault();
          cerrarMenu();
          const cabecera = document.querySelector('.cabecera');
          const navHeight = cabecera ? cabecera.offsetHeight : 72;
          const extraOffset = 36;
          const targetY = Math.max(0, historiaSection.getBoundingClientRect().top + window.pageYOffset - (navHeight + extraOffset));
          window.scrollTo({ top: targetY, behavior: scrollBehavior });
          history.pushState(null, '', '#nuestra-historia');
        });
      }

      if (mobileLinkInicio) {
        mobileLinkInicio.addEventListener('click', (e) => {
          e.preventDefault();
          cerrarMenu();
          window.scrollTo({ top: 0, behavior: scrollBehavior });
          if (window.location.hash) {
            history.pushState(null, '', window.location.pathname);
          }
        });
      }

      const marcaLogo = document.querySelector('.marca');
      if (marcaLogo) {
        marcaLogo.addEventListener('click', (e) => {
          e.preventDefault();
          cerrarMenu();
          window.scrollTo({ top: 0, behavior: scrollBehavior });
          if (window.location.hash) {
            history.pushState(null, '', window.location.pathname);
          }
        });
      }
    }

    // Cerrar si redimensiona a escritorio
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 960 && btnMenu.getAttribute('aria-expanded') === 'true') {
        cerrarMenu();
      }
    });

    // Acordeón de productos en móvil
    const btnProdMovil = document.getElementById('botonProductosMovil');
    const subMenuProd = document.getElementById('menuMovilProductos');
    const chevronMovil = document.getElementById('chevronMovil');

    if (btnProdMovil && subMenuProd) {
      btnProdMovil.addEventListener('click', () => {
        const expandido = btnProdMovil.getAttribute('aria-expanded') === 'true';
        if (expandido) {
          btnProdMovil.setAttribute('aria-expanded', 'false');
          subMenuProd.setAttribute('hidden', '');
          if (chevronMovil) chevronMovil.style.transform = 'rotate(0deg)';
        } else {
          btnProdMovil.setAttribute('aria-expanded', 'true');
          subMenuProd.removeAttribute('hidden');
          if (chevronMovil) chevronMovil.style.transform = 'rotate(180deg)';
        }
      });
    }
  }

  // --------------------------------------------------------------------------
  // Desplegable de Productos en Escritorio (Hover con puente + Click Accesible)
  // --------------------------------------------------------------------------
  function initDesplegableEscritorio() {
    const contenedor = document.getElementById('desplegableContenedor');
    const btn = document.getElementById('botonDesplegable');
    const menu = document.getElementById('menuProductos');
    if (!contenedor || !btn || !menu) return;

    let cierreTimer = null;

    function abrirMenu() {
      clearTimeout(cierreTimer);
      btn.setAttribute('aria-expanded', 'true');
      menu.classList.add('abierto');
    }

    function cerrarMenuConDemora() {
      clearTimeout(cierreTimer);
      cierreTimer = setTimeout(() => {
        btn.setAttribute('aria-expanded', 'false');
        menu.classList.remove('abierto');
      }, 240); // Tiempo de gracia para que mover el mouse hacia abajo nunca lo cierre
    }

    // Hover sobre el contenedor (botón) y sobre el menú desplegado
    contenedor.addEventListener('mouseenter', abrirMenu);
    contenedor.addEventListener('mouseleave', cerrarMenuConDemora);
    menu.addEventListener('mouseenter', abrirMenu);
    menu.addEventListener('mouseleave', cerrarMenuConDemora);

    // Click toggle para accesibilidad y dispositivos táctiles
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const estaAbierto = btn.getAttribute('aria-expanded') === 'true';
      if (estaAbierto) {
        btn.setAttribute('aria-expanded', 'false');
        menu.classList.remove('abierto');
      } else {
        abrirMenu();
      }
    });

    // Cerrar si se clickea afuera
    document.addEventListener('click', (e) => {
      if (!contenedor.contains(e.target)) {
        btn.setAttribute('aria-expanded', 'false');
        menu.classList.remove('abierto');
      }
    });

    // Accesibilidad teclado: Escape cierra y devuelve el foco
    contenedor.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        btn.setAttribute('aria-expanded', 'false');
        menu.classList.remove('abierto');
        btn.focus();
      }
    });
  }

  // --------------------------------------------------------------------------
  // Partículas Ambientales de Fondo
  // --------------------------------------------------------------------------
  function initParticulas() {
    let canvas = document.getElementById('ambient-particles');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'ambient-particles';
      canvas.className = 'particulas-fondo';
      canvas.setAttribute('aria-hidden', 'true');
      document.body.prepend(canvas);
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener(
      'resize',
      () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      },
      { passive: true }
    );

    const colors = [
      'rgba(138, 158, 138, 0.35)',
      'rgba(163, 184, 153, 0.45)',
      'rgba(216, 186, 150, 0.35)',
      'rgba(200, 168, 130, 0.30)',
      'rgba(27, 45, 72, 0.18)'
    ];

    const particles = Array.from({ length: 42 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 3 + 1.2,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 0.4,
      vy: -Math.random() * 0.45 - 0.15
    }));

    function animarParticulas() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });
      requestAnimationFrame(animarParticulas);
    }
    animarParticulas();
  }

  // --------------------------------------------------------------------------
  // Pantalla de Carga con Gatito Lottie (gatito_gordito.json)
  // --------------------------------------------------------------------------
  function initLoaderCookie() {
    const overlay = document.getElementById('pantalla-carga');
    const container = document.getElementById('lottie-anim') || document.getElementById('lottie-cookie');

    if (!overlay || !container || typeof lottie === 'undefined') {
      if (overlay) overlay.classList.add('oculta');
      return;
    }

    // Adoptar animación si ya fue iniciada por el script inmediato en el HTML, o iniciarla
    let anim = window.__quatroLoaderAnim || null;
    if (!anim) {
      const lottieData = window.__cachedDotLottieData || window.QUATRO_LOTTIE_DATA || window.QUATRO_COOKIE_DATA;
      if (!lottieData) {
        if (overlay) overlay.classList.add('oculta');
        return;
      }
      try {
        anim = lottie.loadAnimation({
          container: container,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          animationData: lottieData
        });
        window.__quatroLoaderAnim = anim;
        if (!window.__quatroLoaderStart) {
          window.__quatroLoaderStart = performance.now();
        }
      } catch (e) {
        overlay.classList.add('oculta');
        return;
      }
    }

    // Regla solicitada: 1 segundo de duración en caso de que cargue antes
    const tiempoMinimoMs = 1000;
    const inicioTiempo = window.__quatroLoaderStart || performance.now();

    let paginaCargada = (document.readyState === 'complete');
    if (!paginaCargada) {
      window.addEventListener('load', () => {
        paginaCargada = true;
      });
    }

    let loaderOculto = false;
    let cicloTerminado = false;

    if (anim && typeof anim.addEventListener === 'function') {
      anim.addEventListener('loopComplete', () => {
        cicloTerminado = true;
        const transcurrido = performance.now() - inicioTiempo;
        if (paginaCargada && transcurrido >= tiempoMinimoMs) {
          retirarLoader();
        }
      });
    }

    function retirarLoader() {
      if (loaderOculto) return;
      loaderOculto = true;
      overlay.classList.add('oculta');
      setTimeout(() => {
        try {
          if (anim) anim.destroy();
        } catch (e) {}
      }, 400);

      // Si se cargó con hash en la URL (ej: #nuestra-historia), alinear con margen de cabecera
      if (window.location.hash) {
        setTimeout(() => {
          try {
            const targetEl = document.querySelector(window.location.hash);
            if (targetEl) {
              const cabecera = document.querySelector('.cabecera');
              const navHeight = cabecera ? cabecera.offsetHeight : 72;
              const extraOffset = 36;
              const targetY = Math.max(0, targetEl.getBoundingClientRect().top + window.pageYOffset - (navHeight + extraOffset));
              window.scrollTo({ top: targetY, behavior: 'smooth' });
            }
          } catch (e) {}
        }, 150);
      }
    }

    // Comprobador de ciclo:
    // - Si la pantalla ya cargó antes de 1 segundo: esperar a que se cumpla 1 segundo (1000ms) y retirar la pantalla de carga.
    // - Si la carga tarda más de 1 segundo: continuar la animación hasta que termine el ciclo (evitando cortes bruscos)
    //   y si aún no terminó de cargar volver a reproducirla, retirándola apenas termine el ciclo con la página cargada.
    function chequearLoader() {
      if (loaderOculto) return;
      const transcurrido = performance.now() - inicioTiempo;

      if (transcurrido < tiempoMinimoMs) {
        requestAnimationFrame(chequearLoader);
      } else {
        // Ya pasó el segundo mínimo
        if (paginaCargada) {
          // Si cargó rápido (dentro del primer segundo o apenas pasado), retirarlo directamente
          if (transcurrido < 1300 || cicloTerminado) {
            retirarLoader();
          } else {
            // Si la carga fue lenta (> 1s), esperar al fin de ciclo para no cortar la animación bruscamente
            requestAnimationFrame(chequearLoader);
          }
        } else {
          // Aún no terminó de cargar la página, seguir animando
          requestAnimationFrame(chequearLoader);
        }
      }
    }

    requestAnimationFrame(chequearLoader);

    // Seguridad: máximo 8 segundos para no bloquear nunca la pantalla
    setTimeout(() => {
      if (!loaderOculto) retirarLoader();
    }, 8000);

    // Si el usuario regresa usando el historial (bfcache), asegurar que el loader no quede visible
    window.addEventListener('pageshow', (event) => {
      if (event.persisted) {
        overlay.classList.add('oculta');
      }
    });
  }

})();
