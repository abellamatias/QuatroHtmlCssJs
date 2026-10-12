/**
 * Quatro • Pastelería Artesanal
 * Lógica interactiva para la página de Pastafrolas (cambio de tamaño, precios y mensajes de WhatsApp)
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const btnInd = document.getElementById('tamanoInd');
    const btnFam = document.getElementById('tamanoFam');
    if (!btnInd || !btnFam) return;

    const sabores = [
      { id: 1, nombre: 'membrillo', ind: 4200, fam: 8900 },
      { id: 2, nombre: 'batata y chocolate', ind: 4500, fam: 9500 },
      { id: 3, nombre: 'mitad y mitad', ind: 4600, fam: 9800 }
    ];

    const rinde = {
      ind: '1 a 2 porciones',
      fam: '8 a 10 porciones'
    };

    const etiquetaTamano = {
      ind: 'individual (15 cm)',
      fam: 'familiar (26 cm)'
    };

    function cambiarTamano(tam) {
      if (tam === 'ind') {
        btnInd.classList.add('activo');
        btnInd.setAttribute('aria-pressed', 'true');
        btnFam.classList.remove('activo');
        btnFam.setAttribute('aria-pressed', 'false');
      } else {
        btnFam.classList.add('activo');
        btnFam.setAttribute('aria-pressed', 'true');
        btnInd.classList.remove('activo');
        btnInd.setAttribute('aria-pressed', 'false');
      }

      sabores.forEach(sabor => {
        const precioEl = document.getElementById(`precio-${sabor.id}`);
        const rindeEl = document.getElementById(`rinde-${sabor.id}`);
        const botonEl = document.getElementById(`pedir-${sabor.id}`);

        const precioValor = tam === 'ind' ? sabor.ind : sabor.fam;

        if (precioEl) {
          precioEl.textContent = `$${precioValor.toLocaleString('es-AR')}`;
        }

        if (rindeEl) {
          rindeEl.textContent = rinde[tam];
        }

        if (botonEl && window.Quatro) {
          const mensaje = `¡Hola Quatro! Quiero pedir la pastafrola de ${sabor.nombre} ${etiquetaTamano[tam]}.`;
          botonEl.href = window.Quatro.linkWhatsApp(mensaje);
        }
      });
    }

    btnInd.addEventListener('click', () => cambiarTamano('ind'));
    btnFam.addEventListener('click', () => cambiarTamano('fam'));

    // Inicializar en individual
    cambiarTamano('ind');
  });

})();
