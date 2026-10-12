# Plan de rediseño: Quatro (para ejecutar tal cual)

> [!IMPORTANT]
> **Para la IA que ejecuta este plan:** este documento es la especificación completa. Seguilo al pie de la letra. Cuando algo no esté definido acá, **preguntale al usuario** en vez de suponer. El usuario habla español rioplatense y prefiere explicaciones **simples, no técnicas**.

---

## 0. Contexto

- **Proyecto:** `c:\Users\matia\Documents\Sistemas\QuatroNewVersion`
- **Qué es:** la web de **Quatro**, un emprendimiento de pastelería casera de 4 amigos: **Mati, Sofi, Vale y Thoto**. Venden brownies, pastafrolas y alfajores. Los pedidos se hacen **solo por WhatsApp**.
- **Archivos actuales:**
  - `index.html`, `brownies.html`, `pastafrolas.html`, `alfajores.html`
  - `logo.png`: ilustración acuarela de dos brownies sobre un repasador verde, con hojitas verdes y estrellitas azules. Pesa 3,4 MB.
  - `README.md`, `.gitignore`, `.nojekyll`
- **Hosting:** GitHub Pages (sitio estático, sin build).
- **Hoy usa:** Tailwind por CDN, fuentes EB Garamond + Manrope, Material Symbols, partículas en canvas, pantallas de carga y fundidos entre páginas.
- **Público:** vecinos, amigos y gente que busca algo para la merienda, un cumpleaños o un regalo.
- **Tarea principal de la web:** que la persona **haga el pedido por WhatsApp**.

### Lo que pidió el usuario
1. Aplicar la skill **frontend-design**: `C:\Users\matia\.gemini\config\skills\frontend-design\SKILL.md`. **Leela entera antes de empezar.**
2. **No serio, al contrario: divertido.** Estilo elegido: *"Divertido y cálido: como un cuaderno de recetas con dibujitos a mano, hojitas, garabatos y textos con humor"*.
3. **Estructura moderna**: ordenada, limpia, responsive.
4. **Mantener** el azul navy y el verde actuales.
5. **Agregar marrón**: chocolate para detalles fuertes y dulce de leche para fondos suaves.
6. Colores **de la naturaleza**.
7. **Las fotos de productos quedan como están**: mismas URLs, no generar ni reemplazar imágenes.
8. **Se pueden reescribir los textos** con humor, manteniendo precios, horarios y WhatsApp.
9. Los testimonios y estadísticas son **de relleno**: se sacan o se reemplazan por algo honesto.
10. **Todas las páginas de una vez.**
11. "No asumas nada, pero tampoco seas tan técnico."

---

## 1. Orden de trabajo (obligatorio)

1. Leer `SKILL.md` de frontend-design.
2. Leer **completos** los 4 HTML originales. Son largos (1000 a 1400 líneas): leelos por tramos hasta el final. Hay que extraer las URLs de imágenes, los links de WhatsApp, los precios y la lógica JS.
3. **Respaldo:** copiar los 4 HTML originales a `_respaldo_v1/` dentro del proyecto. Agregar `_respaldo_v1/` al `.gitignore` para que no se publique.
4. **Hacer las preguntas de la sección 2** al usuario y esperar la respuesta. Si contesta "decidí vos", usar el valor por defecto indicado.
5. Crear `css/quatro.css` (sección 3 a 6).
6. Crear `js/quatro.js` (sección 8.1).
7. Reescribir las páginas en este orden: `index.html`, `brownies.html`, `pastafrolas.html`, `alfajores.html` (sección 7).
8. Crear `js/pastafrolas.js` y `js/alfajores.js` (secciones 8.2 y 8.3).
9. Actualizar `README.md` (sección 11).
10. Verificar todo (sección 10): servidor local, capturas en 3 anchos, autocrítica y correcciones.
11. Contarle al usuario qué se hizo, en lenguaje simple (sección 12).

> [!CAUTION]
> No borrar `logo.png`, `.nojekyll` ni `.gitignore`. No tocar las URLs de las fotos. No cambiar precios.

---

## 2. Preguntas que hay que hacer ANTES de escribir código

Hacelas todas juntas, con opciones simples. Anotá las respuestas en la tabla del final de esta sección.

| # | Pregunta | Qué encontré | Valor por defecto si dice "decidí vos" |
|---|---|---|---|
| P1 | **Horarios** | El pie dice "Lun a Vie 8 a 19:30 / Sáb 9 a 15 / Dom horneado especial y entregas". Pastafrolas dice "Horneamos de Martes a Domingos". | Los del pie de página. Sacar la frase de Pastafrolas. |
| P2 | **Gramos de dulce de leche en alfajores** | En un lado "+140 g", en otro "más de 65 g". | "Más de 65 g". Es lo más creíble para un alfajor de 160 g. |
| P3 | **Ciudad / zona de envío** | El WhatsApp es 343 (Paraná, Entre Ríos), pero los testimonios nombraban barrios de CABA. | No nombrar ciudad. Escribir "Coordinamos envío o retiro por WhatsApp". |
| P4 | **Redes** | Los íconos de Instagram y TikTok llevan a WhatsApp. | Sacar los íconos de redes. |
| P5 | **Anticipación y respuesta** | Pastafrolas dice "24 h de anticipación" y "respondemos en menos de 15 min". | "Ideal con 24 h de anticipación". Sacar lo de los 15 min. |
| P6 | **Número de WhatsApp** | Los links usan `wa.me/3434685501`, sin código de país. WhatsApp exige formato internacional, así que **probablemente esos links no funcionan bien**. | Usar `wa.me/5493434685501` en todos los links. Mostrar el número como "343 468-5501". |

Al preguntar P6, explicalo simple: *"Los botones de WhatsApp tienen el número sin el +54 9. Así pueden no abrir bien el chat. ¿Lo corrijo a +54 9 343 468-5501?"*

**Respuestas del usuario** (completar):

| # | Respuesta |
|---|---|
| P1 | |
| P2 | |
| P3 | |
| P4 | |
| P5 | |
| P6 | |

En los textos de este plan, lo que depende de estas respuestas aparece como **`[P1]`**, **`[P2]`**, etc.

---

## 3. Concepto y reglas de diseño

### Concepto
**"El cuaderno de cocina de cuatro amigos."**
- **Base moderna y disciplinada:** grilla limpia, mucho aire, tipografía clara, menú fijo.
- **Capa divertida encima:** notas escritas a mano al margen, flechas y subrayados dibujados, hojitas y estrellitas como las del logo, fotos tipo polaroid pegadas con cinta, y un fondo cuadriculado muy tenue de cuaderno.
- **Lo llamativo va en un solo lugar:** la capa de garabatos y notas a mano. Todo lo demás es tranquilo y prolijo. Antes de dar por terminada cada página, sacá un adorno (el consejo de Chanel de la skill).

