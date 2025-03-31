import net from "net";

const listeners: net.Socket[] = [];

const server = net.createServer((socket) => {
  console.log("Cliente conectado.");
  let username = "";

  socket.write(
    "Bienvenido. Por favor, ingrese su nombre de usuario:\n",
  );

  let allData = "";
  socket.on("data", (data) => {
    allData += data;
    while (allData.indexOf("\n") !== -1) {
      allData += data;
    }
    const message = allData.toString().trim();
    allData = "";
    if (!username) {
      username = message;
      console.log("usuario:", username);
      socket.write(
        `Usuario establecido: ${username}. Ahora puedes escribir mensajes al resto de usuarios\n`,
      );
      listeners.push(socket);
      return;
    }
    const response = `(${username}): ${message}`;
    console.log(response + "\n");
    listeners.forEach((pipol) => {
      if (pipol != socket) {
        pipol.write(response + "\n");
      } else {
        pipol.write(" ");
      }
    })
  });

  socket.on("end", () => {
    console.log(`Cliente (${username}) desconectado.`);
  });

  socket.on("error", (err) => {
    console.error("Error en el socket:", err);
  });
});

server.listen(60300, () => {
  console.log("Servidor Funko escuchando en el puerto 60300...");
});
