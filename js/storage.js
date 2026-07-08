const FAVORITES_KEY = "countryExplorerFavorites";
const LAST_SEARCH_KEY = "countryExplorerLastSearch";

export function getFavorites() {
  const favorites = readJson(FAVORITES_KEY, []);
  return Array.isArray(favorites) ? favorites : [];
}

export function addFavorite(country) {
  const favorites = getFavorites();
  const alreadySaved = favorites.some((favorite) => favorite.id === country.id);

  if (alreadySaved) {
    return {
      saved: false,
      favorites,
      message: "Este pais ya esta guardado en favoritos.",
    };
  }

  const updatedFavorites = [country, ...favorites];
  saveJson(FAVORITES_KEY, updatedFavorites);

  return {
    saved: true,
    favorites: updatedFavorites,
    message: "Pais guardado como favorito.",
  };
}

export function removeFavorite(countryId) {
  const updatedFavorites = getFavorites().filter(
    (country) => country.id !== countryId
  );

  saveJson(FAVORITES_KEY, updatedFavorites);
  return updatedFavorites;
}

export function getLastSearch() {
  return localStorage.getItem(LAST_SEARCH_KEY) || "";
}

export function saveLastSearch(searchTerm) {
  localStorage.setItem(LAST_SEARCH_KEY, searchTerm.trim());
}

function readJson(key, fallbackValue) {
  try {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : fallbackValue;
  } catch (error) {
    return fallbackValue;
  }
}

function saveJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
