const http = require("http");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  console.log("Request:", req.method, req.url);

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");

  // Health check
  if (req.url === "/health") {
    res.end(JSON.stringify({ status: "ok", message: "CallioVoice alive" }));
    return;
  }

  // Root
  if (req.url === "/") {
    res.end(JSON.stringify({ message: "CallioVoice backend running" }));
    return;
  }

  // Voice generation (fake for now)
  if (req.url === "/generate-voice" && req.method === "POST") {
    let body = "";

    req.on("data", chunk => {
      body += chunk.toString();
    });

    req.on("end", () => {
      console.log("Received:", body);

      let parsed = {};
      try {
        parsed = JSON.parse(body || "{}");
      } catch (e) {
        parsed = { error: "Invalid JSON" };
      }

      res.end(JSON.stringify({
        success: true,
        received: parsed,
        audioUrl: "not-implemented-yet"
      }));
    });

    return;
  }

  res.statusCode = 404;
  res.end(JSON.stringify({ error: "Not found" }));
});

server.listen(PORT, "0.0.0.0", () => {
  console.log("CallioVoice running on port " + PORT);
});