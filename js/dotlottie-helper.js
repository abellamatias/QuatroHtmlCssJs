/**
 * Quatro • Helper de Carga de Animación Lottie / dotLottie
 * Intenta cargar primero 'gatito_gordito.lottie' (formato binario ligero dotLottie);
 * si falla o la red no responde velozmente, realiza fallback inmediato a 'gatito_gordito.json'.
 */

(function () {
  'use strict';

  // Descompresor nativo ultraligero de dotLottie (ZIP Deflate)
  async function descomprimirDotLottie(arrayBuffer) {
    if (typeof DecompressionStream === 'undefined') {
      throw new Error('DecompressionStream no soportado en este navegador');
    }

    const u8 = new Uint8Array(arrayBuffer);
    const view = new DataView(u8.buffer, u8.byteOffset, u8.byteLength);

    let offset = 0;
    const archivos = {};

    while (offset < u8.length - 4) {
      if (view.getUint32(offset, true) === 0x04034b50) {
        const compMethod = view.getUint16(offset + 8, true);
        const compSize = view.getUint32(offset + 18, true);
        const fnLen = view.getUint16(offset + 26, true);
        const extraLen = view.getUint16(offset + 28, true);
        const fnBytes = u8.subarray(offset + 30, offset + 30 + fnLen);
        const filename = new TextDecoder().decode(fnBytes);
        const dataStart = offset + 30 + fnLen + extraLen;
        const compData = u8.subarray(dataStart, dataStart + compSize);
        archivos[filename] = { compMethod, compData };
        offset = dataStart + compSize;
      } else {
        break;
      }
    }

    // Localizar el archivo JSON de animación dentro del paquete .lottie
    const animKey = Object.keys(archivos).find((k) =>
      (k.startsWith('a/') || k.startsWith('animations/') || k.endsWith('.json')) && k !== 'manifest.json'
    );

    if (!animKey) {
      throw new Error('No se encontró animación JSON dentro del paquete .lottie');
    }

    const entry = archivos[animKey];
    let jsonText = '';

    if (entry.compMethod === 0) {
      // Almacenado sin compresión
      jsonText = new TextDecoder().decode(entry.compData);
    } else {
      // Comprimido con Deflate (estándar ZIP / dotLottie)
      const stream = new Response(entry.compData).body.pipeThrough(
        new DecompressionStream('deflate-raw')
      );
      jsonText = await new Response(stream).text();
    }

    return JSON.parse(jsonText);
  }

  // Intentar recuperar de sessionStorage para navegación instantánea entre pestañas
  try {
    const cachedSession = sessionStorage.getItem('quatro_gatito_lottie_data');
    if (cachedSession) {
      const parsed = JSON.parse(cachedSession);
      if (parsed && parsed.op === 32) {
        window.__cachedDotLottieData = parsed;
        window.__lottieOrigen = 'gatito_gordito.lottie (sessionStorage)';
      }
    }
  } catch (e) {}

  /**
   * Obtiene los datos de animación con máxima prioridad a gatito_gordito.lottie
   * y fallback ultrarrápido a gatito_gordito.json.
   */
  async function getGatitoAnimationData() {
    // 0. Si ya está en memoria caché o sessionStorage, retornar de inmediato (0ms)
    if (window.__cachedDotLottieData) {
      return window.__cachedDotLottieData;
    }

    // 1. PRIMER INTENTO: gatito_gordito.lottie
    try {
      const abortCtrl = typeof AbortController !== 'undefined' ? new AbortController() : null;
      const timeoutId = abortCtrl ? setTimeout(() => abortCtrl.abort(), 600) : null;

      const resp = await fetch('lottiefiles/gatito_gordito.lottie', {
        signal: abortCtrl ? abortCtrl.signal : undefined
      });

      if (timeoutId) clearTimeout(timeoutId);

      if (resp && resp.ok) {
        const ab = await resp.arrayBuffer();
        const data = await descomprimirDotLottie(ab);
        if (data) {
          window.__cachedDotLottieData = data;
          window.__lottieOrigen = 'gatito_gordito.lottie';
          try {
            sessionStorage.setItem('quatro_gatito_lottie_data', JSON.stringify(data));
          } catch (e) {}
          return data;
        }
      }
    } catch (errLottie) {
      // Falló .lottie (CORS, offline, error de red, o formato): pasar inmediatamente al fallback
    }

    // 2. SEGUNDO INTENTO (FALLBACK): gatito_gordito.json
    try {
      // Si el bundle en memoria ya existe, usarlo sin espera
      if (window.QUATRO_LOTTIE_DATA) {
        window.__lottieOrigen = 'gatito_gordito.json (precompilado)';
        return window.QUATRO_LOTTIE_DATA;
      }

      // Si no, fetch directo al archivo JSON
      const respJson = await fetch('lottiefiles/gatito_gordito.json');
      if (respJson.ok) {
        const dataJson = await respJson.json();
        window.__cachedDotLottieData = dataJson;
        window.__lottieOrigen = 'lottiefiles/gatito_gordito.json';
        return dataJson;
      }
    } catch (errJson) {
      // Si falla fetch, intentar última instancia
      if (window.QUATRO_LOTTIE_DATA) {
        return window.QUATRO_LOTTIE_DATA;
      }
    }

    return null;
  }

  window.getGatitoAnimationData = getGatitoAnimationData;
  window.getGatitoAnimationDataSync = function () {
    return window.__cachedDotLottieData || window.QUATRO_LOTTIE_DATA || null;
  };
})();
