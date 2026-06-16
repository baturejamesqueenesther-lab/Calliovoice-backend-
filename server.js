const http = require("http");

const PORT = 8080;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("CallioVoice RAW SERVER WORKING 🚀");
});

server.listen(PORT, "0.0.0.0", () => {
  console.log("RAW server running on port " + PORT);
});