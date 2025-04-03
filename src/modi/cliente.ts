import net from "net";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const client = net.createConnection({ port: 60300 }, () => {
  console.log("Conectado al servidor");
});

client.on("data", (data) => {
  console.log(data.toString());
  rl.question("> ", (input) => client.write(input));
});

client.on("end", () => {
  console.log("Desconectado del servidor.");
  rl.close();
});

client.on("error", (err) => {
  console.error("Error en cliente:", err);
});
