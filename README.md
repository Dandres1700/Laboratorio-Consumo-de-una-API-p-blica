# Laboratorio - Consumo de una API publica

## Nombre del proyecto

Buscador de universidades del mundo por pais.

## Descripcion

Aplicacion web modular que permite consultar universidades de distintos paises usando datos publicos en formato JSON. El usuario escribe el nombre de un pais, visualiza las universidades encontradas en tarjetas y puede guardar instituciones importantes como favoritas para revisarlas despues, incluso si recarga la pagina.

El proyecto corresponde al caso propuesto: **Buscador de universidades por pais**.

## API o fuente publica utilizada

Se usa el proyecto publico [Hipo University Domains List](https://github.com/Hipo/university-domains-list), que contiene universidades del mundo, dominios web, paises y codigos de pais.

Para que funcione correctamente en GitHub Pages, la aplicacion consulta el archivo JSON publico por HTTPS:

```text
https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json
```

La fuente oficial tambien documenta una API hospedada por Hipo Labs, pero esa URL responde por HTTP. Por eso se usa el JSON oficial en GitHub Raw, que evita problemas de contenido mixto en paginas publicadas con HTTPS.

## Funcionalidades principales

- Busqueda de universidades por pais desde un input.
- Consumo de datos publicos con `fetch`.
- Uso de `async/await` para manejar la consulta.
- Lectura y procesamiento de datos JSON.
- Filtro dinamico por pais.
- Renderizado de resultados con manipulacion del DOM.
- Visualizacion de universidades en tarjetas.
- Datos mostrados: nombre, pais, codigo del pais, provincia o estado, dominio y sitio web.
- Guardado de universidades favoritas usando `localStorage`.
- Recuperacion automatica de favoritos al recargar la pagina.
- Prevencion de favoritos repetidos.
- Eliminacion de favoritos guardados.
- Seccion de ultima consulta realizada guardada en `localStorage`.
- Opcion para limpiar la ultima consulta guardada.
- Manejo basico de errores y estados vacios.
- Diseno responsive para celular, tablet y computador.

## Manejo de errores

La aplicacion muestra mensajes claros cuando:

- El usuario intenta buscar sin escribir nada.
- La fuente de datos no responde.
- La busqueda no tiene resultados.
- El usuario intenta guardar una universidad repetida.
- Existe un problema al cargar o procesar los datos JSON.

## Estructura del proyecto

```text
Laboratorio_API/
|-- index.html
|-- README.md
|-- css/
|   |-- styles.css
|-- js/
|   |-- api.js
|   |-- ui.js
|   |-- storage.js
|   |-- main.js
|-- assets/
    |-- img/
```

## Explicacion de la estructura modular

- `index.html`: define la estructura principal de la interfaz.
- `css/styles.css`: contiene el diseno visual, tarjetas, botones, mensajes y estilos responsive.
- `js/api.js`: consulta el JSON publico con `fetch` y `async/await`, filtra por pais y normaliza los datos.
- `js/ui.js`: crea tarjetas, renderiza resultados, favoritos, mensajes y ultima consulta.
- `js/storage.js`: guarda, lee y elimina favoritos y ultima consulta desde `localStorage`.
- `js/main.js`: conecta los eventos del formulario, botones y flujo principal de la aplicacion.

## Requisitos evidenciados

- Consumo de fuente publica de datos.
- `fetch`.
- `async/await`.
- Manejo de datos JSON.
- Modulos ES con `import` y `export`.
- `localStorage`.
- Manipulacion del DOM.
- Manejo basico de errores.
- Interfaz responsive.
- Preparado para publicacion en GitHub Pages.

## Como abrir el proyecto

Por usar modulos ES, se recomienda abrirlo desde un servidor local.

Opcion rapida con Python:

```bash
python -m http.server 5500
```

Despues abre en el navegador:

```text
http://localhost:5500
```

## Publicacion en GitHub Pages

1. Sube el proyecto al repositorio de GitHub.
2. Entra al repositorio en GitHub.
3. Ve a `Settings`.
4. Abre la seccion `Pages`.
5. En `Build and deployment`, selecciona `Deploy from a branch`.
6. Selecciona la rama `main`.
7. Selecciona la carpeta `/root`.
8. Guarda los cambios.
9. Abre el enlace generado por GitHub Pages.

Repositorio:

```text
https://github.com/Dandres1700/Laboratorio-Consumo-de-una-API-p-blica
```

Pagina publicada:

```text
https://dandres1700.github.io/Laboratorio-Consumo-de-una-API-p-blica/
```

## Evidencias para la entrega

La entrega final debe incluir:

- Enlace del repositorio en GitHub.
- Enlace de la pagina publicada en GitHub Pages.
- Captura de la interfaz funcionando.
- Captura de una busqueda realizada por pais.
- Captura de universidades guardadas en favoritos.
- Breve explicacion de la estructura modular del proyecto.

## Tecnologias usadas

- HTML5
- CSS3
- JavaScript vanilla
- Modulos ES
- Fetch API
- LocalStorage
- DOM API
