# Enunciado

## Actividades a realizar

Construir una aplicación de línea de comandos que reciba un texto y use un modelo para resolver **una** de estas tareas:

| Tarea | Descripción |
| --- | --- |
| **Resumidor** | Devuelve tres puntos clave de un texto largo. |
| **Clasificador** | Etiqueta un mensaje con una categoría (por ejemplo, la de un ticket de soporte). |
| **Extractor** | Devuelve un dato concreto de un texto (un nombre, una fecha o un importe). |

### Criterios de aceptación

La aplicación debe cumplir lo siguiente:

- [x] Funciona con el texto como argumento y con el contenido de un archivo.
- [x] Si no recibe texto, explica cómo se usa y termina.
- [x] Separa las instrucciones fijas de la tarea (en el *system prompt*) del texto del usuario.
- [x] Muestra el resultado y el consumo de tokens de la llamada.
- [x] Avisa si la respuesta se cortó por el límite de longitud (motivo de fin `length`).
- [x] Lee la clave del `.env`: no aparece en el código.

---

## Pistas para empezar

### 1. System prompt vs. mensaje del usuario

Añadir un mensaje con el rol `system` al principio de la lista de mensajes. Contiene las instrucciones fijas de tu tarea; el texto del usuario va en el mensaje `user`, que cambia en cada uso:

```ts
mensajes = [
  {
    rol: "system",
    contenido: "Resume textos. Devuelve exactamente 3 puntos clave, concisos, en español.",
  },
  {
    rol: "user",
    contenido: texto,
  },
];
```

### 2. Leer el texto desde argumento o desde un archivo

Leer el texto del primer argumento de la línea de comandos o, si no hay, de la entrada estándar. Así funcionan las dos formas de uso:

```bash
# Python: texto como argumento
python mini_app.py "Texto que quieres procesar"

# Python: texto desde un archivo
python mini_app.py < texto.txt

# TypeScript: texto como argumento
npx tsx miniApp.ts "Texto que quieres procesar"

# TypeScript: texto desde un archivo
npx tsx miniApp.ts < texto.txt
```

### 3. Motivo de fin y consumo

El motivo de fin (`finish_reason`) y el consumo (`usage`) deben imprimirse en pantalla.

---

## Pruebas con datos reales

1. Preparar **tres textos** de entrada distintos, sin datos personales: uno corto, uno medio y uno largo.
2. Ejecutar la mini-app con cada texto y anotar en una tabla: tokens de entrada, tokens de salida y si el resultado es correcto.
3. Ejecutar **dos veces más** el texto medio y anotar si el resultado cambia.

---

## Reto opcional: comparar dos modelos

1. Ejecutar la misma tarea con `MODELO=fast` y con `MODELO=smart`, cambiando esa línea del `.env` entre una ejecución y otra.
2. Comparar calidad del resultado, consumo y tiempo de respuesta.
   - **macOS / Linux:** anteponer `time` al comando.
   - **PowerShell:** usar `Measure-Command`.
3. Concluir: ¿compensa el modelo más grande para esta tarea?

---

## Entregable

El estudiante deberá enviar un archivo `.zip` que contenga:

### Código

El código fuente de la mini-app, con un `README` breve que explique:

- cómo ejecutarla
- cómo configurar el `.env`

### Capturas de la terminal

Deben mostrar:

1. Una ejecución con el texto como argumento.
2. Una ejecución con un archivo.
3. Una ejecución sin texto, donde se vea el mensaje de uso.
4. Un aviso de corte (baja el límite de longitud para provocarlo).

> Las capturas deben ser claras y legibles.

### Análisis

Un archivo `analisis.md` con:

- la tabla de pruebas
- las respuestas del análisis
- el reto opcional, si se hace

---

## Buenas prácticas

- No incluir el archivo `.env` en el `.zip`. Si quieres documentar la configuración, incluye un `.env.example` sin la clave.
- No mostrar la clave en las capturas ni en el código. Si aparece, ocúltala antes de enviar.
- No incluir carpetas de dependencias (`node_modules`, entornos virtuales de Python).
- No usar textos con datos personales o confidenciales en las pruebas: se envían a un servicio externo.
