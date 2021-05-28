// const { Server } = require('http');
const { Server } = require("net");

const server = new Server();

server.on("connection", (socket) => {
  const END = 'END';
  const remoteSocket = ` ${socket.remoteAddress}:${socket.remotePort}`;
  console.log(
    `New connection from ${remoteSocket}`
  );
  socket.setEncoding('utf-8');
  socket.on("data", (message) => {
    // socket.write(data);
    if(message === END) {
      socket.end();
    } else {
      console.log(`${remoteSocket} -> ${message}`)
    }
  });
  socket.on('close', () => console.log(`Connection with ${remoteSocket} closed`))
});

server.listen({ port: 8000, host: "0.0.0.0" }, () => {
  console.log("listening on port 8000");
});
