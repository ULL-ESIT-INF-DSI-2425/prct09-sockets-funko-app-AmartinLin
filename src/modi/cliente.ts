import net from "net";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const client = net.createConnection({ port: 60300 }, () => {
  console.log("Conectado al servidor");
});

let allData = "";
client.on("data", (data) => {
  allData += data;
  console.log("alldata", allData.toString());
  if (allData.indexOf("Bienvenido. P") !== -1) {
    console.log(allData.toString());
    allData = "";
  } else {
    while (allData.indexOf("\n") !== -1) {
      allData += data;
    }
  }
  rl.question("> ", (input) => client.write(input));
});

client.on("end", () => {
  console.log("Desconectado del servidor.");
  rl.close();
});

client.on("error", (err) => {
  console.error("Error en cliente:", err);
});
