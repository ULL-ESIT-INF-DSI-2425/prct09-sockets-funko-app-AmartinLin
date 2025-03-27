import { FunkoManager } from "./FunkoManager.js";
import { Funko, FunkoGenre, FunkoType } from "./Funko.js";

/**
 * Ejecuta un comando en base a la entrada del usuario.
 * @param username - Nombre del usuario
 * @param command - Comando a ejecutar (add, list, get, remove)
 * @param args - Argumentos del comando
 * @returns - Resultado del comando como string
 */
export function executeCommand(
  username: string,
  command: string,
  args: string[],
): string {
  const manager = new FunkoManager(username);
  let response = "";

  switch (command) {
    case "add":
      { if (args.length < 10)
        return "Error: Faltan argumentos para añadir un Funko.";

      // 💡 Debes acceder a un valor de FunkoType, no a la clase en sí
      const tipo = args[3] as keyof typeof FunkoType;
      if (!FunkoType[tipo])
        return `Error: Tipo de Funko '${args[3]}' inválido.`;

      const genero = args[4] as keyof typeof FunkoGenre;
      if (!FunkoGenre[genero])
        return `Error: Género de Funko '${args[4]}' inválido.`;

      const newFunko = new Funko(
        parseInt(args[0]),
        args[1],
        args[2],
        FunkoType[tipo], // 🔥 Corrección aquí
        FunkoGenre[genero],
        args[5],
        parseInt(args[6]),
        args[7] === "true",
        args[8],
        parseFloat(args[9]),
      );
      response = manager.addFunko(newFunko)
        ? `Funko ${args[1]} añadido.`
        : "Error al añadir el Funko.";
      break; }

    case "list":
      { const funkos = manager.getAllFunkos();
      response = funkos.length
        ? `Funkos de ${username}:\n${funkos.map((f) => JSON.stringify(f)).join("\n")}`
        : "No hay Funkos registrados.";
      break; }

    case "get":
      { if (args.length < 1) return "Error: Debes especificar un ID.";
      const funko = manager.getFunko(parseInt(args[0]));
      response = funko
        ? `Funko encontrado:\n${JSON.stringify(funko)}`
        : "Funko no encontrado.";
      break; }

    case "remove":
      if (args.length < 1) return "Error: Debes especificar un ID.";
      response = manager.deleteFunko(parseInt(args[0]))
        ? `Funko eliminado.`
        : "Error al eliminar el Funko.";
      break;

    default:
      response = "Comando no reconocido.";
      break;
  }

  return response;
}
