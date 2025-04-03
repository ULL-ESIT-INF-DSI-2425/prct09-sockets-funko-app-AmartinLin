# Práctica FunkoTienda cliente-servidor
En esta práctica se implementa un modelo de tienda de funkos cliente-servidor en donde los funkos se almacenan en el mismo sistema de ficheros que el resto del código. A continuación se explica cada parte del programa y como iniciarlo para que supere los test, además de ejecutarlo para un funcionamiento normal.
## Funko.ts
Aquí se define la forma de los funkos y su almacenaje en los ficheros JSON, además de definirse las funciones para extraer el funko de un JSON y transformar un funko a JSON. Los funkos tiene 2 parametros que son enumerados ya que se necesitan valores estáticos (no nos vale cualquier valor):
``` typescript
export enum FunkoType {
  POP = "Pop!",
  POP_RIDES = "Pop! Rides",
  VYNIL_SODA = "Vynil Soda",
  VYNIL_GOLD = "Vynil Gold",
}

export enum FunkoGenre {
  ANIMATION = "Animación",
  MOVIES_TV = "Películas y TV",
  VIDEO_GAMES = "Videojuegos",
  SPORTS = "Deportes",
  MUSIC = "Música",
  ANIME = "Ánime",
}
```
## FunkoManager.ts
En este fichero se implementa toda la lógica para manejar la tienda. Aquí se indica donde se ha de buscar, actualizar y añadir los funkos, por lo que hay que prestar atención a este fichero a la hora de ejecutar los test en máquinas externas (como es el caso de las GitHub actions). 
En forma de comentarios se ha colocado una forma de direccionar las rutas mediante URLs pero se ha prescindido de ellas por dificultar la lectura del código y de fallar algunos test debido a una mala referencia a los archivos. 
> NOTE: para cambiar el directorio de pruebas para las GitHub actions se ha de invertir el valor del booleano `testing`: 
```typescript
export class FunkoManager {
  private userDir: string;

  constructor(private username: string) {
    const testing = true; // <- valor a cambiar para test (máquinas externas)
    if (testing) {
  ...
```
## FunkoController.ts
Se define una única funcion que se encarga de ejecutar los comandos necesarios de funkoManager tras introducir un comando en la consola. Se recibe el nombre del usuario que ejecutó el comando, el comando en sí y los argumentos. 
> NOTE: Se utiliza chalk para informar de manera visual los errores y ejecuciones
## server.ts
Implementación del servidor encargado de administrar los funkos mediante los comandos de Funkomanager. Se crea un servidor conectado a un socket dado (por defecto 60300). 
## cli.ts
Código que implementa tanto el manejo de inputs por linea de comandos (yargs), como una función encargada de ejecutar los comandos solicitados `sendComand`. Dicha funcion crea una conección (socket con el puerto 60300). Nótese la implementación a la hora de recolectar toda la información y esta solo se envía al servidor una vez la conección termina: 
```typescript
...
let wholeData = "";

  client.on("data", (dataChunk) => {
    wholeData += dataChunk.toString(); // Acumulamos todos los fragmentos
  });

  client.on("end", () => {
    try {
      // Intentamos parsear como JSON
      const jsonStart = wholeData.indexOf("{");
      if (jsonStart !== -1) {
        const jsonData = wholeData.slice(jsonStart).trim(); // Aislamos la parte JSON
        const message = JSON.parse(jsonData);
        callback(`${JSON.stringify(message, null, 2)}`); 
      } else {
        callback(`${wholeData.trim()}`);
      }
    } catch (error) {
      console.error("Error al procesar la respuesta:", error);
      console.error("Datos recibidos:", wholeData);
    }
  });
...
```
> NOTE: se ha desabilitado la condición `no-unused-vars` del compilador de typescript en la constante argv ya que no se utiliza en el mismo código pero sí para la recolección del comando que introduce el cliente.
## client.ts
Implementación de un cliente el cual no se desconecta una vez realizada la petición, si no que permanece con el canal abierto. **Esta implementación no forma parte de la práctica 9, si no que es parte de experimentación de la misma**.