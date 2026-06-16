const http = require("http");

const PORT = 8080;

const server = http.createServer((req, res) => {
  console.log("Request:", req.method, req.url);

  // Allow CORS (important for testing)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");

  // Health check route
  if (req.url === "/health") {
    res.end(JSON.stringify({ status: "ok", message: "CallioVoice alive" }));
    return;
  }

  // Root route
  if (req.url === "/") {
    res.end(JSON.stringify({ message: "CallioVoice backend running" }));
    return;
  }

  // Fake voice route for now
  if (req.url === "/generate-voice" && req.method === "POST") {
    let body = "";

    req.on("data", chunk => {
      body += chunk.toString();
    });

    req.on("end", () => {
      console.log("Received:", body);

      res.end(JSON.stringify({
        success: true,
        received: JSON.parse(body || "{}"),
        audioUrl: "not-implemented-yet"
      }));
    });

    return;
  }

  res.statusCode = 404;
  res.end(JSON.stringify({ error: "Not found" }));
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`CallioVoice running on port ${PORT}`);
});