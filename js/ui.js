export const elements = {
  searchForm: document.querySelector("#search-form"),
  searchInput: document.querySelector("#country-input"),
  searchButton: document.querySelector("#search-button"),
  message: document.querySelector("#message"),
  lastSearch: document.querySelector("#last-search"),
  clearLastSearchButton: document.querySelector("#clear-last-search-button"),
  resultsGrid: document.querySelector("#results-grid"),
  resultsCounter: document.querySelector("#results-counter"),
  favoritesGrid: document.querySelector("#favorites-grid"),
  favoritesCounter: document.querySelector("#favorites-counter"),
};

export function setLoading(isLoading) {
  elements.searchButton.disabled = isLoading;
  elements.searchButton.textContent = isLoading ? "Buscando..." : "Buscar";
}

export function showMessage(text, type = "info") {
  elements.message.textContent = text;
  elements.message.className = `message message--${type}`;
  elements.message.hidden = false;
}

export function clearMessage() {
  elements.message.textContent = "";
  elements.message.hidden = true;
}

export function setSearchInputValue(value) {
  elements.searchInput.value = value;
}

export function renderLastSearch(searchTerm) {
  elements.lastSearch.textContent = searchTerm
    ? searchTerm
    : "Todavia no hay consultas guardadas.";
  elements.clearLastSearchButton.disabled = !searchTerm;
}

export function renderResults(universities, favoriteIds = []) {
  elements.resultsGrid.innerHTML = "";
  elements.resultsCounter.textContent = formatCounter(
    universities.length,
    "universidad",
    "universidades"
  );

  if (universities.length === 0) {
    elements.resultsGrid.appendChild(createEmptyState("No hay resultados para mostrar."));
    return;
  }

  universities.forEach((university) => {
    const isFavorite = favoriteIds.includes(university.id);
    const card = createUniversityCard(university, {
      action: "save-favorite",
      buttonText: isFavorite ? "Guardado en favoritos" : "Guardar favorito",
      buttonClass: isFavorite ? "button--secondary" : "button--primary",
    });

    elements.resultsGrid.appendChild(card);
  });
}

export function renderFavorites(favorites) {
  elements.favoritesGrid.innerHTML = "";
  elements.favoritesCounter.textContent = formatCounter(
    favorites.length,
    "favorito",
    "favoritos"
  );

  if (favorites.length === 0) {
    elements.favoritesGrid.appendChild(createEmptyState("No hay favoritos guardados."));
    return;
  }

  favorites.forEach((university) => {
    const card = createUniversityCard(university, {
      action: "remove-favorite",
      buttonText: "Eliminar favorito",
      buttonClass: "button--danger",
    });

    elements.favoritesGrid.appendChild(card);
  });
}

function createUniversityCard(university, buttonOptions) {
  const card = document.createElement("article");
  card.className = "university-card";

  const header = document.createElement("div");
  header.className = "university-card__header";

  const badge = createUniversityBadge(university);

  const titleGroup = document.createElement("div");
  titleGroup.className = "university-card__title";

  const name = document.createElement("h3");
  name.textContent = university.name;

  const code = document.createElement("span");
  code.className = "university-card__code";
  code.textContent = university.countryCode;

  titleGroup.append(name, code);
  header.append(badge, titleGroup);

  const dataList = document.createElement("dl");
  dataList.className = "university-card__data";

  addDataItem(dataList, "Pais", university.country);
  addDataItem(dataList, "Provincia", university.stateProvince);
  addDataItem(dataList, "Dominio", formatList(university.domains));
  addLinkItem(dataList, "Sitio web", university.firstWebPage);

  const button = document.createElement("button");
  button.className = `button ${buttonOptions.buttonClass}`;
  button.type = "button";
  button.textContent = buttonOptions.buttonText;
  button.dataset.action = buttonOptions.action;
  button.dataset.countryId = university.id;

  card.append(header, dataList, button);
  return card;
}

function addDataItem(dataList, label, value) {
  const wrapper = document.createElement("div");
  wrapper.className = "university-card__item";

  const term = document.createElement("dt");
  term.textContent = label;

  const description = document.createElement("dd");
  description.textContent = value || "No disponible";

  wrapper.append(term, description);
  dataList.appendChild(wrapper);
}

function addLinkItem(dataList, label, url) {
  const wrapper = document.createElement("div");
  wrapper.className = "university-card__item";

  const term = document.createElement("dt");
  term.textContent = label;

  const description = document.createElement("dd");

  if (url) {
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = url;
    description.appendChild(link);
  } else {
    description.textContent = "No disponible";
  }

  wrapper.append(term, description);
  dataList.appendChild(wrapper);
}

function createUniversityBadge(university) {
  const badge = document.createElement("div");
  badge.className = "university-card__badge";
  badge.textContent = getInitials(university.name);
  badge.setAttribute("aria-hidden", "true");
  return badge;
}

function createEmptyState(text) {
  const emptyState = document.createElement("p");
  emptyState.className = "empty-state";
  emptyState.textContent = text;
  return emptyState;
}

function formatList(items) {
  if (!items.length) {
    return "No disponible";
  }

  return items.join(", ");
}

function getInitials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function formatCounter(amount, singular, plural) {
  return `${amount} ${amount === 1 ? singular : plural}`;
}
