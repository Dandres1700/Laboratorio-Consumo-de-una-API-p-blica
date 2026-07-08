import { searchCountriesByName } from "./api.js";
import {
  addFavorite,
  getFavorites,
  getLastSearch,
  removeFavorite,
  saveLastSearch,
} from "./storage.js";
import {
  clearMessage,
  elements,
  renderFavorites,
  renderLastSearch,
  renderResults,
  setLoading,
  setSearchInputValue,
  showMessage,
} from "./ui.js";

let currentResults = [];

document.addEventListener("DOMContentLoaded", initApp);

function initApp() {
  renderFavorites(getFavorites());
  renderResults([]);

  const lastSearch = getLastSearch();
  renderLastSearch(lastSearch);

  elements.searchForm.addEventListener("submit", handleSearchSubmit);
  elements.resultsGrid.addEventListener("click", handleSaveFavorite);
  elements.favoritesGrid.addEventListener("click", handleRemoveFavorite);

  if (lastSearch) {
    setSearchInputValue(lastSearch);
    searchAndRenderCountries(lastSearch, false);
  }
}

async function handleSearchSubmit(event) {
  event.preventDefault();
  const searchTerm = elements.searchInput.value.trim();
  await searchAndRenderCountries(searchTerm, true);
}

async function searchAndRenderCountries(searchTerm, shouldSaveSearch) {
  clearMessage();

  if (!searchTerm) {
    showMessage("Escribe el nombre de un pais antes de buscar.", "warning");
    return;
  }

  setLoading(true);

  try {
    const countries = await searchCountriesByName(searchTerm);
    currentResults = countries;

    if (shouldSaveSearch) {
      saveLastSearch(searchTerm);
      renderLastSearch(searchTerm);
    }

    renderResults(currentResults, getFavoriteIds());

    if (countries.length === 0) {
      showMessage("No se encontraron resultados para esa busqueda.", "warning");
      return;
    }

    showMessage("Consulta realizada correctamente.", "success");
  } catch (error) {
    currentResults = [];
    renderResults([]);
    showMessage(error.message || "Existe un error al cargar datos.", "error");
  } finally {
    setLoading(false);
  }
}

function handleSaveFavorite(event) {
  const button = event.target.closest("[data-action='save-favorite']");

  if (!button) {
    return;
  }

  const country = currentResults.find((item) => item.id === button.dataset.countryId);

  if (!country) {
    showMessage("No se pudo guardar este pais.", "error");
    return;
  }

  const result = addFavorite(country);
  renderFavorites(result.favorites);
  renderResults(currentResults, getFavoriteIds());
  showMessage(result.message, result.saved ? "success" : "warning");
}

function handleRemoveFavorite(event) {
  const button = event.target.closest("[data-action='remove-favorite']");

  if (!button) {
    return;
  }

  const updatedFavorites = removeFavorite(button.dataset.countryId);
  renderFavorites(updatedFavorites);
  renderResults(currentResults, getFavoriteIds());
  showMessage("Favorito eliminado correctamente.", "success");
}

function getFavoriteIds() {
  return getFavorites().map((country) => country.id);
}
