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
│   ├── videos/
│   │   └── pkmn.mp4      Video de fondo del hero (ya incluido)
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

## Cómo funciona el video de fondo del hero

El hero (`index.html`) reproduce un video local de fondo, oscurecido con
una capa CSS (`.hero-overlay`) para que el texto siga siendo legible, en
automático, sin sonido y en loop.

El archivo ya está incluido en:

```
assets/videos/pkmn.mp4
```

A partir del video que compartiste (720p, 3 minutos, ~200 MB) generé esta
versión para el sitio: **recorté los primeros 20 segundos** para usarlos
como loop corto, le quité el audio (no se necesita, se reproduce muteado)
y lo comprimí a H.264 — quedó en ~4.5 MB, apto para cargar rápido en la web.

Si prefieres otro fragmento del video, uno más largo, o el video completo
comprimido (pesaría bastante más, del orden de 30-40 MB), dime qué
segundo de inicio y fin quieres y te genero esa versión.

Si en algún momento quieres reemplazarlo tú mismo por otro archivo, solo
sobrescribe `assets/videos/pkmn.mp4` con el mismo nombre, o cambia la ruta
en la línea `<source src="assets/videos/pkmn.mp4" ...>` dentro de la
sección `<section class="hero" id="hero">` en `index.html`.

Recomendaciones si subes tu propio archivo más adelante:
- Formato `.mp4` (códec H.264), para máxima compatibilidad entre navegadores.
- Comprimido/ligero — un hero de fondo no necesita más de unos pocos MB;
  archivos muy pesados hacen que la página cargue lento.
- El audio no es necesario, ya que el video se reproduce muteado.

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
