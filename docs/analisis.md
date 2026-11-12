# Análisis

## Tabla de pruebas

| Texto     | Tokens entrada | Tokens salida | ¿Correcto? |
| --------- | -------------: | ------------: | :--------: |
| Corto     | 57             | 77            | Si         |
| Medio (1) | 184            | 86            | Si         |
| Medio (2) | 184            | 83            | Si         |
| Medio (3) | 184            | 65            | Si         |
| Largo     | 801            | 89            | Si         |

---

## Respuestas del análisis

Responder en un párrafo corto a cada pregunta:

### Tokens

¿Cómo crece el consumo con la longitud del texto? ¿Qué parte del consumo controlas tú con el límite de longitud y qué parte no?

El consumo de tokens aumenta con el tamaño del prompt que enviamos, pero no tanto en la respuesta, ya que los tokens de salida se mantuvieron casi siempre en un rango bastante cercano entre ellas.

Nosotros podemos controlar el consumo de tokens de salida con la propiedad `max_completion_tokens`, pero los tokens de entrada estaría limitado por el propio modelo como vimos en las clases entiendo.

### Variabilidad

¿Cambió el resultado entre ejecuciones? ¿Qué cambiarías en las instrucciones para hacerlo más estable?

Cambiaron los tokens de salida, pero siempre en un rango muy similar entre ellos. Como elegí que esta app haga el `Clasificador` podría especificar mejor el content del role system para que solo me devuelva en la respuesta la categoría y nada más, y con esto ahorraríamos muchísimos tokens en la salida.

### Trade-offs

¿Por qué el modelo que has elegido es suficiente para esta tarea? ¿Qué cambiarías si la tarea tuviera que procesar 10.000 textos al día?

Porque es una tarea sencilla, no haría falta utilizar un gran modelo para que pueda clasificar texto.  
Podríamos controlar la longitud de los prompt de entrada y permitir cierta cantidad de caracteres. También como mencione antes, especificar mejor en el content del system que devuelva solo la categoría y nada más.  
Procesar todas las solicitudes en chunks, para reducir la carga de trabajo.
