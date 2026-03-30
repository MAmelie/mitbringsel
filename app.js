const filterBar = document.getElementById("filterBar");
const linksGrid = document.getElementById("linksGrid");
const themeToggle = document.getElementById("themeToggle");

let activeTag = "all";
let theme = localStorage.getItem("mitbringsel-theme") || "day";

const uniqueTags = [...new Set(links.map((item) => item.tag))].sort();
const tags = ["all", ...uniqueTags];

function createTagButtons() {
  filterBar.innerHTML = "";
  tags.forEach((tag) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `tag-btn${tag === activeTag ? " active" : ""}`;
    button.textContent = tag === "all" ? "all" : `#${tag}`;
    button.setAttribute("aria-pressed", String(tag === activeTag));
    button.addEventListener("click", () => {
      activeTag = tag;
      createTagButtons();
      renderLinks();
    });
    filterBar.appendChild(button);
  });

  const note = document.createElement("span");
  note.className = "filter-note";
  // note.textContent = "leaf-sorted";
  filterBar.appendChild(note);
}

function renderLinks() {
  linksGrid.innerHTML = "";
  const visible = activeTag === "all" ? links : links.filter((item) => item.tag === activeTag);

  if (!visible.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "No links in this tag yet. Try another one.";
    linksGrid.appendChild(empty);
    return;
  }

  visible.forEach((item) => {
    const card = document.createElement("article");
    card.className = "link-card";
    card.innerHTML = `
      <div class="card-top">
        <h2 class="card-title">${item.title}</h2>
        <span class="card-tag">#${item.tag}</span>
      </div>
      <p class="card-note">${item.note}</p>
      <div class="card-meta">
        <span class="card-source"><span class="leaf-divider">✿</span>source: ${item.source}</span>
        <a class="card-link" href="${item.url}" target="_blank" rel="noopener noreferrer">
          visit link \u2192
        </a>
      </div>
    `;
    linksGrid.appendChild(card);
  });
}

function applyTheme(nextTheme) {
  theme = nextTheme;
  document.body.setAttribute("data-theme", theme === "night" ? "night" : "day");
  themeToggle.textContent = theme === "night" ? "day mode" : "night mode";
  localStorage.setItem("mitbringsel-theme", theme);
}

themeToggle.addEventListener("click", () => {
  applyTheme(theme === "night" ? "day" : "night");
});

applyTheme(theme);
createTagButtons();
renderLinks();
