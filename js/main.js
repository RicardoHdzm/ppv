/* ==============================================================
   RICHAMPIONS CUP — lógica de renderizado
   ============================================================== */

/* ---------- Utilidades ---------- */

function getParam(key) {
  return new URLSearchParams(window.location.search).get(key);
}

// Convierte el nombre de un Pokémon al formato de slug que usa
// el CDN de sprites de Pokémon Showdown, para mostrar un sprite
// por defecto cuando no se indica una imagen propia.
function showdownSlug(name) {
  return name
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // quita acentos
    .replace(/[.'’]/g, "")
    .replace(/[:]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-{2,}/g, "-");
}

function spriteUrl(mon) {
  if (mon.sprite) return mon.sprite;
  return `https://play.pokemonshowdown.com/sprites/home/${showdownSlug(mon.name)}.png`;
}

function statusLabel(status) {
  return { live: "En curso", upcoming: "Próximo", finished: "Finalizado" }[status] || status;
}

/* ---------- Navbar: menú de torneos por año ---------- */

function buildTournamentsDropdown() {
  const panel = document.querySelector("[data-tournaments-panel]");
  if (!panel) return;

  const byYear = {};
  TOURNAMENTS.forEach((t) => {
    (byYear[t.year] = byYear[t.year] || []).push(t);
  });

  const years = Object.keys(byYear).sort((a, b) => b - a);
  panel.innerHTML = years
    .map((year) => {
      const items = byYear[year]
        .map(
          (t) => `
          <a href="torneo.html?t=${encodeURIComponent(t.slug)}">
            <span>${t.regulation}</span>
            <span class="status-pill ${t.status === "live" ? "live" : ""}">${statusLabel(t.status)}</span>
          </a>`
        )
        .join("");
      return `<div class="dropdown-year">${year}</div>${items}`;
    })
    .join("");

  if (years.length === 0) {
    panel.innerHTML = `<div class="dropdown-year">Aún no hay torneos publicados</div>`;
  }
}

function initMobileNav() {
  const toggle = document.querySelector("[data-nav-toggle]");
  const links = document.querySelector("[data-nav-links]");
  if (!toggle || !links) return;
  toggle.addEventListener("click", () => {
    links.classList.toggle("mobile-open");
  });

  const closeAllDropdowns = () => {
    document.querySelectorAll(".dropdown.open").forEach((d) => d.classList.remove("open"));
  };

  document.querySelectorAll(".dropdown > button").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const dropdown = btn.closest(".dropdown");
      const wasOpen = dropdown.classList.contains("open");
      closeAllDropdowns();
      if (!wasOpen) dropdown.classList.add("open");
    });
  });

  // Cierra el desglose si se hace clic en cualquier otro lugar de la página.
  document.addEventListener("click", (e) => {
    document.querySelectorAll(".dropdown.open").forEach((d) => {
      if (!d.contains(e.target)) d.classList.remove("open");
    });
  });

  // Cierra el desglose con la tecla Escape.
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAllDropdowns();
  });

  // Cierra el desglose apenas se elige un torneo de la lista.
  document.querySelectorAll(".dropdown-panel").forEach((panel) => {
    panel.addEventListener("click", (e) => {
      if (e.target.closest("a")) closeAllDropdowns();
    });
  });
}

/* ---------- Página de inicio: ticker con el torneo activo ---------- */

function renderActiveTicker() {
  const link = document.querySelector("[data-ticker-link]");
  if (!link) return;
  const live = TOURNAMENTS.find((t) => t.status === "live") || TOURNAMENTS[0];
  if (!live) return;
  link.href = `torneo.html?t=${encodeURIComponent(live.slug)}`;
}

/* ---------- Página de torneo ---------- */

function computeMatchResult(match) {
  let w1 = 0, w2 = 0;
  match.games.forEach((g) => {
    if (g.winner === match.player1) w1++;
    else if (g.winner === match.player2) w2++;
  });
  const winnerId = w1 > w2 ? match.player1 : w2 > w1 ? match.player2 : null;
  return { w1, w2, winnerId };
}

function renderTrainerCard(p) {
  const teamHtml = p.team.length
    ? p.team
        .map(
          (mon) => `
      <div class="mon">
        <div class="mon-sprite">
          <img src="${spriteUrl(mon)}" alt="${mon.name}" loading="lazy"
               onerror="this.parentElement.innerHTML='<span style=\\'font-family:var(--font-mono);font-size:9px;color:var(--text-faint);text-align:center;padding:2px\\'>${mon.name}</span>'">
        </div>
        <div class="mon-name">${mon.name}</div>
      </div>`
        )
        .join("")
    : `<div class="team-empty">Equipo aún no registrado</div>`;

  return `
    <div class="trainer-card">
      <div class="trainer-card-head">
        <div class="trainer-name">${p.name}</div>
        <div class="record record-badge">
          <span class="w">${p.wins}</span><span class="sep">-</span><span class="l">${p.losses}</span>
        </div>
      </div>
      <div class="team-row">${teamHtml}</div>
    </div>`;
}

