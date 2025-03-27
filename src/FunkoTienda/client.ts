import net from "net";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const client = net.createConnection({ port: 60300, host: "127.0.0.1" }, () => {
  console.log("Conectado al servidor Funko.");
});

client.on("data", (data) => {
  console.log("Servidor:", data.toString());
  if (!data.toString().includes("ingrese su nombre de usuario")) {
    rl.question("> ", (input) => client.write(input));
  }
});

rl.question("Ingrese su nombre de usuario: ", (username) => {
  client.write(username);
});

client.on("end", () => {
  console.log("Desconectado del servidor.");
  rl.close();
});

client.on("error", (err) => {
  console.error("Error en cliente:", err);
});