### Prohibido (son los "tells" de diseño genérico que marca la skill)
- Etiquetas en MAYÚSCULAS con letras separadas arriba de los títulos (eyebrows). No usar `text-transform: uppercase` en ningún lado.
- Resaltar **una sola palabra** de un título con otro color, cursiva o negrita.
- Separadores con punto medio: "A · B · C" o "A • B".
- Etiquetas tipo "PALABRA — fragmento" con raya espaciada.
- La flecha "→" (o `arrow_forward`) al final de links o botones.
- Tipografía monoespaciada para datos chiquitos.
- Negro teñido (`#111`, `#0B0B0B`). El color oscuro es siempre el navy.
- Tarjetas idénticas, todas con el mismo radio y la misma sombra gris `rgba(0,0,0,.1)`.
- Degradados de relleno decorativos.
- Animaciones de entrada al hacer scroll (fade/slide-up por sección).
- Tarjetas que se levantan o agrandan al pasar el mouse. Fotos que hacen zoom al pasar el mouse.
- Números 01/02/03 si el contenido **no** es una secuencia real. Solo se permiten en "Cómo la hacemos" (pastafrolas) y en los pasos del armador de cajas (alfajores).
- Emojis en la interfaz.
- Pantallas de carga, partículas, fundidos entre páginas, glassmorphism.
- Fondo crema `#F4F1EA` con serif de alto contraste y acento terracota: es el combo que hay que evitar.

---

## 4. Sistema de diseño

### 4.1 Colores (todos en `:root` de `css/quatro.css`)

```css
:root {
  /* Paleta base */
  --navy: #1B2D48;          /* azul noche: textos, botón principal (el actual) */
  --navy-hondo: #041832;    /* hover de botones navy (el actual) */
  --verde: #4A6349;         /* verde hoja: garabatos, notas, botón secundario (el actual) */
  --brote: #DCE3D9;         /* verde muy claro: fondos suaves, bordes */
  --chocolate: #5B3A24;     /* marrón fuerte: precios, subrayados, tachados */
  --dulce: #F1DDBF;         /* dulce de leche: notitas, cinta, fondos cálidos */
  --papel: #F5F6EF;         /* fondo general: blanco con toque verdoso */

  /* Derivados */
  --blanco: #FFFFFF;        /* marco de polaroids */
  --texto: var(--navy);
  --texto-suave: rgba(27, 45, 72, 0.74);
  --linea: rgba(74, 99, 73, 0.22);
  --cuadricula: rgba(74, 99, 73, 0.06);
}
```

Reglas de uso:
- El fondo de todas las páginas es `--papel` con cuadriculado: `background-image` con dos `linear-gradient` de 1px en `--cuadricula`, cada 28px.
- Los textos van en `--navy`. Los textos secundarios en `--texto-suave`.
- Los precios van en `--chocolate`.
- Las notas a mano van en `--verde` o `--chocolate` (alternar).
- Bandas de cierre (CTA final): fondo `--navy`, texto `--papel`, botón `--dulce` con texto `--navy`.
- No usar ningún color fuera de esta lista.

### 4.2 Tipografías

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,200..800&family=Gochi+Hand&display=swap" rel="stylesheet">
```

- **Bricolage Grotesque**: títulos y textos. Es variable en peso, ancho y tamaño óptico.
- **Gochi Hand**: **solo** notas a mano. Nunca en párrafos, botones ni precios.
- **Se eliminan** EB Garamond, Manrope, Material Symbols y Tailwind.

### 4.3 Escala tipográfica (proporción ~1,25, base 17px)

```css
:root {
  --fs-chico: 0.875rem;     /* 14px: aclaraciones */
  --fs-base: 1.0625rem;     /* 17px: párrafos */
  --fs-medio: 1.25rem;      /* 20px: subtítulos de tarjeta, intro */
  --fs-grande: 1.5625rem;   /* 25px: h3 */
  --fs-xl: clamp(1.9rem, 2.4vw + 1rem, 2.6rem);    /* h2 */
  --fs-hero: clamp(2.75rem, 6vw + 1rem, 5.25rem);  /* h1 */
  --fs-mano: 1.375rem;      /* notas Gochi Hand */
}
```

| Uso | Tamaño | Peso | Ancho (`wdth`) | Interlineado | Espaciado |
|---|---|---|---|---|---|
| h1 | `--fs-hero` | 800 | 85 | 1.02 | -0.025em |
| h2 | `--fs-xl` | 750 | 88 | 1.08 | -0.015em |
| h3 | `--fs-grande` | 700 | 92 | 1.15 | -0.01em |
| Párrafo | `--fs-base` | 400 | 100 | 1.6 | normal |
| Intro de sección | `--fs-medio` | 400 | 100 | 1.5 | normal |
| Botón | `--fs-base` | 650 | 95 | 1 | normal |
| Precio | `--fs-grande` | 750 | 90 | 1 | -0.01em |
| Nota a mano | `--fs-mano` | 400 | (no aplica) | 1.2 | normal |

- El ancho se aplica con `font-variation-settings: "wdth" 85;`.
- Largo de línea de los párrafos: `max-width: 62ch`.
- Las notas a mano llevan `rotate: -3deg` (algunas `2deg`, para variar).
- Los títulos van en **oración** ("Cuatro amigos y un horno"), nunca en Title Case ("Cuatro Amigos Y Un Horno").

### 4.4 Espaciado, contenedor y quiebres

```css
:root {
  --contenedor: 1160px;
  --margen: clamp(20px, 5vw, 48px);           /* padding lateral */
  --seccion: clamp(64px, 10vw, 128px);        /* separación vertical entre secciones */
  --e1: 4px; --e2: 8px; --e3: 12px; --e4: 16px; --e5: 24px; --e6: 32px; --e7: 48px; --e8: 64px;
}
```

- Quiebres: **600px** (celular grande), **960px** (tablet / cambia a menú hamburguesa), **1200px**.
- Diseñar *mobile first*.
- Alineación: textos **a la izquierda** en todas las secciones. Solo la banda de cierre puede ir centrada.

### 4.5 Radios por jerarquía (no todo igual)

```css
:root {
  --r-chico: 6px;     /* etiquetas, inputs */
  --r-medio: 14px;    /* fotos, tarjetas de cajas */
  --r-grande: 28px;   /* bandas grandes (cierre, packaging) */
  --r-pildora: 999px; /* botones, nav */
}
```

Las polaroids tienen radio **2px**: son papel fotográfico.

### 4.6 Sombras (teñidas de navy, nunca gris genérico)

```css
:root {
  --sombra-papel: 0 1px 0 rgba(27,45,72,.06), 0 10px 24px -14px rgba(27,45,72,.35);
  --sombra-flotante: 0 12px 32px -12px rgba(27,45,72,.45);
}
```

- `--sombra-papel` va solo en polaroids y en el ticket del armador.
- `--sombra-flotante` va solo en el menú desplegable y el botón flotante de WhatsApp.
- El resto **sin sombra**: se separa con aire o con un borde de 1px `--linea`.

---

## 5. Garabatos (SVG inline)

Todos los garabatos son SVG **inline** en el HTML, con `aria-hidden="true"` y `focusable="false"`. No usar `<use href="archivo.svg#id">` externo, porque falla al abrir el archivo localmente.

Reglas comunes: `fill="none"`, `stroke="currentColor"`, `stroke-width="2.5"`, `stroke-linecap="round"`, `stroke-linejoin="round"`. El color se define con `color: var(--verde)` o `var(--chocolate)` en la clase. Cada `<path>` que se anima lleva `pathLength="1"`.

| Nombre (clase) | viewBox | Path(s) |
|---|---|---|
| `.garabato-flecha` | `0 0 120 80` | `M110 10 C 80 5, 40 20, 25 60` + punta `M25 60 L 18 44 M25 60 L 40 52` |
| `.garabato-subrayado` | `0 0 200 12` | `M2 8 C 30 2, 50 12, 80 6 S 140 2, 198 7` |
| `.garabato-circulo` | `0 0 200 80` | `M100 6 C 160 4, 196 24, 192 44 C 188 68, 120 78, 70 74 C 24 70, 4 52, 10 32 C 16 14, 60 6, 112 10` |
| `.garabato-tachado` | `0 0 200 20` | `M2 12 C 50 6, 120 16, 198 8` |
| `.garabato-hoja` | `0 0 40 40` | Relleno `--verde`, sin trazo: `M6 34 C 6 16, 20 6, 34 6 C 34 22, 22 34, 6 34 Z`. Nervadura con trazo `--papel` de 1.5: `M8 32 L 28 12` |
| `.garabato-estrella` | `0 0 24 24` | Relleno `--navy` (como en el logo): `M12 2 L14.6 9 L22 9.3 L16.2 14 L18.3 21.5 L12 17.2 L5.7 21.5 L7.8 14 L2 9.3 L9.4 9 Z` |
| `.garabato-punteado` | `0 0 300 20` | `M2 10 C 80 2, 220 18, 298 10` con `stroke-dasharray: 2 10` (no se anima) |

**Cinta adhesiva** (CSS, no SVG). Va como `::before` de `.polaroid`:
- 92 × 26 px, fondo `rgba(241,221,191,.85)`.
- Centrada arriba (`top: -12px`), `rotate: -4deg`.
- Bordes dentados con `clip-path: polygon(0 10%, 4% 0, 8% 12%, 12% 0, ..., 100% 90%, 96% 100%, 92% 88%, ..., 0 100%)`: zigzag a izquierda y derecha, recto arriba y abajo.

**Dónde va cada garabato** (máximo 3 a 4 por pantalla; si se ve recargado, sacar uno):
- **Hero:** flecha + nota a mano, 2 hojitas y 2 estrellitas alrededor de la imagen, subrayado debajo del h1 (en `--chocolate`, debajo de todo el título, no de una palabra).
- **Títulos h2:** ningún garabato, salvo el h2 de la carta del Inicio, que lleva una hojita al costado.
- **Precio destacado:** círculo a mano alrededor, solo en la caja del medio de Brownies.
- **"Lo que no lleva"** (Brownies): tachado en `--chocolate` sobre cada ítem.
- **Pasos de pastafrola:** punteado que une los 3 pasos (solo en escritorio).

---

## 6. Movimiento

**Un solo momento orquestado por página: los garabatos del hero se dibujan al cargar.** Nada más se mueve solo.

```css
.dibujar path { stroke-dasharray: 1; stroke-dashoffset: 1; }
.cargado .dibujar path { animation: trazo 900ms cubic-bezier(.65,0,.35,1) forwards; animation-delay: var(--demora, 200ms); }
@keyframes trazo { to { stroke-dashoffset: 0; } }

