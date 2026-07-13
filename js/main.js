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
  return `https://play.pokemonshowdown.com/sprites/gen5/${showdownSlug(mon.name)}.png`;
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

  document.querySelectorAll(".dropdown > button").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      btn.closest(".dropdown").classList.toggle("open");
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

function renderTournamentPage() {
  const root = document.querySelector("[data-tournament-root]");
  if (!root) return;

  const slug = getParam("t");
  const tournament = TOURNAMENTS.find((t) => t.slug === slug) || TOURNAMENTS[0];

  if (!tournament) {
    root.innerHTML = `<div class="container"><div class="empty-state" style="margin:60px 0">Todavía no hay torneos publicados. Agrégalos en js/data.js.</div></div>`;
    return;
  }

  document.title = `${tournament.name} · Richampions Cup`;

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
        <span class="eyebrow">Richampions Cup &middot; ${tournament.year}</span>
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

document.addEventListener("DOMContentLoaded", () => {
  buildTournamentsDropdown();
  initMobileNav();
  renderActiveTicker();
  renderTournamentPage();
});
