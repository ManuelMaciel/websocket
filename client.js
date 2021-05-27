const { Socket } = require("net");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
})

const socket = new Socket();

socket.connect({ host: "localhost", port: "8000" });
socket.setEncoding("utf-8");

readline.on('line', (line) => {
  socket.write(line)
})
socket.on("data", (data) => {
  console.log(data);
});
