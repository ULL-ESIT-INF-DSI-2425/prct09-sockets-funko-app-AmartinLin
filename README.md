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