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
     name: "RICHAMPIONS PKMN CUP — VGC 2026 Reg M-B",        // título completo de la página
     status: "live",                             // "live" | "upcoming" | "finished"
     format: "Best of 3 (Bo3)",
     dateRange: "Julio 2026",
     description: "Texto que describe el torneo...",
     teamSheetFormUrl: "https://forms.gle/TU-FORMULARIO-AQUI", // Google Forms donde suben la captura de su equipo (Open Team Sheets)
     registrationDeadline: "2026-07-24T23:59:59", // fecha y hora límite de inscripción; después de esto se oculta el botón de subir captura

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
    name: "RICHAMPIONS PKMN CUP — VGC 2026 Reg M-B",
    status: "upcoming",
    format: "Suizo · Bo3",
    dateRange: "Julio 2026",
    description:
      "Primera edición de RICHAMPIONS PKMN CUP bajo la regulación VGC 2026 Reg M-B, jugada a sistema suizo. Inscripciones abiertas: por ahora hay 12 participantes registrados y aún no se ha jugado ningún enfrentamiento.",
    teamSheetFormUrl: "https://forms.gle/ArRumYHBD6ZfJNvo7",
    registrationDeadline: "2026-07-24T23:59:59",

    participants: [
      {
        id: "rick",
        name: "Rick",
        wins: 0,
        losses: 0,
        team: [
          { name: "Pichu" },
          { name: "Sylveon"},
          { name: "Hattrem" },
          { name: "Maushold" },
          { name: "Ponyta-Galar" },
          { name: "Jirachi" },
        ],
      },
      {
        id: "participante-2",
        name: "Participante 2",
        wins: 0,
        losses: 0,
        team: [
          { name: "Charizard" },
          { name: "Blastoise" },
          { name: "Venusaur" },
          { name: "Gengar" },
          { name: "Dragapult" },
          { name: "Corviknight" },
        ],
      },
      {
        id: "participante-3",
        name: "Participante 3",
        wins: 0,
        losses: 0,
        team: [
          { name: "Garchomp" },
          { name: "Gardevoir" },
          { name: "Rotom-Wash" },
          { name: "Florges" },
          { name: "Noivern" },
          { name: "Whimsicott" },
        ],
      },
      {
        id: "participante-4",
        name: "Participante 4",
        wins: 0,
        losses: 0,
        team: [
          { name: "Torkoal" },
          { name: "Grimmsnarl" },
          { name: "Krookodile" },
          { name: "Kommo-o" },
          { name: "Hydreigon" },
          { name: "Excadrill" },
        ],
      },
      {
        id: "participante-5",
        name: "Participante 5",
        wins: 0,
        losses: 0,
        team: [
          { name: "Arcanine" },
          { name: "Infernape" },
          { name: "Empoleon" },
          { name: "Feraligatr" },
          { name: "Typhlosion" },
          { name: "Samurott" },
        ],
      },
      {
        id: "participante-6",
        name: "Participante 6",
        wins: 0,
        losses: 0,
        team: [
          { name: "Incineroar" },
          { name: "Volcarona" },
          { name: "Tsareena" },
          { name: "Talonflame" },
          { name: "Klefki" },
          { name: "Ampharos" },
        ],
      },
      {
        id: "participante-7",
        name: "Participante 7",
        wins: 0,
        losses: 0,
        team: [
          { name: "Gholdengo" },
          { name: "Dragonite" },
          { name: "Skarmory" },
          { name: "Sylveon" },
          { name: "Skeledirge" },
          { name: "Primarina" },
        ],
      },
      {
        id: "participante-8",
        name: "Participante 8",
        wins: 0,
        losses: 0,
        team: [
          { name: "Pikachu" },
          { name: "Snorlax" },
          { name: "Lucario" },
          { name: "Umbreon" },
          { name: "Espeon" },
          { name: "Glaceon" },
        ],
      },
      {
        id: "participante-9",
        name: "Participante 9",
        wins: 0,
        losses: 0,
        team: [
          { name: "Kingambit" },
          { name: "Salazzle" },
          { name: "Garganacl" },
          { name: "Runerigus" },
          { name: "Hatterene" },
          { name: "Polteageist" },
        ],
      },
      {
        id: "participante-10",
        name: "Participante 10",
        wins: 0,
        losses: 0,
        team: [
          { name: "Tyranitar" },
          { name: "Tyrantrum" },
          { name: "Metagross" },
          { name: "Gyarados" },
          { name: "Milotic" },
          { name: "Steelix" },
        ],
      },
      {
        id: "participante-11",
        name: "Participante 11",
        wins: 0,
        losses: 0,
        team: [
          { name: "Ninetales" },
          { name: "Politoed" },
          { name: "Manectric" },
          { name: "Abomasnow" },
          { name: "Heliolisk" },
          { name: "Aurorus" },
        ],
      },
      {
        id: "participante-12",
        name: "Participante 12",
        wins: 0,
        losses: 0,
        team: [
          { name: "Mimikyu" },
          { name: "Toxapex" },
          { name: "Musharna" },
          { name: "Gliscor" },
          { name: "Bellibolt" },
          { name: "Trevenant" },
        ],
      },
    ],

    matches: [],
  },

  // Para agregar un nuevo torneo (por ejemplo, la siguiente regulación
  // o el siguiente año) copia el bloque de arriba, pégalo aquí abajo
  // como un nuevo objeto dentro del arreglo, y cambia sus datos.
  // El menú "Torneos" del navbar y el listado por año se actualizan solos.
];
