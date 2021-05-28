// const { Server } = require('http');
const { Server } = require("net");

const host = "0.0.0.0";
const END = "END";

const error = (err) => {
  console.error(err);
  process.exit(1);
};

const listen = (port) => {
  const server = new Server();
  server.on("connection", (socket) => {
    const remoteSocket = ` ${socket.remoteAddress}:${socket.remotePort}`;
    console.log(`New connection from ${remoteSocket}`);
    socket.setEncoding("utf-8");
    socket.on("data", (message) => {
      if (message === END) {
        socket.end();
      } else {
        console.log(`${remoteSocket} -> ${message}`);
      }
    });
    socket.on("close", () =>
      console.log(`Connection with ${remoteSocket} closed`)
    );
    socket.on("error", (err) => error(err));
  });

  server.listen({ port, host }, () => {
    console.log(`Listening on port ${port}`);
  });

  server.on("error", (err) => error(err.message));
};

const main = () => {
  // show me the arguments
  // console.log(process.argv)
  if (process.argv.length !== 3) {
    error(`Usage: node ${__filename} (port)`);
  }
  let port = process.argv[2];
  if (isNaN(port)) {
    error(`Invalid port ${port}`);
  }

  port = Number(port);

  listen(port);
};

if (require.main === module) {
  main();
}
