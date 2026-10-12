# Quatro • Pastelería de cuatro amigos

Quatro es la pastelería casera de Mati, Sofi, Vale y Thoto en Paraná y Santa Fe.
Hacemos brownies de cacao puro, pastafrolas tradicionales y alfajores con dulce de leche de más. Todo a pedido por WhatsApp.

## 📄 Páginas
- **Inicio (`index.html`)**: La carta principal con polaroids, nuestra historia de amigos y las preguntas frecuentes que siempre nos hacen.
- **Brownies (`brownies.html`)**: Cacao 70%, centro húmedo, nueces tostadas y las tres cajas listas para compartir.
- **Pastafrolas (`pastafrolas.html`)**: Membrillo, batata con chocolate o mitad y mitad; selector interactivo de tamaño (15 cm o 26 cm) y el paso a paso del amasado.
- **Alfajores (`alfajores.html`)**: Maicena XXL, marplatense y nuez con el armador interactivo de cajas de 6 y 12 unidades.

## 📁 Estructura de archivos
- `css/quatro.css`: Sistema de diseño propio (colores naturales navy, verde brote, crema y chocolate; tipografías Bricolage Grotesque y Gochi Hand; polaroids con cinta, ticket dentado y garabatos).
- `js/quatro.js`: Menú móvil accesible, desplegable de productos con hover continuo, pastilla elástica con scrollspy, partículas ambientales, generador de enlaces de WhatsApp y pantalla de carga con la animación Lottie del gatito.
- `js/pastafrolas.js`: Selector dinámico de tamaño (individual o familiar), actualización de precios, porciones y enlaces directos de pedido.
- `js/alfajores.js`: Pestañas de variedades, armador en vivo de cajas (con recorte automático al bajar a 6 unidades), cálculo de descuento del 10% y redacción del pedido para WhatsApp.
- `js/gatito-data.js` & `js/lottie.min.js`: Reproductor y datos locales de la animación Lottie del gatito para la pantalla de carga entre páginas.
- `lottiefiles/gatito_gordito.json`: Archivo fuente de la animación Lottie del gatito gordito.
- `logo.png`: Identidad visual del emprendimiento.
- `_respaldo_v1/`: Copia de seguridad intacta de los archivos HTML originales antes del rediseño.

## 💻 Cómo probar el sitio en tu computadora
Podés abrir directamente cualquier archivo `.html` con tu navegador, o si preferís un servidor local:
```bash
# Con Node.js
npx serve .

# O con Python
python -m http.server 8080
```
Y abrir `http://localhost:8080` (o el puerto que te indique la consola).

## 💰 Dónde cambiar los precios
- **Brownies**: en `brownies.html` y en `index.html` (dentro de los elementos con clase `.precio`).
- **Pastafrolas**: en `js/pastafrolas.js` (en el objeto `const sabores` al inicio del archivo) y en el texto de `index.html`.
- **Alfajores**: en `js/alfajores.js` (en el objeto `PRECIOS`), y en las tarjetas de `alfajores.html` e `index.html`.

## 📱 Dónde cambiar el número de WhatsApp
El número configurado actualmente es `+54 9 343 468-5501` (`5493434685501`).
Para cambiarlo:
1. En `js/quatro.js`, en la función `linkWhatsApp`.
2. En los atributos `href="https://wa.me/5493434685501..."` de los botones fijos en cada archivo HTML.

## 📦 Despliegue en GitHub Pages

1. Subir este repositorio a GitHub:
   ```bash
   git remote add origin https://github.com/TU-USUARIO/TU-REPOSITORIO.git
   git branch -M main
   git push -u origin main
   ```
2. En GitHub, ir a la pestaña **Settings** > **Pages** de tu repositorio.
3. En **Build and deployment** > **Source**, seleccionar:
   - **Branch**: `main`
   - **Folder**: `/ (root)`
4. Hacer clic en **Save**. En unos minutos el sitio estará disponible en:
   `https://TU-USUARIO.github.io/TU-REPOSITORIO/`
