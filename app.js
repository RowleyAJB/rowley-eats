// Rowley Eats — app logic

const PRICE_LABEL = { 1: "£", 2: "££", 3: "£££" };

const CUISINE_ICON = {
  "American": "fa-burger",
  "Italian": "fa-pizza-slice",
  "Italian Deli": "fa-bread-slice",
  "Brunch": "fa-mug-saucer",
  "Pub": "fa-beer-mug-empty"
};

function iconFor(cuisine) {
  return CUISINE_ICON[cuisine] || "fa-utensils";
}

const grid = document.getElementById("grid");

grid.innerHTML = SPOTS.map(spot => `
  <article class="card">
    <div class="card-image">
      ${spot.image
        ? `<img src="${spot.image}" alt="${spot.name}">`
        : `<div class="card-image-placeholder placeholder-${spot.accent}">
             <i class="fa-solid ${iconFor(spot.cuisine)} icon" aria-hidden="true"></i>
           </div>`
      }
      <span class="price-badge">${PRICE_LABEL[spot.price]}</span>
    </div>
    <div class="card-body">
      <div class="card-top">
        <h2 class="card-name">${spot.name}</h2>
        <a class="insta-link" href="${spot.instagram}" target="_blank" rel="noopener" aria-label="${spot.name} on Instagram">
          <i class="fa-brands fa-instagram"></i>
        </a>
      </div>
      <p class="card-meta">${spot.area}, ${spot.city} &middot; ${spot.cuisine}</p>
      <p class="card-order"><span class="label">Order:</span> ${spot.order}</p>
      <p class="card-note">${spot.note}</p>
      <div class="card-tags">
        ${spot.tags.map(t => `<span class="tag">${t}</span>`).join("")}
      </div>
    </div>
  </article>
`).join("");
