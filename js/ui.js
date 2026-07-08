export const elements = {
  searchForm: document.querySelector("#search-form"),
  searchInput: document.querySelector("#country-input"),
  searchButton: document.querySelector("#search-button"),
  message: document.querySelector("#message"),
  lastSearch: document.querySelector("#last-search"),
  resultsGrid: document.querySelector("#results-grid"),
  resultsCounter: document.querySelector("#results-counter"),
  favoritesGrid: document.querySelector("#favorites-grid"),
  favoritesCounter: document.querySelector("#favorites-counter"),
};

const numberFormatter = new Intl.NumberFormat("es-CO");

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
}

export function renderResults(countries, favoriteIds = []) {
  elements.resultsGrid.innerHTML = "";
  elements.resultsCounter.textContent = formatCounter(countries.length, "pais", "paises");

  if (countries.length === 0) {
    elements.resultsGrid.appendChild(createEmptyState("No hay resultados para mostrar."));
    return;
  }

  countries.forEach((country) => {
    const isFavorite = favoriteIds.includes(country.id);
    const card = createCountryCard(country, {
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

  favorites.forEach((country) => {
    const card = createCountryCard(country, {
      action: "remove-favorite",
      buttonText: "Eliminar favorito",
      buttonClass: "button--danger",
    });

    elements.favoritesGrid.appendChild(card);
  });
}

function createCountryCard(country, buttonOptions) {
  const card = document.createElement("article");
  card.className = "country-card";

  const header = document.createElement("div");
  header.className = "country-card__header";

  const flag = createFlagElement(country);

  const titleGroup = document.createElement("div");
  titleGroup.className = "country-card__title";

  const name = document.createElement("h3");
  name.textContent = country.name;

  const code = document.createElement("span");
  code.className = "country-card__code";
  code.textContent = country.alpha3Code || country.alpha2Code || "N/D";

  titleGroup.append(name, code);
  header.append(flag, titleGroup);

  const dataList = document.createElement("dl");
  dataList.className = "country-card__data";

  addDataItem(dataList, "Capital", country.capital);
  addDataItem(dataList, "Region", country.region);
  addDataItem(dataList, "Subregion", country.subregion);
  addDataItem(dataList, "Poblacion", formatNumber(country.population));
  addDataItem(dataList, "Area", `${formatNumber(country.area)} km2`);
  addDataItem(dataList, "Moneda", formatCurrencies(country.currencies));
  addDataItem(dataList, "Idioma", formatLanguages(country.languages));

  const button = document.createElement("button");
  button.className = `button ${buttonOptions.buttonClass}`;
  button.type = "button";
  button.textContent = buttonOptions.buttonText;
  button.dataset.action = buttonOptions.action;
  button.dataset.countryId = country.id;

  card.append(header, dataList, button);
  return card;
}

function addDataItem(dataList, label, value) {
  const wrapper = document.createElement("div");
  wrapper.className = "country-card__item";

  const term = document.createElement("dt");
  term.textContent = label;

  const description = document.createElement("dd");
  description.textContent = value || "No disponible";

  wrapper.append(term, description);
  dataList.appendChild(wrapper);
}

function createFlagElement(country) {
  if (!country.flag) {
    return createFlagPlaceholder(country);
  }

  const flag = document.createElement("img");
  flag.className = "country-card__flag";
  flag.src = country.flag;
  flag.alt = `Bandera de ${country.name}`;
  flag.loading = "lazy";
  flag.addEventListener("error", () => {
    flag.replaceWith(createFlagPlaceholder(country));
  });

  return flag;
}

function createFlagPlaceholder(country) {
  const placeholder = document.createElement("div");
  placeholder.className = "country-card__flag country-card__flag--placeholder";
  placeholder.textContent = country.alpha2Code || "N/D";
  placeholder.setAttribute("role", "img");
  placeholder.setAttribute("aria-label", `Bandera no disponible para ${country.name}`);
  return placeholder;
}

function createEmptyState(text) {
  const emptyState = document.createElement("p");
  emptyState.className = "empty-state";
  emptyState.textContent = text;
  return emptyState;
}

function formatNumber(value) {
  return value ? numberFormatter.format(value) : "No disponible";
}

function formatCurrencies(currencies) {
  if (!currencies.length) {
    return "No disponible";
  }

  return currencies
    .map((currency) => {
      const symbol = currency.symbol ? ` (${currency.symbol})` : "";
      return `${currency.name || currency.code || "No disponible"}${symbol}`;
    })
    .join(", ");
}

function formatLanguages(languages) {
  if (!languages.length) {
    return "No disponible";
  }

  return languages
    .map((language) => language.name || language.nativeName)
    .filter(Boolean)
    .join(", ");
}

function formatCounter(amount, singular, plural) {
  return `${amount} ${amount === 1 ? singular : plural}`;
}