.brotar { opacity: 0; scale: .7; }
.cargado .brotar { animation: brotar 500ms cubic-bezier(.34,1.56,.64,1) forwards; animation-delay: var(--demora, 600ms); }
@keyframes brotar { to { opacity: 1; scale: 1; } }

@media (prefers-reduced-motion: reduce) {
  .dibujar path { stroke-dashoffset: 0; animation: none !important; }
  .brotar { opacity: 1; scale: 1; animation: none !important; }
}
```

- `js/quatro.js` agrega la clase `cargado` al `<body>` en `DOMContentLoaded`.
- Demoras: subrayado 200ms, flecha 450ms, nota a mano aparece con `.brotar` a los 900ms, hojitas y estrellas con `.brotar` escalonadas a 700, 800, 900 y 1000ms.
- Si JS no carga, los garabatos tienen que verse igual. La clase `.sin-js` en `<html>` la saca el script; con `.sin-js`, mostrar todo en su estado final.

**Movimiento permitido porque responde a una acción del usuario:**
- La pastilla del menú que se desliza (se conserva, ver 8.1).
- Abrir y cerrar el menú móvil, el desplegable de productos y las preguntas frecuentes.
- Cambio de color de botones en hover/focus (150ms).
- Cambio de pestaña, de tamaño y de cantidades: actualizar sin animación o con 150ms de color.

---

## 7. Páginas

### 7.0 Estructura común a las 4 páginas

**`<head>`:**
- `lang="es"`, `charset`, `viewport`.
- `<title>` y `<meta name="description">` de la tabla de abajo.
- `<link rel="icon" href="logo.png">`.
- Las fuentes (4.2) y `<link rel="stylesheet" href="css/quatro.css">`.
- `<script src="js/quatro.js" defer></script>` y, si corresponde, el script de la página con `defer`.
- `<html class="sin-js">`.

| Página | `<title>` | Meta description |
|---|---|---|
| Inicio | Quatro, pastelería casera de cuatro amigos | Brownies, pastafrolas y alfajores caseros hechos por Mati, Sofi, Vale y Thoto. Pedí por WhatsApp. |
| Brownies | Brownies caseros, Quatro | Brownies de cacao 70% con centro húmedo y nueces. Cajas de 4, 8 y 16. Pedí por WhatsApp. |
| Pastafrolas | Pastafrolas caseras, Quatro | Pastafrolas de membrillo, batata con chocolate o mitad y mitad, en 15 o 26 cm. Pedí por WhatsApp. |
| Alfajores | Alfajores XXL, Quatro | Alfajores de maicena, chocolate y nuez con dulce de leche de más. Armá tu caja y pedí por WhatsApp. |

**Primer elemento del `<body>`:** link "Saltar al contenido" (`.saltar`), visible solo con foco, que lleva a `#contenido` (el `<main>`).

**Header (`<header class="cabecera">`):**
- `position: sticky; top: 0`, alto 72px, fondo `rgba(245,246,239,.92)` + `backdrop-filter: blur(8px)`, borde inferior 1px `--linea`.
- Izquierda: `logo.png` (36×36, `border-radius: var(--r-chico)`, alt "Logo de Quatro") + "Quatro" (h3 visual, peso 800, wdth 85). Ambos son un link a `index.html`.
- Centro (≥960px): `<nav id="navEscritorio" aria-label="Principal">` con fondo `--brote`, padding 6px, radio píldora, y la pastilla `#navPastilla` (fondo `--navy`). Ítems:
  1. `Inicio` → `index.html` (`data-nav="inicio"`)
  2. `Productos` (botón con chevron SVG, `aria-expanded`, `aria-controls="menuProductos"`, `data-nav="productos"`). Desplegable con:
     - **Brownies**, subtítulo "Chocolate en serio" → `brownies.html`
     - **Pastafrolas**, subtítulo "Como las de la abuela" → `pastafrolas.html`
     - **Alfajores**, subtítulo "Con dulce de leche de más" → `alfajores.html`
  3. `Nuestra historia` → `index.html#nuestra-historia` (`data-nav="historia"`)
