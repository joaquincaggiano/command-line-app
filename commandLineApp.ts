import "dotenv/config"; // carga la clave y la dirección del servicio desde .env
import OpenAI from "openai";
import { existsSync, readFileSync, statSync } from "node:fs";

const client = new OpenAI(); // lee OPENAI_API_KEY y OPENAI_BASE_URL del entorno
const MODELO = process.env.MODELO ?? "fast";

// Obtenemos el prompt desde la línea de comandos
let prompt = process.argv[2];

// Si no se proporcionó un prompt, mostramos un mensaje de como se utiliza la aplicación
if (!prompt) {
  console.error(
    `Para utilizar la aplicación, debes proporcionar un texto o archivo luego de ejecutar el comando:\n- npx tsx commandLineApp.ts "<texto>" | <ruta-a-archivo>\n\nEtiqueta un texto en una categoría (deporte, arte, ciencia, etc.).\nEjemplos:\n- npx tsx commandLineApp.ts "Messi ganó el Mundial"\n- npx tsx commandLineApp.ts docs/texto.txt`,
  );
  process.exit(1);
}

// Si el prompt es un archivo, leemos su contenido, sino se trata como texto y se usa tal cual
if (existsSync(prompt) && statSync(prompt).isFile()) {
  prompt = readFileSync(prompt, "utf-8");
}

const response = await client.chat.completions.create({
  model: MODELO,
  max_completion_tokens: 256, // límite de la respuesta, en tokens
  messages: [
    {
      role: "system",
      content:
        "Etiqueta el texto del usuario en una categoría. Por ejemplo: 'deporte', 'arte', 'ciencia', etc.",
    },
    {
      role: "user",
      content: prompt,
    },
  ],
});

// La respuesta llega dentro de una lista de opciones (choices); usamos la primera.
const choice = response.choices[0];
console.log(choice.message.content || "(respuesta vacía)");

// Por qué terminó: "stop" = de forma natural; "length" = se cortó por el límite.
const finishReason = choice.finish_reason;
switch (finishReason) {
  case "length":
    console.log(
      `${finishReason}: La respuesta supero el límite de tokens permitidos.`,
    );
    break;
  case "stop":
    console.log(
      `${finishReason}: La respuesta se ha terminado de forma natural.`,
    );
    break;
  default:
    console.log(
      `${finishReason}: La respuesta se ha terminado de forma inesperada.`,
    );
    break;
}

console.log(`Tokens de entrada: ${response.usage?.prompt_tokens}`);
console.log(`Tokens de salida: ${response.usage?.completion_tokens}`);
