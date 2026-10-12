/**
 * Quatro Pastelería - Lógica interactiva de Alfajores XXL
 * Pestañas de variedades, armador de cajas y cotización en tiempo real.
 */
(() => {
  'use strict';

  // Precios oficiales
  const PRECIOS = {
    maicena: 2400,
    marplatense: 2600,
    nuez: 2800
  };

  // Nombres legibles para el ticket y mensaje
  const NOMBRES = {
    maicena: 'Maicena clásico XXL',
    marplatense: 'Marplatense semiamargo',
    nuez: 'Nuez y dulce de leche'
  };

  // Estado del armador
  let tamanoCaja = 6;
  const cantidades = {
    maicena: 4,
    marplatense: 1,
    nuez: 1
  };

  // Elementos del DOM
  const armadorEl = document.getElementById('armador');
  const contadorSaboresEl = document.getElementById('contadorSabores');
  const notasEl = document.getElementById('notas');
  const ticketCajaEl = document.getElementById('ticketCaja');
  const ticketSubtotalEl = document.getElementById('ticketSubtotal');
  const filaDescuentoEl = document.getElementById('filaDescuento');
  const ticketDescuentoEl = document.getElementById('ticketDescuento');
  const ticketTotalEl = document.getElementById('ticketTotal');
  const botonPedirCajaEl = document.getElementById('botonPedirCaja');
  const botonFlotanteWa = document.querySelector('.btn-flotante-wa');

  const cantEls = {
    maicena: document.getElementById('cant-maicena'),
    marplatense: document.getElementById('cant-marplatense'),
    nuez: document.getElementById('cant-nuez')
  };

  const btnMenosEls = {
    maicena: document.getElementById('btn-menos-maicena'),
    marplatense: document.getElementById('btn-menos-marplatense'),
    nuez: document.getElementById('btn-menos-nuez')
  };

  const btnMasEls = {
    maicena: document.getElementById('btn-mas-maicena'),
    marplatense: document.getElementById('btn-mas-marplatense'),
    nuez: document.getElementById('btn-mas-nuez')
  };

  const radiosTamano = document.querySelectorAll('input[name="tamanoCaja"]');

  /**
   * Calcula el total de alfajores seleccionados
   */
  function getTotalSeleccionado() {
    return cantidades.maicena + cantidades.marplatense + cantidades.nuez;
  }

  /**
   * Recorta cantidades si se baja de tamaño de caja (p. ej. de 12 a 6)
   * Resta en orden: nuez -> marplatense -> maicena
   */
  function podarCantidades(nuevoTamano) {
    let exceso = getTotalSeleccionado() - nuevoTamano;
    if (exceso <= 0) return;

    const ordenPodar = ['nuez', 'marplatense', 'maicena'];
    for (const sabor of ordenPodar) {
      if (exceso <= 0) break;
      const disponible = cantidades[sabor];
      const restar = Math.min(disponible, exceso);
      cantidades[sabor] -= restar;
      exceso -= restar;
    }
  }

  /**
   * Actualiza el ticket, contadores, estados de botones y textos
   */
  function actualizar() {
    const totalSeleccionado = getTotalSeleccionado();

    // Actualizar contadores numéricos
    for (const sabor in cantEls) {
      if (cantEls[sabor]) {
        cantEls[sabor].textContent = String(cantidades[sabor]);
      }
    }

    // Actualizar estado de botones (+ / -)
    const cajaLlena = totalSeleccionado >= tamanoCaja;
    for (const sabor in btnMenosEls) {
      if (btnMenosEls[sabor]) {
        btnMenosEls[sabor].disabled = cantidades[sabor] <= 0;
      }
      if (btnMasEls[sabor]) {
        btnMasEls[sabor].disabled = cajaLlena;
      }
    }

    // Actualizar indicador de estado de caja
    if (contadorSaboresEl) {
      if (totalSeleccionado === tamanoCaja) {
        contadorSaboresEl.textContent = `¡Caja completa! (${totalSeleccionado} de ${tamanoCaja})`;
        contadorSaboresEl.style.color = 'var(--verde)';
      } else if (totalSeleccionado < tamanoCaja) {
        const faltan = tamanoCaja - totalSeleccionado;
        contadorSaboresEl.textContent = `Te ${faltan === 1 ? 'falta 1 alfajor' : `faltan ${faltan} alfajores`} (${totalSeleccionado}/${tamanoCaja})`;
        contadorSaboresEl.style.color = 'var(--chocolate)';
      } else {
        const sobran = totalSeleccionado - tamanoCaja;
        contadorSaboresEl.textContent = `Te ${sobran === 1 ? 'sobra 1' : `sobran ${sobran}`} (${totalSeleccionado}/${tamanoCaja})`;
        contadorSaboresEl.style.color = 'var(--chocolate)';
      }
    }

    // Calcular valores económicos
    const subtotal =
      cantidades.maicena * PRECIOS.maicena +
      cantidades.marplatense * PRECIOS.marplatense +
      cantidades.nuez * PRECIOS.nuez;

    const tieneDescuento = tamanoCaja === 12;
    const descuento = tieneDescuento ? Math.round(subtotal * 0.10) : 0;
    const total = subtotal - descuento;

    // Actualizar ticket
    if (ticketCajaEl) {
      ticketCajaEl.textContent = `Caja de ${tamanoCaja}`;
    }
    if (ticketSubtotalEl) {
      ticketSubtotalEl.textContent = `$${subtotal.toLocaleString('es-AR')}`;
    }
    if (filaDescuentoEl) {
      filaDescuentoEl.hidden = !tieneDescuento;
    }
    if (ticketDescuentoEl && tieneDescuento) {
      ticketDescuentoEl.textContent = `-$${descuento.toLocaleString('es-AR')}`;
    }
    if (ticketTotalEl) {
      ticketTotalEl.textContent = `$${total.toLocaleString('es-AR')}`;
    }
  }

  /**
   * Suma o resta una unidad de un sabor específico
   */
  function ajustar(sabor, delta) {
    if (delta > 0 && getTotalSeleccionado() >= tamanoCaja) {
      return; // No se puede superar el tamaño de la caja
    }
    if (delta < 0 && cantidades[sabor] <= 0) {
      return; // No puede ser menor a 0
    }

    cantidades[sabor] += delta;
    actualizar();
  }

  /**
   * Cambia el tamaño de la caja entre 6 y 12
   */
  function cambiarTamanoCaja(nuevoTamano) {
    tamanoCaja = nuevoTamano;
    podarCantidades(nuevoTamano);
    actualizar();
  }

  /**
   * Pre-selecciona una caja de 6 con el sabor elegido y hace scroll al armador
   */
  function elegirSabor(sabor) {
    tamanoCaja = 6;
    radiosTamano.forEach(r => {
      r.checked = r.value === '6';
    });

    cantidades.maicena = 0;
    cantidades.marplatense = 0;
    cantidades.nuez = 0;
    if (cantidades.hasOwnProperty(sabor)) {
      cantidades[sabor] = 6;
    }

    actualizar();

    if (armadorEl) {
      armadorEl.scrollIntoView({ behavior: 'smooth' });
      const tituloArmador = armadorEl.querySelector('h2');
      if (tituloArmador) {
        tituloArmador.setAttribute('tabindex', '-1');
        tituloArmador.focus({ preventScroll: true });
      }
    }
  }

  /**
   * Construye el mensaje ordenado para WhatsApp y abre el chat
   */
  function mandarPedido() {
    const totalSeleccionado = getTotalSeleccionado();
    const subtotal =
      cantidades.maicena * PRECIOS.maicena +
      cantidades.marplatense * PRECIOS.marplatense +
      cantidades.nuez * PRECIOS.nuez;
    const tieneDescuento = tamanoCaja === 12;
    const descuento = tieneDescuento ? Math.round(subtotal * 0.10) : 0;
    const totalFormateado = `$${(subtotal - descuento).toLocaleString('es-AR')}`;

    let lineas = [];
    lineas.push(`¡Hola Quatro! Quiero una caja de ${tamanoCaja} alfajores:`);

    if (cantidades.maicena > 0) {
      lineas.push(`• ${cantidades.maicena} ${NOMBRES.maicena}`);
    }
    if (cantidades.marplatense > 0) {
      lineas.push(`• ${cantidades.marplatense} ${NOMBRES.marplatense}`);
    }
    if (cantidades.nuez > 0) {
      lineas.push(`• ${cantidades.nuez} ${NOMBRES.nuez}`);
    }

    if (totalSeleccionado < tamanoCaja) {
      lineas.push(`(La caja no está completa, ¿me ayudan a completarla?)`);
    }

    const notas = (notasEl?.value || '').trim();
    if (notas) {
      lineas.push(``);
      lineas.push(`Aclaración: ${notas}`);
    }

    lineas.push(``);
    lineas.push(`Total estimado: ${totalFormateado}`);
    lineas.push(`¿Tienen para hoy o mañana? ¡Gracias!`);

    const mensajeFinal = lineas.join('\n');
    const enlace = window.Quatro && typeof window.Quatro.linkWhatsApp === 'function'
      ? window.Quatro.linkWhatsApp(mensajeFinal)
      : `https://wa.me/5493434685501?text=${encodeURIComponent(mensajeFinal)}`;

    window.open(enlace, '_blank', 'noopener,noreferrer');
  }

  /**
   * Filtrado de variedades con pestañas accesibles
   */
  function initPestanas() {
    const pestanas = document.querySelectorAll('[role="tab"]');
    const articulos = document.querySelectorAll('.alfajor');

    function activarPestana(targetPestana) {
      const categoria = targetPestana.getAttribute('data-categoria') || 'todos';

      pestanas.forEach(p => {
        const esActiva = p === targetPestana;
        p.setAttribute('aria-selected', esActiva ? 'true' : 'false');
        p.classList.toggle('activo', esActiva);
      });

      articulos.forEach(art => {
        const artCat = art.getAttribute('data-categoria');
        if (categoria === 'todos' || artCat === categoria) {
          art.removeAttribute('hidden');
        } else {
          art.setAttribute('hidden', '');
        }
      });
    }

    pestanas.forEach((pestana, index) => {
      pestana.addEventListener('click', () => activarPestana(pestana));

      // Navegación con flechas del teclado
      pestana.addEventListener('keydown', (e) => {
        let nuevoIndice = null;
        if (e.key === 'ArrowRight') {
          nuevoIndice = (index + 1) % pestanas.length;
        } else if (e.key === 'ArrowLeft') {
          nuevoIndice = (index - 1 + pestanas.length) % pestanas.length;
        }

        if (nuevoIndice !== null) {
          e.preventDefault();
          pestanas[nuevoIndice].focus();
          activarPestana(pestanas[nuevoIndice]);
        }
      });
    });
  }

  /**
   * Ocultar botón flotante de WhatsApp cuando el armador está visible en pantalla
   */
  function initObserverBotonFlotante() {
    if (!armadorEl || !botonFlotanteWa) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            botonFlotanteWa.classList.add('oculto');
          } else {
            botonFlotanteWa.classList.remove('oculto');
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(armadorEl);
  }

  // Inicialización de eventos
  document.addEventListener('DOMContentLoaded', () => {
    // Radios de tamaño de caja
    radiosTamano.forEach(radio => {
      radio.addEventListener('change', (e) => {
        cambiarTamanoCaja(parseInt(e.target.value, 10));
      });
    });

    // Botones + y -
    for (const sabor in btnMenosEls) {
      if (btnMenosEls[sabor]) {
        btnMenosEls[sabor].addEventListener('click', () => ajustar(sabor, -1));
      }
    }
    for (const sabor in btnMasEls) {
      if (btnMasEls[sabor]) {
        btnMasEls[sabor].addEventListener('click', () => ajustar(sabor, 1));
      }
    }

    // Botón principal de pedido
    if (botonPedirCajaEl) {
      botonPedirCajaEl.addEventListener('click', mandarPedido);
    }

    // Inicializar pestañas y observer
    initPestanas();
    initObserverBotonFlotante();

    // Estado inicial
    actualizar();
  });

  // Exportar helper para botones "Sumar a mi caja"
  window.elegirSabor = elegirSabor;
})();