- El desplegable se abre con hover, con foco dentro (`:focus-within`) y con click/Enter en el botón. Se cierra con Esc o click afuera. Fondo `--papel`, borde 1px `--linea`, radio `--r-medio`, `--sombra-flotante`. Cada ítem tiene a la izquierda un mini garabato: hoja para brownies, estrella para pastafrolas, hoja chocolate para alfajores. Sin íconos de Material.
- Derecha: botón primario "Pedir por WhatsApp" (en <600px el texto es "Pedir") con ícono de WhatsApp SVG. Link: `https://wa.me/[P6]?text=` + `encodeURIComponent("¡Hola Quatro! Quiero hacer un pedido.")`.
- <960px: botón hamburguesa `#botonMenu` (`aria-expanded`, `aria-controls="menuMovil"`, `aria-label` que alterna "Abrir menú" / "Cerrar menú", ícono SVG que alterna). Despliega `#menuMovil` debajo del header con: Inicio, Productos (acordeón `#botonProductosMovil` con los 3 productos) y Nuestra historia. El ítem de la página actual va con fondo `--navy` y texto `--papel`.
- Ítem activo por página: `index` → inicio (y historia según scroll, ver 8.1); `brownies`, `pastafrolas`, `alfajores` → productos. Se indica con `<body data-pagina="inicio|brownies|pastafrolas|alfajores">`.

**Footer (`<footer class="pie">`):**
- Fondo `--brote`, borde superior 1px `--linea`, padding vertical `--e8`.
- 3 columnas en ≥960px, apiladas en celular:
  1. Logo + "Quatro". Texto: *"Cuatro amigos, un horno y demasiado dulce de leche."*
  2. **Cuándo horneamos**: los horarios de **[P1]**, en lista simple.
  3. **Escribinos**: *"Pedidos, cajas para regalar o eventos: todo por WhatsApp."* + botón secundario "Escribir por WhatsApp" + número visible "[P6 formateado]". Si **[P4]** trae redes reales, agregar links de texto "Instagram" / "TikTok" (sin íconos de relleno).
- Línea final (borde superior `--linea`): *"© 2026 Quatro. Hecho a mano, con harina hasta en las orejas."*

**Botón flotante de WhatsApp:**
- Abajo a la derecha (24px), círculo de 56px, fondo `--verde`, ícono WhatsApp `--papel`, `--sombra-flotante`.
- `aria-label="Pedir por WhatsApp"`. Sin cartelito al hover. Hover: fondo `--navy`.
- En la página de alfajores se **oculta** mientras `#armador` está en pantalla (IntersectionObserver), para no tapar el ticket.

**Ícono de WhatsApp:** un SVG inline (glifo estándar del logo de WhatsApp, 20×20, `fill="currentColor"`), igual en todos los botones de pedido.

**Componentes CSS a definir en `quatro.css`:**
- `.contenedor`: max-width `--contenedor`, margen auto, padding lateral `--margen`.
- `.seccion`: padding vertical `--seccion`.
- `.btn`, `.btn-primario`, `.btn-secundario`, `.btn-dulce`:
  - **Primario:** fondo `--navy`, texto `--papel`, radio píldora, padding 14px 24px, alto mínimo 48px, gap 10px con el ícono. Hover: `--navy-hondo`. Active: `translate: 0 1px`.
  - **Secundario:** fondo transparente, borde 2px `--navy`, texto `--navy`. Hover: fondo `--brote`.
  - **Dulce:** fondo `--dulce`, texto `--navy`. Va sobre bandas navy. Hover: fondo `#E8CFA8`, el único color extra permitido, solo para este hover.
  - **Foco visible en todos:** `outline: 3px solid var(--verde); outline-offset: 3px`. Sobre fondo navy: outline `--dulce`.
- `.nota-mano`: Gochi Hand, `--fs-mano`, color `--verde`, rotación -3deg, `display: inline-block`. Variante `.nota-mano--choco`.
- `.polaroid`: `<figure>`, fondo blanco, padding 10px 10px 14px, radio 2px, `--sombra-papel`, `rotate: var(--giro, -1.5deg)`, cinta en `::before`. `<figcaption>` en Gochi Hand, color `--chocolate`, centrado. La imagen va con `aspect-ratio: 4/3; object-fit: cover; width: 100%`.
- `.etiqueta`: fondo `--dulce`, texto `--chocolate`, radio `--r-chico`, padding 4px 10px, `--fs-chico`, peso 600, **sin mayúsculas**.
- `.precio`: estilo de la tabla 4.3, color `--chocolate`. "c/u" o "Desde" van en `--fs-chico` peso 500 `--texto-suave`.
- `.lista-hojas`: `<ul>` sin viñetas, cada `<li>` con una mini hoja SVG de 14px como viñeta (`::before` con `mask` de la hoja o SVG inline).
- `.banda-cierre`: fondo `--navy`, texto `--papel`, radio `--r-grande`, padding `--e8` (en celular `--e7`), contenido centrado, h2 + párrafo + `.btn-dulce`. Dentro del `.contenedor`, no a lo ancho de la pantalla.
- `.preguntas details`: borde inferior 1px `--linea`. El `summary` va en peso 650, `--fs-medio`, con un "+" dibujado (dos líneas SVG) que rota 45° al abrir (150ms). Respuesta en `--texto-suave`, max 62ch.

---

### 7.1 `index.html`

`<body data-pagina="inicio">`. Secciones en este orden:

#### A. Hero (`<section class="hero">`)
Grilla: en ≥960px, texto 7 columnas y visual 5. En celular se apila: texto primero, visual después.

**Texto:**
- **h1:** *"Horneamos cosas ricas. Vos poné el mate."*
- Debajo del h1, el `.garabato-subrayado` (chocolate, ancho 60% del h1, `.dibujar`).
- **Párrafo** (`--fs-medio`): *"Somos cuatro amigos con un horno, recetas de familia y cero paciencia para las premezclas. Hacemos brownies, pastafrolas y alfajores, y coordinamos la entrega por WhatsApp."*. Si **[P3]** da ciudad: *"…y los llevamos frescos por [ciudad]."*
- **Botones:** primario "Pedir por WhatsApp" + secundario "Ver la carta" (→ `#carta`).

**Visual:**
- `logo.png` grande (max 440px), sin marco, `fetchpriority="high"`, alt *"Ilustración de dos brownies sobre un repasador verde"*.
- Alrededor: 2 `.garabato-hoja` y 2 `.garabato-estrella` posicionados en absoluto, con `.brotar`.
- `.garabato-flecha` (`.dibujar`, color `--verde`) saliendo desde abajo a la izquierda de la imagen y apuntando a ella.
- En el origen de la flecha, `.nota-mano` (`.brotar`): *"acá somos Mati, Sofi, Vale y Thoto"*.
- En celular, la flecha y la nota van debajo de la imagen, más chicas.

#### B. La carta (`<section id="carta">`)
- **h2:** *"La carta"*, con una `.garabato-hoja` a la derecha (estática).
- **Intro:** *"Tres cosas, bien hechas. Horneamos poquito por vez para que te llegue fresco."*
- **Grilla de 3 columnas** en ≥960px (1 en celular, 2+1 en tablet). Cada producto es un `<article>`:
  1. `.polaroid` con la foto actual (mismo `src` y alt del original), `--giro` alternado: -2deg, 1.5deg, -1deg. Figcaption = nota a mano.
  2. h3 + párrafo + fila con `.precio` + botones.
  - **No** son tarjetas con fondo ni borde: la polaroid es el único "objeto"; el texto va suelto debajo.

