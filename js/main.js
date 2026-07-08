import { searchUniversitiesByCountry } from "./api.js";
import {
  addFavorite,
  clearLastSearch,
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

const appState = {
  currentResults: [],
};

document.addEventListener("DOMContentLoaded", initApp);

function initApp() {
  renderFavorites(getFavorites());
  renderResults([]);

  const lastSearch = getLastSearch();
  renderLastSearch(lastSearch);

  elements.searchForm.addEventListener("submit", handleSearchSubmit);
  elements.resultsGrid.addEventListener("click", handleSaveFavorite);
  elements.favoritesGrid.addEventListener("click", handleRemoveFavorite);
  elements.clearLastSearchButton.addEventListener("click", handleClearLastSearch);

  if (lastSearch) {
    setSearchInputValue(lastSearch);
    searchAndRenderUniversities(lastSearch, false);
  }
}

async function handleSearchSubmit(event) {
  event.preventDefault();
  const searchTerm = elements.searchInput.value.trim();
  await searchAndRenderUniversities(searchTerm, true);
}

async function searchAndRenderUniversities(searchTerm, shouldSaveSearch) {
  clearMessage();

  if (!searchTerm) {
    showMessage("Escribe el nombre de un pais antes de buscar.", "warning");
    return;
  }

  setLoading(true);

  try {
    const universities = await searchUniversitiesByCountry(searchTerm);
    appState.currentResults = universities;

    if (shouldSaveSearch) {
      saveLastSearch(searchTerm);
      renderLastSearch(searchTerm);
    }

    renderResults(appState.currentResults, getFavoriteIds());

    if (universities.length === 0) {
      showMessage("No se encontraron universidades para ese pais.", "warning");
      return;
    }

    showMessage("Consulta realizada correctamente.", "success");
  } catch (error) {
    appState.currentResults = [];
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

  const university = appState.currentResults.find(
    (item) => item.id === button.dataset.countryId
  );

  if (!university) {
    showMessage("No se pudo guardar esta universidad.", "error");
    return;
  }

  const result = addFavorite(university);
  renderFavorites(result.favorites);
  renderResults(appState.currentResults, getFavoriteIds());
  showMessage(result.message, result.saved ? "success" : "warning");
}

function handleRemoveFavorite(event) {
  const button = event.target.closest("[data-action='remove-favorite']");

  if (!button) {
    return;
  }

  const updatedFavorites = removeFavorite(button.dataset.countryId);
  renderFavorites(updatedFavorites);
  renderResults(appState.currentResults, getFavoriteIds());
  showMessage("Favorito eliminado correctamente.", "success");
}

function handleClearLastSearch() {
  clearLastSearch();
  renderLastSearch("");
  setSearchInputValue("");
  showMessage("Ultima consulta eliminada correctamente.", "success");
}

function getFavoriteIds() {
  return getFavorites().map((university) => university.id);
}
