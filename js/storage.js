const FAVORITES_KEY = "universityExplorerFavorites";
const LAST_SEARCH_KEY = "universityExplorerLastSearch";

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
      message: "Esta universidad ya esta guardada en favoritos.",
    };
  }

  const updatedFavorites = [country, ...favorites];
  saveJson(FAVORITES_KEY, updatedFavorites);

  return {
    saved: true,
    favorites: updatedFavorites,
    message: "Universidad guardada como favorita.",
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

export function clearLastSearch() {
  localStorage.removeItem(LAST_SEARCH_KEY);
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