| | Brownies | Pastafrolas | Alfajores |
|---|---|---|---|
| Foto (src original) | `index.html`, img "Brownies caseros…" | `index.html`, img "Pastafrola clásica casera…" | `index.html`, img "Alfajores de maicena y chocolate…" |
| Nota en la polaroid | "ojo, que vuelan" | "como la de la abuela" | "dulce de leche de más" |
| h3 | Brownie de chocolate y nueces | Pastafrola casera | Alfajores XXL |
| Texto | Cacao 70%, centro húmedo, nueces tostadas y una pizca de sal. Cuadrado de 120 g. | Masa con limón y vainilla, enrejado hecho a mano. De membrillo, batata con chocolate o mitad y mitad. | Tapas que se deshacen y dulce de leche hasta el borde. De maicena, chocolate o nuez. |
| Precio | $2.400 c/u | Desde $4.200 | Desde $2.400 |
| Botón principal | "Pedir brownies" → WA con texto "¡Hola Quatro! Quiero pedir brownies de chocolate." | "Pedir pastafrola" → WA "¡Hola Quatro! Quiero pedir una pastafrola." | "Pedir alfajores" → WA "¡Hola Quatro! Quiero pedir alfajores." |
| Link secundario (texto subrayado verde, sin flecha) | "Ver las cajas" → `brownies.html` | "Ver sabores y tamaños" → `pastafrolas.html` | "Armar mi caja" → `alfajores.html#armador` |

- **Se elimina** el modal de detalle (`mostrarDetalle`): los consejos de conservación pasan a las preguntas frecuentes.

#### C. Nuestra historia (`<section id="nuestra-historia">`)
Grilla de 2 columnas en ≥960px: texto a la izquierda, foto a la derecha.
- **h2:** *"Cuatro amigos y un horno"*
- **P1:** *"Nos conocimos entre bandejas, harina y mates que no se terminaban nunca. Un día dijimos: ¿y si esto que hacemos para nosotros lo hacemos para todos? Así nació Quatro."*
- **P2:** *"Usamos manteca de verdad, huevos de campo y chocolate del bueno. Nada de premezclas ni conservantes: si no lo pondríamos en nuestra mesa, no va en tu caja."*
- **`.lista-hojas`** (3 ítems; título en peso 650 y debajo una oración en `--texto-suave`, en dos líneas, sin rayas):
  - **Manteca de verdad**: Nada de margarina, ni siquiera "un poquito".
  - **Dulce de leche repostero**: Del espeso, el que no se escurre.
  - **Hecho a pedido**: No tenemos nada guardado en el freezer.
- **Foto:** `.polaroid` con la foto actual del hero de index ("Mesa artesanal de pastelería Quatro…"), `--giro: 2deg`. Figcaption: *"Mati, Sofi, Vale y Thoto"*. No inventar roles ni datos personales de cada uno.

#### D. Preguntas frecuentes (`<section id="preguntas">`)
Reemplaza los testimonios inventados.
- **h2:** *"Lo que siempre nos preguntan"*
- `<details>` (todos cerrados al inicio):
  1. **¿Cómo hago un pedido?** Nos escribís por WhatsApp, nos contás qué querés y para cuándo, y coordinamos. Así de simple.
  2. **¿Con cuánta anticipación?** **[P5]**. Por defecto: *"Ideal con 24 horas, así lo horneamos para vos. Si es para hoy, preguntanos igual: a veces sale."*
  3. **¿Hacen envíos?** **[P3]**. Por defecto: *"Sí. Coordinamos envío o retiro por WhatsApp según dónde estés."*
  4. **¿Cómo los conservo?** *"Brownies: a temperatura ambiente, y si querés el centro fundente, 10 segundos de microondas. Pastafrola: hasta 5 días bajo campana. Alfajores: en lata cerrada, en un lugar fresco y seco."*
  5. **¿Hacen cajas para regalar o para eventos?** *"Sí. Armamos cajas mixtas con lo que quieras. Contanos la ocasión y lo vemos juntos."*

#### E. Cierre (`.banda-cierre`)
- **h2:** *"¿Antojo?"*
- **Párrafo:** *"Escribinos y vemos qué sale del horno."*
- **Botón dulce:** "Pedir por WhatsApp" → WA "¡Hola Quatro! Quiero armar una caja mixta."

#### Se elimina de index
Banner superior de anuncio, canvas de partículas, loader global, insignias "100% Casero", tarjeta "Capacidad de horno 85%", "1.400 porciones", testimonios, modal de detalle, fundido de página.

---

### 7.2 `brownies.html`

`<body data-pagina="brownies">`.

#### A. Hero
Misma grilla que index: texto 6, foto 6.
- **h1:** *"Brownies de chocolate en serio"* + subrayado chocolate (`.dibujar`).
- **Párrafo:** *"Arriba, esa costrita brillante que cruje. Adentro, húmedo y denso. Con nueces tostadas y sal patagónica, como tiene que ser."*
- **`.lista-hojas` en línea** (flex wrap, gap 16px): Cacao 70%, Centro húmedo, Nueces tostadas, Sin conservantes.
- **Botones:** primario "Pedir brownies" (WA, mismo texto que el link original del hero) + secundario "Ver las cajas" (→ `#cajas`).
- **Foto:** `.polaroid` con la foto actual del hero de brownies, `--giro: 1.5deg`. Figcaption: *"calentalo 10 segundos. de nada."*. Al lado, 1 hoja y 1 estrella con `.brotar`.

#### B. Lo que lleva (y lo que no) (`<section id="ingredientes">`)
- **h2:** *"Lo que lleva (y lo que no)"*
- 2 columnas en ≥960px:
  - **Lleva** (h3 + `.lista-hojas`, título en peso 650 y debajo una oración):
    - **Cacao 70%**: Chocolate amargo de verdad, con notas tostadas.
    - **Manteca de primera**: Por eso brilla y se derrite.
    - **Huevos de campo**: Los responsables de la costrita de arriba.
    - **Nueces tostadas**: Las tostamos el mismo día.
  - **No lleva** (h3 + lista, cada ítem con un `.garabato-tachado` chocolate encima del texto):
    - Premezclas
    - Margarina
    - Conservantes
    - Apuro
  - Debajo de "No lleva", `.nota-mano--choco`: *"y nunca va a llevar"*.

#### C. Cajas (`<section id="cajas">`)
- **h2:** *"Elegí tu caja"*
- **Intro:** *"Listas para regalar, o para no compartir con nadie. Van en papel manteca y caja cerrada."*
- **3 columnas** en ≥960px. Las cajas 1 y 3 van sin fondo, con borde 1px `--linea` y radio `--r-medio`. La caja 2 lleva fondo `--dulce`, sin borde, y queda 12px más arriba en escritorio. Cada una tiene: foto actual (`aspect-ratio 4/3`, radio `--r-medio` arriba), `.etiqueta`, h3, párrafo, `.lista-hojas`, fila con precio y botón primario "Pedir esta caja".
  - **El `href` de cada botón es exactamente el link de WhatsApp original de esa caja.** Solo cambia el número según **[P6]**.

| | Caja 1 | Caja 2 | Caja 3 |
|---|---|---|---|
| Etiqueta | 4 brownies | 8 brownies | 16 bocaditos |
| h3 | Cuarteto clásico | Indulgencia | Mini bocaditos |
| Texto | Cuatro brownies generosos con nueces y sal patagónica. | Ocho brownies: cuatro clásicos con nueces y cuatro con hilos de dulce de leche. | Dieciséis bocaditos para picar en reuniones, cumpleaños o la oficina. |
| Lista | Porciones de 110 g aprox. / Nueces tostadas en el día / Merienda para 2 o 3 | Dos sabores en una caja / Con cinta, lista para regalar / Hecha en lote chico | Fáciles de servir / Doble cacao / Con toppers de Quatro |
| Precio | $6.800 | $12.500 (con `.garabato-circulo` chocolate alrededor) | $11.200 |
| Nota a mano | (ninguna) | "la más completa" (arriba a la derecha, rotada) | (ninguna) |