function renderGameChip(game, index, match) {
  const win = game.winner === match.player1;
  const label = `Partida ${index + 1}`;
  const link = game.youtubeUrl
    ? `<a href="${game.youtubeUrl}" target="_blank" rel="noopener noreferrer">Ver &#9654;</a>`
    : "";
  return `
    <div class="game-chip">
      <span class="dot ${win ? "win" : "loss"}"></span>
      <span>${label}</span>
      ${link}
    </div>`;
}

function renderMatchCard(match, participantsById) {
  const p1 = participantsById[match.player1];
  const p2 = participantsById[match.player2];
  if (!p1 || !p2) return "";

  const { w1, w2, winnerId } = computeMatchResult(match);
  const gamesHtml = match.games.map((g, i) => renderGameChip(g, i, match)).join("");

  return `
    <div class="match-card">
      <div class="match-top">
        <div class="match-player ${winnerId === p1.id ? "winner" : ""}">
          <span class="match-player-name">${p1.name}</span>
          <span class="record"><span class="w">${p1.wins}</span><span class="sep">-</span><span class="l">${p1.losses}</span></span>
        </div>
        <div class="match-score">
          <span class="vs-label">Resultado</span>
          ${w1}&ndash;${w2}
        </div>
        <div class="match-player right ${winnerId === p2.id ? "winner" : ""}">
          <span class="match-player-name">${p2.name}</span>
          <span class="record"><span class="w">${p2.wins}</span><span class="sep">-</span><span class="l">${p2.losses}</span></span>
        </div>
      </div>
      <div class="games-row">${gamesHtml}</div>
    </div>`;
}

function renderRegistrationBlock(tournament) {
  if (!tournament.teamSheetFormUrl) return "";

  const deadline = tournament.registrationDeadline ? new Date(tournament.registrationDeadline) : null;
  const hasValidDeadline = deadline && !isNaN(deadline.getTime());
  const isClosed = hasValidDeadline && Date.now() >= deadline.getTime();

  const countdownHtml = hasValidDeadline
    ? `
      <div class="countdown-panel" data-registration-countdown data-deadline="${tournament.registrationDeadline}">
        <div class="countdown-label" data-countdown-label>Cierre de inscripciones</div>
        <div class="countdown-timer" data-countdown-timer>
          <div class="countdown-unit"><span class="value" data-cd="d">00</span><span class="unit">días</span></div>
          <div class="countdown-unit"><span class="value" data-cd="h">00</span><span class="unit">hrs</span></div>
          <div class="countdown-unit"><span class="value" data-cd="m">00</span><span class="unit">min</span></div>
          <div class="countdown-unit"><span class="value" data-cd="s">00</span><span class="unit">seg</span></div>
        </div>
      </div>`
    : "";

  const buttonHtml =
    !hasValidDeadline || !isClosed
      ? `<a class="btn btn-primary" style="margin-top:18px" data-registration-button href="${tournament.teamSheetFormUrl}" target="_blank" rel="noopener noreferrer">Subir captura de mi equipo</a>`
      : "";

  return countdownHtml + buttonHtml;
}

function startRegistrationCountdown() {
  const panel = document.querySelector("[data-registration-countdown]");
  if (!panel) return;

  const deadline = new Date(panel.dataset.deadline).getTime();
  const label = panel.querySelector("[data-countdown-label]");
  const timer = panel.querySelector("[data-countdown-timer]");
  const button = document.querySelector("[data-registration-button]");
  const pad = (n) => String(n).padStart(2, "0");

  const tick = () => {
    const diff = deadline - Date.now();
    if (diff <= 0) {
      clearInterval(intervalId);
      if (label) label.textContent = "Inscripciones cerradas";
      if (timer) timer.style.display = "none";
      if (button) button.remove();
      return;
    }
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);
    panel.querySelector('[data-cd="d"]').textContent = pad(d);
    panel.querySelector('[data-cd="h"]').textContent = pad(h);
    panel.querySelector('[data-cd="m"]').textContent = pad(m);
    panel.querySelector('[data-cd="s"]').textContent = pad(s);
  };

  tick();
  const intervalId = setInterval(tick, 1000);
}

