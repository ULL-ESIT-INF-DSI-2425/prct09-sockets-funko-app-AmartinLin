import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { Funko, FunkoType, FunkoGenre } from "./Funko.js";
import { FunkoManager } from "./FunkoManager.js";

yargs(hideBin(process.argv))
  .command(
    "add",
    "Añadir un nuevo Funko",
    (yargs) => {
      return yargs
        .option("user", { type: "string", demandOption: true, describe: "Nombre del usuario" })
        .option("id", { type: "number", demandOption: true, describe: "ID único del Funko" })
        .option("name", { type: "string", demandOption: true, describe: "Nombre del Funko" })
        .option("description", { type: "string", demandOption: true, describe: "Descripción" })
        .option("type", { choices: Object.values(FunkoType), demandOption: true, describe: "Tipo de Funko" })
        .option("genre", { choices: Object.values(FunkoGenre), demandOption: true, describe: "Género" })
        .option("franchise", { type: "string", demandOption: true, describe: "Franquicia" })
        .option("number", { type: "number", demandOption: true, describe: "Número dentro de la franquicia" })
        .option("exclusive", { type: "boolean", default: false, describe: "Es exclusivo" })
        .option("specialFeatures", { type: "string", describe: "Características especiales" })
        .option("marketValue", { type: "number", demandOption: true, describe: "Valor de mercado" });
    },
    (args) => {
      const collection = new FunkoManager(args.user);
      const newFunko = new Funko(
        args.id,
        args.name,
        args.description,
        args.type as FunkoType,
        args.genre as FunkoGenre,
        args.franchise,
        args.number,
        args.exclusive,
        args.specialFeatures || "",
        args.marketValue
      );

      collection.addFunko(newFunko);
    }
  )

  .command(
    "update",
    "Modificar un Funko",
    (yargs) => {
      return yargs
        .option("user", { type: "string", demandOption: true })
        .option("id", { type: "number", demandOption: true })
        .option("name", { type: "string" })
        .option("description", { type: "string" })
        .option("type", { choices: Object.values(FunkoType) })
        .option("genre", { choices: Object.values(FunkoGenre) })
        .option("franchise", { type: "string" })
        .option("number", { type: "number" })
        .option("exclusive", { type: "boolean" })
        .option("specialFeatures", { type: "string" })
        .option("marketValue", { type: "number" });
    },
    (args) => {
      const collection = new FunkoManager(args.user);
      const updatedFunko = new Funko(
        args.id,
        args.name || "",
        args.description || "",
        args.type || FunkoType.POP, 
        args.genre || FunkoGenre.ANIMATION, 
        args.franchise || "",
        args.number || 0, 
        args.exclusive || false,
        args.specialFeatures || "",
        args.marketValue || 0 
      );
      collection.updateFunko(updatedFunko);
    }
  )

  .command(
    "remove",
    "Eliminar un Funko",
    (yargs) => {
      return yargs.option("user", { type: "string", demandOption: true }).option("id", { type: "number", demandOption: true });
    },
    (args) => {
      const collection = new FunkoManager(args.user);
      collection.deleteFunko(args.id);
    }
  )

  .command(
    "list",
    "Listar Funkos del usuario",
    (yargs) => {
      return yargs.option("user", { type: "string", demandOption: true });
    },
    (args) => {
      const collection = new FunkoManager(args.user);
      collection.getAllFunkos();
    }
  )

  .command(
    "show",
    "Mostrar detalles de un Funko",
    (yargs) => {
      return yargs.option("user", { type: "string", demandOption: true }).option("id", { type: "number", demandOption: true });
    },
    (args) => {
      const collection = new FunkoManager(args.user);
      collection.getFunko(args.id);
    }
  )

  .demandCommand(1, "Debes ingresar un comando válido")
  .help()
  .parse();
