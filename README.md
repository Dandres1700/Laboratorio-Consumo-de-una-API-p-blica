# Explorador de paises y datos importantes

Proyecto web hecho con HTML, CSS y JavaScript vanilla. Permite buscar paises, consultar datos desde una API publica y guardar favoritos de forma persistente en el navegador.

## API utilizada

Se usa la API publica [countries.dev](https://countries.dev), que no requiere API key.

Endpoint principal:

```text
https://countries.dev/name/{name}
```

## Funcionalidades principales

- Busqueda de paises por nombre.
- Consumo de API con `fetch`, `async/await` y datos JSON.
- Resultados mostrados en tarjetas visuales.
- Datos por pais: nombre, bandera, capital, region, subregion, poblacion, area, moneda e idioma.
- Guardado de favoritos en `localStorage`.
- Recuperacion automatica de favoritos al recargar la pagina.
- Prevencion de favoritos repetidos.
- Eliminacion de favoritos.
- Seccion de ultima consulta realizada.
- Recuperacion automatica de la ultima busqueda guardada.
- Manejo de errores y estados vacios.
- Diseno responsive para celulares, tablets y computadores.

## Estructura del proyecto

```text
Laboratorio_API/
├── index.html
├── README.md
├── css/
│   └── styles.css
├── js/
│   ├── api.js
│   ├── ui.js
│   ├── storage.js
│   └── main.js
└── assets/
    └── img/
```

## Estructura modular

- `index.html`: contiene la estructura principal de la pagina.
- `css/styles.css`: contiene el diseno visual, las tarjetas, botones y estilos responsive.
- `js/api.js`: contiene las funciones para consultar la API.
- `js/ui.js`: contiene las funciones para renderizar resultados, favoritos y mensajes.
- `js/storage.js`: contiene las funciones para manejar `localStorage`.
- `js/main.js`: conecta los eventos, la busqueda, los favoritos y el flujo general de la app.

## Como abrir el proyecto

Como el proyecto usa modulos ES, lo ideal es abrirlo desde un servidor local.

Opcion rapida con Python:

```bash
python -m http.server 5500
```

Despues abre en el navegador:

```text
http://localhost:5500
```

Tambien funciona correctamente al publicarlo en GitHub Pages.

## Como publicarlo en GitHub Pages

1. Sube el proyecto a un repositorio de GitHub.
2. Entra al repositorio en GitHub.
3. Ve a `Settings`.
4. Abre la seccion `Pages`.
5. En `Build and deployment`, selecciona `Deploy from a branch`.
6. Selecciona la rama `main`.
7. Selecciona la carpeta `/root`.
8. Guarda los cambios.
9. GitHub generara una URL publica para abrir el proyecto.

## Tecnologias usadas

- HTML5
- CSS3
- JavaScript vanilla
- Modulos ES
- Fetch API
- LocalStorage
- DOM API