- La etiqueta "Más elegida" original **se saca** porque no está confirmada.

#### D. Con qué va mejor (`<section id="maridaje">`)
- **h2:** *"Con qué va mejor"*
- 3 columnas de texto (sin tarjetas). Cada una con un garabato chico (hoja / estrella / hoja chocolate), h3 y párrafo:
  - **Café**: Un espresso o un flat white corta lo dulce y le saca lo mejor a las nueces.
  - **Mate amargo**: El clásico. No hace falta explicar nada.
  - **Leche bien fría**: Brownie tibio y vaso helado. Nostalgia pura.

#### E. Cierre (`.banda-cierre`)
- **h2:** *"¿Te tentaste?"*
- **Párrafo:** *"Escribinos y reservá los tuyos para la próxima hornada."*
- **Botón dulce:** "Pedir brownies por WhatsApp" (link original del CTA final).

#### Se elimina de brownies
Loader "Horneando la magia", sección de lotes con 85% y 1.840 brownies, testimonios, eyebrows.

---

### 7.3 `pastafrolas.html`

`<body data-pagina="pastafrolas">`.

#### A. Hero
- **h1:** *"Pastafrolas como las de la abuela"* + subrayado.
- **Párrafo:** *"Masa con manteca, ralladura de limón y vainilla. Enrejado hecho a mano, tira por tira. Huele a domingo."*
- **Botones:** primario "Pedir pastafrola" (WA, link original del hero) + secundario "Ver sabores" (→ `#sabores`).
- **Foto:** `.polaroid` con la foto actual del hero, `--giro: -1.5deg`. Figcaption: *"ojo: hay que compartirla"*. Agregar hoja y estrella con `.brotar`.

#### B. Sabores (`<section id="sabores">`)
- **h2:** *"Tres sabores, dos tamaños"*
- **Intro:** *"Cada pastafrola se arma de a una. Elegí el tamaño según cuántos son en la mesa."*
- **Selector de tamaño:** grupo de 2 botones (`role="group"`, `aria-label="Tamaño"`, cada botón con `aria-pressed`). Contenedor con fondo `--brote` y radio píldora; el activo va con fondo `--verde` y texto `--papel`:
  - `#tamanoInd`: "Individual (15 cm)"
  - `#tamanoFam`: "Familiar (26 cm)"
- **3 columnas.** Cada sabor: `.polaroid` con su foto actual (`--giro` -1.5 / 1 / -1), h3, párrafo, línea "Rinde **{rinde}**" (`id="rinde-1"`, etc.), precio (`id="precio-1"`, etc.) y botón primario "Pedir esta" (`id="pedir-1"`, etc.).

| | Sabor 1 | Sabor 2 | Sabor 3 |
|---|---|---|---|
| Nota en la polaroid | "la de siempre" | "la de la abuela" | "para indecisos" |
| h3 | Membrillo | Batata y chocolate | Mitad y mitad |
| Texto | Membrillo espeso con un toque de oporto. La que nunca falla. | Batata cremosa con chips de chocolate que se derriten adentro. | Mitad membrillo, mitad dulce de leche con coco. Para no tener que elegir. |
| Individual | $4.200, rinde 1 a 2 porciones | $4.500, rinde 1 a 2 porciones | $4.600, rinde 1 a 2 porciones |
| Familiar | $8.900, rinde 8 a 10 porciones | $9.500, rinde 8 a 10 porciones | $9.800, rinde 8 a 10 porciones |
| Texto WA (individual) | ¡Hola Quatro! Quiero pedir la pastafrola de membrillo individual (15 cm). | …de batata y chocolate individual (15 cm). | …mitad y mitad individual (15 cm). |
| Texto WA (familiar) | …de membrillo familiar (26 cm). | …de batata y chocolate familiar (26 cm). | …mitad y mitad familiar (26 cm). |

#### C. Cómo la hacemos (`<section id="proceso">`)
Es una secuencia real, así que acá **sí** van números. Los números van en Gochi Hand grande (2.5rem), color `--chocolate`, dentro de un `.garabato-circulo` chico.
- **h2:** *"Cómo la hacemos"*
- **Intro:** *"Sin apuro. La masa sablée no se bate: se arena a mano para que quede quebradiza."*
- 3 pasos en fila (escritorio), unidos por `.garabato-punteado` detrás. En celular, en columna y sin punteado:
  1. **Amasado en frío**: A mano, con manteca fría, yemas de campo y ralladura de limón. Si se calienta, se arruina.
  2. **Enrejado a cuchillo**: Tiras de 8 mm, una por una, cruzadas en diagonal para que el relleno respire.
  3. **Horno suave**: 45 minutos a 165 °C y una pincelada de almíbar de vainilla al salir.

#### D. Cierre (`.banda-cierre`)
- **h2:** *"Encargá la tuya"*
- **Párrafo:** **[P5]**. Por defecto: *"Pedila con 24 horas y te llega recién horneada."*
- **Botón dulce:** "Pedir pastafrola por WhatsApp" (link original del banner).
- **Se sacan** "Horneamos de Martes a Domingos" (salvo que **[P1]** diga lo contrario) y "Respuesta en menos de 15 min" (salvo que **[P5]** lo confirme).

---

### 7.4 `alfajores.html`

`<body data-pagina="alfajores">`.

#### A. Hero
- **h1:** *"Alfajores con dulce de leche de más"* + subrayado.
- **Párrafo:** *"Nos negamos a los alfajores tacaños. Tapas que se deshacen, dulce de leche repostero hasta el borde y coco rallado."*
- **Botones:** primario "Armar mi caja" (→ `#armador`) + secundario "Pedir por WhatsApp" (WA, link original "WhatsApp Express").
- **Foto:** `.polaroid` con la foto actual del hero, `--giro: 1.5deg`. Figcaption: *"[P2] de dulce de leche. sí, leíste bien."*. Agregar hoja y estrella.

#### B. Variedades (`<section id="variedades">`)
- **h2:** *"Tres para elegir"*
- **Pestañas** (`role="tablist"`, `aria-label="Filtrar alfajores"`; cada una `role="tab"` con `aria-selected`; mismo estilo que el selector de pastafrolas):
  - `#pestanaTodos` "Todos"
  - `#pestanaClasicos` "Clásicos"
  - `#pestanaEspeciales` "Chocolate y nuez"
- **Grilla de 3** `<article class="alfajor" data-categoria="clasicos|especiales">`. Cada uno: foto actual (radio `--r-medio`, sin polaroid, para variar respecto del hero), `.etiqueta` con el peso, h3, precio, párrafo y botón secundario "Sumar a mi caja" (`onclick` / listener que llama a `elegirSabor('maicena'|'marplatense'|'nuez')`).

| | Maicena | Marplatense | Nuez |
|---|---|---|---|
| Categoría | clasicos | especiales | especiales |
| Etiqueta | 160 g | 145 g | 150 g |
| h3 | Maicena clásico XXL | Marplatense semiamargo | Nuez y dulce de leche |
| Precio | $2.400 | $2.600 | $2.800 |
| Texto | Tapas que se deshacen, dulce de leche hasta el borde y coco tostado. | Tapas de cacao con un toque de naranja, bañadas en chocolate semiamargo. | Masa con nueces molidas y relleno cremoso. Crocante y suave a la vez. |

