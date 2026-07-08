const API_BASE_URL = "https://countries.dev";
const COUNTRY_FIELDS = [
  "name",
  "capital",
  "region",
  "subregion",
  "population",
  "area",
  "currencies",
  "languages",
  "flag",
  "flags",
  "alpha2Code",
  "alpha3Code",
].join(",");

export async function searchCountriesByName(countryName) {
  const searchTerm = countryName.trim();

  if (!searchTerm) {
    throw new Error("Escribe el nombre de un pais para buscar.");
  }

  const url = `${API_BASE_URL}/name/${encodeURIComponent(
    searchTerm
  )}?fields=${COUNTRY_FIELDS}`;

  let response;

  try {
    response = await fetch(url);
  } catch (error) {
    throw new Error("La API no responde. Revisa tu conexion e intenta de nuevo.");
  }

  if (response.status === 404) {
    return [];
  }

  if (!response.ok) {
    throw new Error("Existe un error al cargar datos desde la API.");
  }

  const data = await response.json();
  return Array.isArray(data) ? data.map(normalizeCountry) : [];
}

function normalizeCountry(country) {
  const name = country.name || "Sin nombre";
  const id = country.alpha3Code || country.alpha2Code || name;

  return {
    id,
    name,
    flag:
      country.flags?.svg ||
      country.flags?.png ||
      (country.flag?.startsWith("http") ? country.flag : ""),
    capital: country.capital || "No disponible",
    region: country.region || "No disponible",
    subregion: country.subregion || "No disponible",
    population: country.population || 0,
    area: country.area || 0,
    currencies: Array.isArray(country.currencies) ? country.currencies : [],
    languages: Array.isArray(country.languages) ? country.languages : [],
    alpha2Code: country.alpha2Code || "",
    alpha3Code: country.alpha3Code || "",
  };
}
