import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { executeCommand } from "./funkoController.js";

const argv = yargs(hideBin(process.argv))
  .option("user", {
    alias: "u",
    type: "string",
    describe: "Nombre de usuario",
    demandOption: true,
  })
  .command<{ user: string; id: number }>(
    "get <id>",
    "Obtener información de un Funko",
    (yargs) => yargs.positional("id", { type: "number", demandOption: true }),
    (args) => {
      console.log(executeCommand(args.user, "get", [String(args.id)]));
    },
  )
  .command<{ user: string; id: number }>(
    "remove <id>",
    "Eliminar un Funko",
    (yargs) => yargs.positional("id", { type: "number", demandOption: true }),
    (args) => {
      console.log(executeCommand(args.user, "remove", [String(args.id)]));
    },
  )
  .command<{
    user: string;
    id: number;
    nombre: string;
    descripcion: string;
    tipo: string;
    genero: string;
    franquicia: string;
    numero: number;
    exclusivo: boolean;
    especial: string;
    valor: number;
  }>(
    "add <id> <nombre> <descripcion> <tipo> <genero> <franquicia> <numero> <exclusivo> <especial> <valor>",
    "Añadir un nuevo Funko",
    (yargs) =>
      yargs
        .positional("id", { type: "number", demandOption: true })
        .positional("nombre", { type: "string", demandOption: true })
        .positional("descripcion", { type: "string", demandOption: true })
        .positional("tipo", { type: "string", demandOption: true })
        .positional("genero", { type: "string", demandOption: true })
        .positional("franquicia", { type: "string", demandOption: true })
        .positional("numero", { type: "number", demandOption: true })
        .positional("exclusivo", { type: "boolean", demandOption: true })
        .positional("especial", { type: "string", demandOption: true })
        .positional("valor", { type: "number", demandOption: true }),
    (args) => {
      console.log(
        executeCommand(args.user, "add", [
          String(args.id),
          args.nombre,
          args.descripcion,
          args.tipo,
          args.genero,
          args.franquicia,
          String(args.numero),
          String(args.exclusivo),
          args.especial,
          String(args.valor),
        ]),
      );
    },
  )
  .command<{ user: string }>(
    "list",
    "Listar Funkos",
    (yargs) => yargs, 
    (args) => {
      console.log(executeCommand(args.user, "list", []));
    },
  )
  .demandCommand()
  .help().argv;
