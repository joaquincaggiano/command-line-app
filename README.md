# Command Line App (Clasificador)

App de línea de comandos que etiqueta un texto en una categoría (deporte, arte, ciencia, etc.) usando un modelo.

## Instalación

- Instalar dependencias: `npm install`

## Variables de entorno

- Copiar `.env.example` a `.env`.
- Completar en `.env`:
  - `OPENAI_API_KEY`: clave del servicio.
  - `OPENAI_BASE_URL`: dirección del servicio.
  - `MODELO`: modelo a usar (por defecto `fast`).

## Ejecución

- Con texto como argumento:
  ```bash
  npx tsx commandLineApp.ts "Messi ganó el Mundial"
  ```
- Con un archivo:
  ```bash
  npx tsx commandLineApp.ts prompts/01-prompt.txt
  ```
- Sin argumentos: muestra cómo se usa la app y termina.
