# Richampions Cup — sitio web

Sitio para publicar la información de los torneos de Pokémon VGC de **Richampions Cup**.

## Estructura

```
rick-cup/
├── index.html          Página principal (hero + acerca de)
├── torneo.html          Plantilla única para TODOS los torneos (usa ?t=slug)
├── css/
│   └── styles.css       Todos los estilos del sitio
├── js/
│   ├── data.js           <-- AQUÍ EDITAS los torneos, participantes y partidos
│   └── main.js           Lógica que dibuja el navbar y las páginas de torneo
├── assets/
│   ├── brand/
│   │   └── logo.png      Tu logo, usado en el navbar, el hero y el pie de página
│   └── sprites/          Carpeta para tus propias imágenes de Pokémon (opcional)
```

No hay una página HTML por torneo: `torneo.html` es una sola plantilla que
lee el torneo correspondiente desde `js/data.js` según el parámetro `?t=`
en la URL, por ejemplo:

```
torneo.html?t=vgc2026-reg-mb
```

Esto significa que **para agregar un torneo nuevo no necesitas tocar el
HTML**: solo agregas un objeto nuevo en `js/data.js`. El menú desplegable
"Torneos" del navbar y la agrupación por año se generan solos.

## Cómo agregar o editar un torneo

Abre `js/data.js`. Ahí encontrarás:

1. Un comentario al inicio que explica cada campo.
2. Un torneo de ejemplo (`vgc2026-reg-mb`) con participantes y
   enfrentamientos de muestra — reemplázalo por tus datos reales.

### Agregar un participante

Dentro del torneo correspondiente, en `participants`, agrega:

```js
{
  id: "juan-perez",          // único dentro del torneo, sin espacios
  name: "Juan Pérez",
  wins: 3,
  losses: 1,
  team: [
    { name: "Incineroar" },
    { name: "Rillaboom" },
    // ...hasta 6
  ],
}
```

### Usar tus propios sprites

Por defecto, cada Pokémon usa el sprite público de Pokémon Showdown según
su nombre (no necesitas hacer nada). Si quieres usar tus propias imágenes:

1. Coloca el archivo en `assets/sprites/` (por ejemplo `incineroar.png`).
2. En el equipo del participante, agrega la ruta:

```js
{ name: "Incineroar", sprite: "assets/sprites/incineroar.png" }
```

### Agregar un enfrentamiento

Dentro del torneo, en `matches`:

```js
{
  round: "Ronda 2",
  player1: "juan-perez",
  player2: "otro-id",
  games: [
    { winner: "juan-perez", youtubeUrl: "https://youtube.com/watch?v=XXXX" },
    { winner: "otro-id",    youtubeUrl: "https://youtube.com/watch?v=YYYY" },
    { winner: "juan-perez", youtubeUrl: "https://youtube.com/watch?v=ZZZZ" },
  ],
}
```

- El marcador (2-0, 2-1, etc.) y quién ganó el enfrentamiento se calculan
  automáticamente a partir de `games`.
- `youtubeUrl` es opcional por partida; si no tienes el enlace todavía,
  déjalo como `""` y el botón "Ver" simplemente no aparecerá para esa
  partida.

### Agregar la siguiente temporada / regulación

Copia el objeto completo de un torneo dentro de `js/data.js`, pégalo como
un nuevo elemento del arreglo `TOURNAMENTS`, y cambia `slug`, `year`,
`regulation`, `name`, `participants` y `matches`. Aparecerá automáticamente
en el menú "Torneos", agrupado bajo su año.

## Cómo agregar el video de fondo del hero

El hero (`index.html`) está preparado para llevar un video de fondo oscurecido
automáticamente para que el texto siga siendo legible. Por defecto está
comentado, así que se ve en negro sólido.

1. Coloca tu archivo de video (idealmente `.mp4`, comprimido, sin audio
   necesario ya que se reproduce muteado) dentro de `assets/`, por ejemplo
   `assets/hero-video.mp4`.
2. En `index.html`, dentro de la sección `<section class="hero" id="hero">`,
   descomenta el bloque `<video class="hero-video" ...>` y ajusta la ruta si
   usaste otro nombre de archivo.
3. Opcionalmente agrega una imagen `assets/hero-poster.jpg` (se muestra
   mientras el video carga).

El oscurecido se aplica solo mediante CSS (capa `.hero-overlay`), así que no
necesitas editar el video para bajarle el brillo.

## Cómo agregar el video de fondo del hero

El hero (`index.html`) usa un video de YouTube como fondo (autoplay, sin
sonido y en loop), sin necesidad de descargar ningún archivo: se inserta
como un iframe de YouTube sin controles, ampliado con CSS para cubrir toda
la sección (ver `.hero-yt-frame` en `css/styles.css`). El oscurecido se
aplica aparte, con la capa `.hero-overlay`, así que no depende del video.

Para cambiar el video, edita en `index.html` la línea del `<iframe>` dentro
de `.hero-yt-frame` y reemplaza el ID en dos lugares (después de `/embed/`
y en `playlist=`):

```
https://www.youtube-nocookie.com/embed/TU_ID_AQUI?autoplay=1&mute=1&loop=1&playlist=TU_ID_AQUI&controls=0...
```

El ID es la parte final de la URL del video, por ejemplo en
`youtube.com/watch?v=H_CUX8yCNr8` el ID es `H_CUX8yCNr8`.

Si en algún momento prefieres un archivo de video propio en vez de YouTube
(por ejemplo para que cargue más rápido), también dejé listo el CSS para
un `<video>` local: agrega tu archivo en `assets/`, reemplaza el bloque
`.hero-yt-frame` en `index.html` por `<video class="hero-video" autoplay
muted loop playsinline src="assets/tu-video.mp4"></video>`.

## Cómo verlo localmente

Simplemente abre `index.html` con tu navegador (doble clic funciona,
no necesitas un servidor).

## Cómo publicarlo en internet (gratis)

La forma más simple es **GitHub Pages**:

1. Crea un repositorio en GitHub y sube esta carpeta.
2. Ve a *Settings → Pages*, selecciona la rama `main` y la carpeta raíz.
3. GitHub te da una URL pública (por ejemplo `tuusuario.github.io/rick-cup`).

También puedes arrastrar la carpeta a [Netlify Drop](https://app.netlify.com/drop)
o usar [Vercel](https://vercel.com) para lo mismo, sin necesidad de usar
la terminal.

## Aviso

El sitio incluye una nota en el pie de página aclarando que Richampions Cup no
está afiliado a Nintendo, Game Freak ni The Pokémon Company, ya que usa
nombres y sprites de Pokémon con fines informativos/fan-made.