#### C. Cómo llegan (`<section id="packaging">`)
Bloque con fondo `--brote`, radio `--r-grande`, 2 columnas.
- **h2:** *"Cómo llegan"*
- **Párrafo:** *"Cada alfajor va envuelto en papel manteca, adentro de una caja de cartón reciclable, atada con hilo de yute y sellada a mano por nosotros."*
- **2 opciones** (texto, sin tarjetas):
  - **Caja de 6**: Para regalar, o para dos fanáticos.
  - **Caja de 12**: Para compartir, y con 10% de descuento.
- **Foto:** la foto actual de cajas, radio `--r-medio`, sin el degradado navy encima.

#### D. Armá tu caja (`<section id="armador">`)
El id cambia de `cotizador` a `armador`. Actualizar todos los links internos.
- **h2:** *"Armá tu caja"*
- **Intro:** *"Elegí el tamaño, repartí los sabores y te dejamos el mensaje de WhatsApp listo para mandar."*
- 2 columnas en ≥960px: formulario (7) y ticket (5). En celular, el ticket va debajo.

**Formulario** (pasos numerados, porque es una secuencia; números en Gochi Hand chocolate):
1. **¿Qué caja querés?** 2 opciones radio `name="tamanoCaja"`, estilizadas como bloques seleccionables (borde 2px `--linea`; seleccionada: borde `--verde` y fondo `--brote`):
   - valor `6`: "Caja de 6", debajo "La clásica"
   - valor `12`: "Caja de 12", debajo "10% de descuento"
2. **Repartí los sabores.** Contador `#contadorSabores` (`aria-live="polite"`):
   - Si completo: "¡Caja completa!" en `--verde`.
   - Si falta: "Te faltan N" en `--chocolate`.
   - Una fila por sabor: nombre + "$X c/u" + botones − / + (44×44, redondos, borde `--linea`, con `aria-label="Sacar un Maicena clásico"` / `"Sumar un Maicena clásico"`) + cantidad `#cant-maicena` / `#cant-marplatense` / `#cant-nuez`.
   - Cuando no se puede sumar o restar, el botón queda `disabled` con opacidad .4.
3. **¿Alguna dedicatoria o aclaración?** (opcional) `<input id="notas">` con `<label>`, placeholder "Ej: es para el cumple de mamá, con moño". Radio `--r-chico`, borde `--linea`, foco con borde `--verde`.

**Ticket** (`.ticket`): fondo blanco, `--sombra-papel`, bordes superior e inferior dentados (`mask` con radial-gradient tipo ticket de papel), padding `--e6`.
- Título: "Tu caja" (h3) + `.nota-mano` "hecha a mano".
- Filas:
  - `#ticketCaja` "Caja de 6" → `#ticketSubtotal`
  - Fila de descuento `#filaDescuento` (oculta si es caja de 6): "Descuento caja de 12 (10%)" → `#ticketDescuento` en `--verde`
  - "Packaging y sello" → "de regalo"
- Línea punteada, luego "Total" + `#ticketTotal` (precio grande, `aria-live="polite"`).
- Aclaración chica: *"Precio estimado. Te confirmamos por chat si hay para la hornada que querés."*
- Botón primario a lo ancho: "Mandar pedido por WhatsApp" (`#botonPedirCaja`).

#### Se elimina de alfajores
Badges "Dulce de Leche Premium Criollo" y "100% ARTESANAL", barra "Compromiso Artesanal 100%", eyebrows, "Precios frescos del día".

---

## 8. JavaScript

Todo en JS moderno sin librerías, con `defer`. Nada de funciones globales salvo las necesarias.

### 8.1 `js/quatro.js` (compartido)
1. Sacar `sin-js` de `<html>` y, en `DOMContentLoaded`, agregar `cargado` al `<body>`.
2. **Menú móvil:** toggle de `#menuMovil` (atributo `hidden`), actualizar `aria-expanded` y `aria-label`, cambiar el ícono. Cerrar con Esc, al tocar un link y al pasar a ≥960px.
3. **Acordeón de productos móvil:** toggle con `aria-expanded`, chevron rota 180°.
4. **Desplegable de escritorio:** click/Enter abre y cierra (`aria-expanded`). Esc cierra y devuelve el foco al botón. Click afuera cierra. El hover y `:focus-within` se resuelven en CSS.
5. **Pastilla elástica** (se conserva la lógica actual con nombres nuevos):
   - `moverPastilla(item)` mide el link o botón del ítem respecto de `#navEscritorio` y fija `left/top/width/height/opacity` de `#navPastilla`.
   - El ítem bajo la pastilla tiene texto `--papel`; los demás `--texto-suave`. Se hace con la clase `.activo`, no con clases de Tailwind.
   - Transición CSS: `left/top/width/height 280ms cubic-bezier(.25,1,.5,1)`.
   - Ítem activo inicial según `body[data-pagina]`: inicio → `inicio`, el resto → `productos`.
   - Hover sobre un ítem mueve la pastilla; al salir del nav, vuelve al activo.
   - Re-sincronizar en `resize`, en `document.fonts.ready` y con `requestAnimationFrame` inicial.
   - **Solo en index (scrollspy):** activo = `historia` cuando el top de `#nuestra-historia` ≤ 50% del alto de pantalla. Cuando el h2 de `#preguntas` pasa la mitad, la pastilla se oculta (opacity 0). Si no, activo = `inicio`. Scroll con `{ passive: true }`.
   - En index, click en "Inicio" hace scroll suave arriba y limpia el hash. Click en "Nuestra historia" hace scroll suave a la sección, compensando 80px del header, y hace `history.pushState` con `#nuestra-historia`.
   - Respetar `prefers-reduced-motion`: scroll `auto` en vez de `smooth`.
6. **Links de WhatsApp:** una función `linkWhatsApp(texto)` que devuelve `https://wa.me/[P6]?text=${encodeURIComponent(texto)}`. Exportarla como `window.Quatro = { linkWhatsApp }` para los scripts de página.
7. **No incluir:** fundido entre páginas, loaders, partículas.

### 8.2 `js/pastafrolas.js`
- Objeto de datos:
  ```js
  const sabores = [
    { id: 1, nombre: 'membrillo',          ind: 4200, fam: 8900 },
    { id: 2, nombre: 'batata y chocolate', ind: 4500, fam: 9500 },
    { id: 3, nombre: 'mitad y mitad',      ind: 4600, fam: 9800 },
  ];
  const rinde = { ind: '1 a 2 porciones', fam: '8 a 10 porciones' };
  const etiquetaTamano = { ind: 'individual (15 cm)', fam: 'familiar (26 cm)' };
  ```
- `cambiarTamano('ind'|'fam')`:
  - Actualiza `aria-pressed` y la clase activa de los botones.
  - Actualiza precios con `toLocaleString('es-AR')` y prefijo `$`, y la línea de rinde.
  - Actualiza el `href` de cada `#pedir-N` con `Quatro.linkWhatsApp(\`¡Hola Quatro! Quiero pedir la pastafrola de ${nombre} ${etiquetaTamano[t]}.\`)`.
- Estado inicial: `ind`. Ejecutar `cambiarTamano('ind')` al cargar para que los `href` queden bien armados.

