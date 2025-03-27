import net from "net";
import { executeCommand } from "./funkoController.js";
import chalk from "chalk";

const server = net.createServer((socket) => {
  console.log("Cliente conectado.");

  let username = "";

  socket.write(
    chalk.bold.cyanBright("Bienvenido al servidor Funko. Por favor, ingrese su nombre de usuario:\n"),
  );

  socket.on("data", (data) => {
    const message = data.toString().trim();

    if (!username) {
      username = message;
      socket.write(
        chalk.cyanBright(`Usuario establecido: ${username}. Ahora puedes ingresar comandos.\n`),
      );
      return;
    }

    const [command, ...args] = message.split(" ");
    const response = executeCommand(username, command, args);
    socket.write(response + "\n");
  });

  socket.on("end", () => {
    console.log(chalk.magenta(`Cliente (${username}) desconectado.`));
  });

  socket.on("error", (err) => {
    console.error(chalk.red("Error en el socket:", err));
  });
});

server.listen(60300, () => {
  console.log("Servidor Funko escuchando en el puerto 60300...");
});
