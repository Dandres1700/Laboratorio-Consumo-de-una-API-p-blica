const UNIVERSITIES_DATA_URL =
  "https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json";

const COUNTRY_ALIASES = {
  alemania: "germany",
  brasil: "brazil",
  canada: "canada",
  espana: "spain",
  "estados unidos": "united states",
  eeuu: "united states",
  francia: "france",
  japon: "japan",
  mexico: "mexico",
  "reino unido": "united kingdom",
};

const apiState = {
  universitiesCache: null,
};

export async function searchUniversitiesByCountry(countryName) {
  const searchTerm = countryName.trim();

  if (!searchTerm) {
    throw new Error("Escribe el nombre de un pais para buscar.");
  }

  const universities = await getUniversities();
  const searchTerms = getSearchTerms(searchTerm);

  const exactMatches = universities.filter((university) =>
    searchTerms.some((term) => normalizeText(university.country) === term)
  );

  const results = exactMatches.length
    ? exactMatches
    : universities.filter((university) =>
        searchTerms.some((term) => normalizeText(university.country).includes(term))
      );

  return results.map(normalizeUniversity).sort((a, b) => a.name.localeCompare(b.name));
}

async function getUniversities() {
  if (apiState.universitiesCache) {
    return apiState.universitiesCache;
  }

  const response = await fetchUniversitiesData();

  if (!response.ok) {
    throw new Error("Existe un error al cargar datos desde la API.");
  }

  const data = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("Existe un error al procesar los datos JSON.");
  }

  apiState.universitiesCache = data;
  return apiState.universitiesCache;
}

async function fetchUniversitiesData() {
  try {
    return await fetch(UNIVERSITIES_DATA_URL);
  } catch (error) {
    throw new Error("La API no responde. Revisa tu conexion e intenta de nuevo.");
  }
}

function normalizeUniversity(university) {
  const name = university.name || "Sin nombre";
  const country = university.country || "No disponible";
  const domains = Array.isArray(university.domains) ? university.domains : [];
  const webPages = Array.isArray(university.web_pages) ? university.web_pages : [];
  const firstWebPage = webPages[0] || "";
  const id = `${name}-${country}-${domains[0] || firstWebPage}`;

  return {
    id,
    name,
    country,
    countryCode: university.alpha_two_code || "N/D",
    stateProvince:
      university["state-province"] || university.state_province || "No disponible",
    domains,
    webPages,
    firstWebPage,
  };
}

function getSearchTerms(searchTerm) {
  const normalizedTerm = normalizeText(searchTerm);
  const alias = COUNTRY_ALIASES[normalizedTerm];

  return alias ? [normalizedTerm, alias] : [normalizedTerm];
}

function normalizeText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}