### 8.3 `js/alfajores.js`
Conservar **exactamente** la lógica de negocio actual:
- Precios: `maicena 2400`, `marplatense 2600`, `nuez 2800`.
- Estado inicial: caja de 6 con `{ maicena: 4, marplatense: 1, nuez: 1 }`.
- **Pestañas:** `filtrar('todos'|'clasicos'|'especiales')` muestra u oculta cada `.alfajor` (atributo `hidden`) y actualiza `aria-selected`. Navegación con flechas izquierda/derecha entre pestañas.
- `ajustar(sabor, delta)`: no suma si el total ya llegó al tamaño de la caja; no resta por debajo de 0.
- Al **cambiar a caja de 6** con más de 6 elegidos, ir restando desde el último sabor con cantidad (nuez, después marplatense, después maicena) hasta llegar a 6. El original no lo contemplaba y quedaban 12 en una caja de 6.
- `elegirSabor(sabor)` (desde "Sumar a mi caja"): pone caja de 6 con los 6 de ese sabor, hace scroll suave a `#armador` y mueve el foco al título del armador (`tabindex="-1"`).
- `actualizar()`:
  - subtotal = Σ cantidad × precio
  - descuento = caja de 12 ? `Math.round(subtotal * 0.10)` : 0
  - total = subtotal − descuento
  - Actualiza `#contadorSabores`, el ticket, la fila de descuento (`hidden`) y el estado `disabled` de los botones − / +.
- `mandarPedido()`: arma el mensaje como **texto plano** y lo codifica entero con `Quatro.linkWhatsApp`. Corrige el bug actual: el "&" de "Nuez & Dulce de Leche" cortaba el mensaje porque no estaba codificado.
  ```
  ¡Hola Quatro! Quiero una caja de {6|12} alfajores:
  • {n} Maicena clásico XXL          (solo si n > 0)
  • {n} Marplatense semiamargo        (solo si n > 0)
  • {n} Nuez y dulce de leche         (solo si n > 0)

  Aclaración: {notas}                 (solo si hay)

  Total estimado: {total}
  ¿Tienen para hoy o mañana? ¡Gracias!
  ```
  Abre con `window.open(url, '_blank', 'noopener')`. Si la caja no está completa, igual permite mandar (como hoy) y agrega la línea "(La caja no está completa, ¿me ayudan a completarla?)".
- **Botón flotante:** ocultarlo mientras `#armador` es visible (IntersectionObserver, `threshold: 0.15`).

---

## 9. Accesibilidad, SEO y rendimiento

- Un solo `<h1>` por página. Jerarquía h2 → h3 sin saltos. Los `<h4>` del footer pasan a `<h2 class="pie-titulo">` con estilo chico.
- Landmarks: `header`, `nav`, `main#contenido`, `footer`. Cada `section` lleva `aria-labelledby` apuntando a su h2.
- Todas las fotos conservan su `alt` original (podés acortarlo). Los garabatos van con `aria-hidden="true"`.
- Contraste mínimo AA (4.5:1 en texto). Verificar `--texto-suave` sobre `--papel` y sobre `--brote`; si no llega, subir la opacidad a .8.
- Foco visible en todo lo interactivo (ver botones). No sacar `outline` sin reemplazo.
- Objetivos táctiles de al menos 44×44px.
- `prefers-reduced-motion` respetado (sección 6 y scroll suave).
- Imágenes: `loading="lazy"` en todas menos la del hero (`fetchpriority="high"`). Agregar `width` y `height` (o `aspect-ratio`) para que no salten.
- **Sin Tailwind CDN, sin Material Symbols, sin canvas.** Solo 2 familias de fuentes.
- Todos los links externos con `target="_blank" rel="noopener noreferrer"`.
- IDs únicos y descriptivos en todo lo interactivo (ya definidos arriba).

---

## 10. Verificación (obligatoria antes de entregar)

1. Levantar un servidor local en la carpeta del proyecto (`npx -y serve .` o `python -m http.server 8080`) y abrir cada página.
2. Revisar cada página con capturas en **375px**, **768px** y **1280px**:
   - Nada desborda horizontalmente.
   - Los garabatos no tapan texto ni botones.
   - Las polaroids no se cortan.
3. Probar:
   - Menú móvil: abre, cierra, Esc, acordeón de productos.
   - Desplegable de escritorio con mouse **y** con teclado (Tab, Enter, Esc).
   - Pastilla: hover, volver al activo, scrollspy en index (Inicio → Historia → oculta) y clicks en Inicio y Nuestra historia.
   - `index.html#nuestra-historia` abierto desde otra página cae en la sección correcta.
   - Pastafrolas: cambiar tamaño actualiza 3 precios, 3 rindes y 3 links de WhatsApp (revisar el `href`).
   - Alfajores:
     - Las pestañas filtran bien.
     - Los +/− respetan los límites.
     - Pasar de 12 a 6 recorta las cantidades.
     - El descuento aparece solo en la caja de 12.
     - "Sumar a mi caja" precarga 6 del sabor y baja al armador.
     - El mensaje de WhatsApp sale completo, con "Nuez y dulce de leche" y la aclaración con acentos.
   - Todos los botones de WhatsApp abren `wa.me/[P6]` con el texto correcto.
   - Preguntas frecuentes: abren y cierran.
4. Emular `prefers-reduced-motion: reduce`: los garabatos aparecen ya dibujados, sin animación.
5. Consola del navegador sin errores en las 4 páginas.
6. Lighthouse (o similar): Accesibilidad ≥ 95 en las 4 páginas.
7. **Autocrítica con las capturas** (pide la skill):
   - ¿Algo se parece a una plantilla genérica? Cambialo.
   - ¿Hay más de 4 garabatos por pantalla? Sacá uno.
   - ¿Quedó alguna mayúscula sostenida, flecha "→", punto medio o eyebrow? Sacalo.
   - ¿Hay textos que "venden" en vez de explicar? Simplificalos.
   - Antes de terminar, sacá un adorno de cada página.

---

## 11. README.md

Reescribir, en el mismo tono relajado:
- **Qué es Quatro** (2 líneas).
- **Páginas:** las 4, con una línea cada una.
- **Estructura de archivos:** `css/quatro.css`, `js/quatro.js`, `js/pastafrolas.js`, `js/alfajores.js`, `logo.png`.
- **Cómo verla en local:** `npx serve .`.
- **Cómo cambiar precios:** dónde están en cada página y en los JS.
- **Cómo cambiar el número de WhatsApp:** `js/quatro.js` + links en HTML.
- La sección de **despliegue en GitHub Pages** se conserva como está.
- Sacar las menciones a "Frosted Glass" y "Transiciones suaves", que ya no existen.

---

## 12. Cómo reportarle al usuario al terminar

En español, corto y **sin tecnicismos**:
- Qué cambió a la vista: colores, letras, notas a mano, polaroids.
- Qué se sacó y por qué: pantallas de carga, datos inventados, testimonios.
- Qué se corrigió: links de WhatsApp, el mensaje de alfajores que se cortaba, la caja de 6 que aceptaba 12.
- Que las fotos y los precios quedaron iguales.
- Que hay respaldo de la versión anterior en `_respaldo_v1/`.
- Capturas de las 4 páginas (escritorio y celular).
- **Sugerencias opcionales, sin implementarlas:**
  - `logo.png` pesa 3,4 MB y hace lenta la carga. Se puede generar una versión liviana.
  - Si algún día tienen fotos propias, conviene reemplazar las actuales.
  - Si tienen redes, sumarlas.
