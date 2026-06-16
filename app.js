// Rowley Eats — app logic

const PRICE_LABEL = { 1: "£", 2: "££", 3: "£££" };
const NEW_BADGE_DAYS = 30;

const CUISINE_ICON = {
  "American": "fa-burger",
  "Italian": "fa-pizza-slice",
  "Italian Deli": "fa-bread-slice",
  "Brunch": "fa-mug-saucer",
  "Pub": "fa-beer-mug-empty",
  "Mexican": "fa-pepper-hot",
  "Cafe": "fa-mug-saucer",
  "Bakery": "fa-bread-slice"
};

function iconFor(cuisine) {
  return CUISINE_ICON[cuisine] || "fa-utensils";
}

function isNew(dateAdded) {
  if (!dateAdded) return false;
  const added = new Date(dateAdded);
  const now = new Date();
  const diffDays = (now - added) / (1000 * 60 * 60 * 24);
  return diffDays >= 0 && diffDays <= NEW_BADGE_DAYS;
}

let activeCity = "all";
let activeCuisine = "all";
let activeTakeaway = false;
let sortOrder = "newest"; // "newest" | "oldest"

const grid = document.getElementById("grid");
const filters = document.getElementById("filters");

// --- Build filter chips dynamically from data ---
function buildChips() {
  // City chips
  const cities = [...new Set(SPOTS.map(s => s.city))].sort();
  cities.forEach(c => {
    const btn = document.createElement("button");
    btn.className = "chip";
    btn.dataset.filterType = "city";
    btn.dataset.value = c;
    btn.textContent = c;
    filters.appendChild(btn);
  });

  // Divider
  addDivider();

  // Cuisine chips
  const cuisines = [...new Set(SPOTS.map(s => s.cuisine))].sort();
  const allCuisineBtn = makeChip("All food", "cuisine", "all", true);
  filters.appendChild(allCuisineBtn);
  cuisines.forEach(c => filters.appendChild(makeChip(c, "cuisine", c)));

  // Divider
  addDivider();

  // Takeaway chip
  const takeawayBtn = document.createElement("button");
  takeawayBtn.className = "chip";
  takeawayBtn.id = "takeawayChip";
  takeawayBtn.innerHTML = `<i class="fa-solid fa-bag-shopping" style="font-size:11px;"></i> Takeaway`;
  takeawayBtn.addEventListener("click", () => {
    activeTakeaway = !activeTakeaway;
    takeawayBtn.classList.toggle("active", activeTakeaway);
    render();
  });
  filters.appendChild(takeawayBtn);

  // Sort toggle pushed to the right
  const sortBtn = document.createElement("button");
  sortBtn.className = "chip-sort";
  sortBtn.id = "sortBtn";
  sortBtn.innerHTML = `<i class="fa-solid fa-arrow-down-wide-short"></i> Newest first`;
  sortBtn.addEventListener("click", () => {
    sortOrder = sortOrder === "newest" ? "oldest" : "newest";
    sortBtn.innerHTML = `<i class="fa-solid fa-arrow-down-wide-short"></i> ${sortOrder === "newest" ? "Newest first" : "Oldest first"}`;
    render();
  });
  filters.appendChild(sortBtn);
}

function makeChip(label, type, value, active = false) {
  const btn = document.createElement("button");
  btn.className = "chip" + (active ? " active" : "");
  btn.dataset.filterType = type;
  btn.dataset.value = value;
  btn.textContent = label;
  return btn;
}

function addDivider() {
  const d = document.createElement("span");
  d.className = "divider";
  filters.appendChild(d);
}

// --- Filtering & sorting ---
function getFiltered() {
  let list = SPOTS.filter(s =>
    (activeCity === "all" || s.city === activeCity) &&
    (activeCuisine === "all" || s.cuisine === activeCuisine) &&
    (!activeTakeaway || s.takeaway === true)
  );

  list = list.slice().sort((a, b) => {
    const da = new Date(a.dateAdded || "2000-01-01");
    const db = new Date(b.dateAdded || "2000-01-01");
    return sortOrder === "newest" ? db - da : da - db;
  });

  return list;
}

// --- Render cards ---
function render() {
  const filtered = getFiltered();

  if (!filtered.length) {
    grid.innerHTML = `<p class="no-results">Nothing matches those filters, try a different combination.</p>`;
    return;
  }

  grid.innerHTML = filtered.map(spot => `
    <article class="card">
      <div class="card-image">
        ${spot.image
          ? `<img src="${spot.image}" alt="${spot.name}">`
          : `<div class="card-image-placeholder placeholder-${spot.accent}">
               <i class="fa-solid ${iconFor(spot.cuisine)} icon" aria-hidden="true"></i>
             </div>`
        }
        <span class="price-badge">${PRICE_LABEL[spot.price]}</span>
        ${isNew(spot.dateAdded) ? `<span class="new-badge">New</span>` : ""}
      </div>
      <div class="card-body">
        <div class="card-top">
          <h2 class="card-name">${spot.name}</h2>
          <a class="insta-link" href="${spot.instagram}" target="_blank" rel="noopener" aria-label="${spot.name} on Instagram">
            <i class="fa-brands fa-instagram"></i>
          </a>
        </div>
        <p class="card-meta">${spot.area}, ${spot.city} &middot; ${spot.cuisine}</p>
        <p class="card-had"><span class="label">My go-to:</span> ${spot.had}</p>
        <p class="card-note">${spot.note}</p>
        <div class="card-tags">
          ${spot.tags.map(t => `<span class="tag">${t}</span>`).join("")}
          ${spot.takeaway ? `<span class="tag tag-takeaway"><i class="fa-solid fa-bag-shopping" aria-hidden="true"></i> Takeaway</span>` : ""}
        </div>
      </div>
    </article>
  `).join("");
}

// --- City/cuisine chip click handling ---
filters.addEventListener("click", e => {
  const chip = e.target.closest(".chip[data-filter-type]");
  if (!chip) return;

  const type = chip.dataset.filterType;
  const value = chip.dataset.value;

  filters.querySelectorAll(`.chip[data-filter-type="${type}"]`).forEach(c => c.classList.remove("active"));
  chip.classList.add("active");

  if (type === "city") activeCity = value;
  if (type === "cuisine") activeCuisine = value;

  render();
});

// --- Init ---
buildChips();
render();