function renderTournamentPage() {
  const root = document.querySelector("[data-tournament-root]");
  if (!root) return;

  const slug = getParam("t");
  const tournament = TOURNAMENTS.find((t) => t.slug === slug) || TOURNAMENTS[0];

  if (!tournament) {
    root.innerHTML = `<div class="container"><div class="empty-state" style="margin:60px 0">Todavía no hay torneos publicados. Agrégalos en js/data.js.</div></div>`;
    return;
  }

  document.title = `${tournament.name} · RICHAMPIONS PKMN CUP`;

  const participantsById = {};
  tournament.participants.forEach((p) => (participantsById[p.id] = p));

  const roundsInOrder = [];
  tournament.matches.forEach((m) => {
    if (!roundsInOrder.includes(m.round)) roundsInOrder.push(m.round);
  });

  const matchesHtml = roundsInOrder
    .map((round) => {
      const cards = tournament.matches
        .filter((m) => m.round === round)
        .map((m) => renderMatchCard(m, participantsById))
        .join("");
      return `
        <div class="round-group">
          <div class="round-title">${round}</div>
          ${cards}
        </div>`;
    })
    .join("");

  root.innerHTML = `
    <header class="t-header">
      <div class="container">
        <span class="eyebrow">RICHAMPIONS PKMN CUP &middot; ${tournament.year}</span>
        <h1>${tournament.regulation}</h1>
        <div class="t-meta">
          <div class="t-meta-item">
            <span class="k">Estado</span>
            <span class="v">${statusLabel(tournament.status)}</span>
          </div>
          <div class="t-meta-item">
            <span class="k">Formato</span>
            <span class="v">${tournament.format}</span>
          </div>
          <div class="t-meta-item">
            <span class="k">Fecha</span>
            <span class="v">${tournament.dateRange}</span>
          </div>
          <div class="t-meta-item">
            <span class="k">Participantes</span>
            <span class="v">${tournament.participants.length}</span>
          </div>
        </div>
      </div>
    </header>

    <section class="container">
      <p style="max-width:64ch;color:var(--text-muted);margin-top:28px">${tournament.description}</p>

      <div class="section-heading">
        <h2>Reglas del torneo</h2>
      </div>
      <div class="rules-panel">
        <ul class="rules-list">
          <li>Sistema <strong>suizo</strong>: los emparejamientos de cada ronda se arman según el desempeño hasta ese momento, sin eliminación directa.</li>
          <li>Cada enfrentamiento se juega a <strong>mejor de 3 (Bo3)</strong>.</li>
          <li>El torneo se juega bajo modalidad <strong>Open Team Sheets</strong>: antes de cada ronda, los equipos de ambos entrenadores se comparten públicamente.</li>
          <li>Todas las partidas se transmiten en vivo por <strong>Discord</strong>, y las repeticiones quedan después en <strong>YouTube</strong>.</li>
        </ul>
        ${renderRegistrationBlock(tournament)}
      </div>

      <div class="section-heading">
        <h2>Participantes</h2>
        <span class="count">${tournament.participants.length} entrenadores</span>
      </div>
      <div class="participants-grid">
        ${
          tournament.participants.length
            ? tournament.participants.map(renderTrainerCard).join("")
            : `<div class="empty-state">Aún no hay participantes registrados</div>`
        }
      </div>

      <div class="section-heading">
        <h2>Enfrentamientos</h2>
        <span class="count">${tournament.matches.length} partidos</span>
      </div>
      ${
        tournament.matches.length
          ? matchesHtml
          : `<div class="empty-state" style="margin-bottom:60px">Aún no hay enfrentamientos registrados</div>`
      }
    </section>
  `;
}

/* ---------- Init ---------- */

/* ---------- Video de fondo del hero: forzar reproducción y diagnosticar ---------- */

function initHeroVideo() {
  const video = document.getElementById("heroVideo");
  if (!video) return;

  video.muted = true; // por si el navegador ignora el atributo HTML

  video.addEventListener("error", () => {
    console.warn(
      "[Rick Cup] El video del hero no cargó. Verifica que el archivo exista " +
      "exactamente en assets/videos/pkmn.mp4 (mismo nombre y mayúsculas/minúsculas) " +
      "y que sea un .mp4 con códec H.264."
    );
  });

  const tryPlay = () => {
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn("[Rick Cup] El navegador bloqueó la reproducción automática:", err);
      });
    }
  };

  if (video.readyState >= 2) {
    tryPlay();
  } else {
    video.addEventListener("loadeddata", tryPlay, { once: true });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  buildTournamentsDropdown();
  initMobileNav();
  renderActiveTicker();
  renderTournamentPage();
  startRegistrationCountdown();
  initHeroVideo();
});
