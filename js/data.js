/* ==============================================================
   RICHAMPIONS CUP — datos de torneos
   ==============================================================
   Edita este archivo para agregar torneos, participantes y
   enfrentamientos. No es necesario tocar el HTML ni el CSS.

   ESTRUCTURA DE UN TORNEO
   ------------------------------------------------------------
   {
     slug: "identificador-unico-para-la-url",   // usado en torneo.html?t=slug
     year: 2026,
     regulation: "VGC 2026 Reg M-B",             // nombre corto de la regulación
     name: "Richampions Cup — VGC 2026 Reg M-B",        // título completo de la página
     status: "live",                             // "live" | "upcoming" | "finished"
     format: "Best of 3 (Bo3)",
     dateRange: "Julio 2026",
     description: "Texto que describe el torneo...",

     participants: [
       {
         id: "id-unico-de-jugador",              // se usa para enlazar en "matches"
         name: "Nombre del participante",
         wins: 0,
         losses: 0,
         team: [
           // "sprite" es opcional: si se omite, se usa automáticamente
           // el sprite de Pokémon Showdown a partir del nombre.
           // Para usar tu propia imagen, pon la ruta del archivo, por ejemplo:
           // sprite: "assets/sprites/incineroar.png"
           { name: "Incineroar" },
           { name: "Rillaboom" },
         ]
       },
     ],

     matches: [
       {
         round: "Ronda 1",                       // agrupa los enfrentamientos
         player1: "id-unico-de-jugador",
         player2: "id-unico-de-jugador",
         games: [
           // un elemento por partida jugada dentro del Bo3
           // "winner" debe ser el id de player1 o player2
           // "youtubeUrl" es opcional, va directo a esa partida
           { winner: "id-jugador-1", youtubeUrl: "https://youtube.com/watch?v=XXXX" },
           { winner: "id-jugador-2", youtubeUrl: "https://youtube.com/watch?v=YYYY" },
           { winner: "id-jugador-1", youtubeUrl: "https://youtube.com/watch?v=ZZZZ" },
         ],
       },
     ],
   }
   ============================================================== */

const TOURNAMENTS = [
  {
    slug: "vgc2026-reg-mb",
    year: 2026,
    regulation: "VGC 2026 Reg M-B",
    name: "Richampions Cup — VGC 2026 Reg M-B",
    status: "upcoming",
    format: "Suizo · Bo3",
    dateRange: "Julio 2026",
    description:
      "Primera edición de Richampions Cup bajo la regulación VGC 2026 Reg M-B, jugada a sistema suizo. Inscripciones abiertas: por ahora hay 16 participantes registrados y aún no se ha jugado ningún enfrentamiento.",

    participants: [
      {
        id: "participante-1",
        name: "Participante 1",
        wins: 0,
        losses: 0,
        team: [],
      },
      {
        id: "participante-2",
        name: "Participante 2",
        wins: 0,
        losses: 0,
        team: [],
      },
      {
        id: "participante-3",
        name: "Participante 3",
        wins: 0,
        losses: 0,
        team: [],
      },
      {
        id: "participante-4",
        name: "Participante 4",
        wins: 0,
        losses: 0,
        team: [],
      },
      {
        id: "participante-5",
        name: "Participante 5",
        wins: 0,
        losses: 0,
        team: [],
      },
      {
        id: "participante-6",
        name: "Participante 6",
        wins: 0,
        losses: 0,
        team: [],
      },
      {
        id: "participante-7",
        name: "Participante 7",
        wins: 0,
        losses: 0,
        team: [],
      },
      {
        id: "participante-8",
        name: "Participante 8",
        wins: 0,
        losses: 0,
        team: [],
      },
      {
        id: "participante-9",
        name: "Participante 9",
        wins: 0,
        losses: 0,
        team: [],
      },
      {
        id: "participante-10",
        name: "Participante 10",
        wins: 0,
        losses: 0,
        team: [],
      },
      {
        id: "participante-11",
        name: "Participante 11",
        wins: 0,
        losses: 0,
        team: [],
      },
      {
        id: "participante-12",
        name: "Participante 12",
        wins: 0,
        losses: 0,
        team: [],
      },
      {
        id: "participante-13",
        name: "Participante 13",
        wins: 0,
        losses: 0,
        team: [],
      },
      {
        id: "participante-14",
        name: "Participante 14",
        wins: 0,
        losses: 0,
        team: [],
      },
      {
        id: "participante-15",
        name: "Participante 15",
        wins: 0,
        losses: 0,
        team: [],
      },
      {
        id: "participante-16",
        name: "Participante 16",
        wins: 0,
        losses: 0,
        team: [],
      },
    ],

    matches: [],
  },

  // Para agregar un nuevo torneo (por ejemplo, la siguiente regulación
  // o el siguiente año) copia el bloque de arriba, pégalo aquí abajo
  // como un nuevo objeto dentro del arreglo, y cambia sus datos.
  // El menú "Torneos" del navbar y el listado por año se actualizan solos.
];
