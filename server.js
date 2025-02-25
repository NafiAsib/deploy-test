const http = require("http");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const PORT = process.env.PORT || 3000;

// Simple MIME type mapping
const mimeTypes = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
};

// Create HTTP server
const server = http.createServer((req, res) => {
  // API endpoint for container info
  if (req.url === "/api/container-info") {
    const info = {
      isDocker: false,
      containerName: null,
      isKubernetes: false,
    };

    // Check if running in Docker by looking for .dockerenv file
    if (fs.existsSync("/.dockerenv")) {
      info.isDocker = true;
    }

    // Get container name and check for Kubernetes
    exec("hostname", (error, stdout, stderr) => {
      if (!error) {
        info.containerName = stdout.trim();
      }

      // Check for Kubernetes-specific environment variables
      if (process.env.KUBERNETES_SERVICE_HOST || process.env.KUBERNETES_PORT) {
        info.isKubernetes = true;
      }

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(info));
    });
    return;
  }

  // Serve static files
  let filePath = "." + req.url;
  if (filePath === "./") {
    filePath = "./index.html";
  }

  const extname = path.extname(filePath);
  const contentType = mimeTypes[extname] || "application/octet-stream";

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === "ENOENT") {
        res.writeHead(404);
        res.end("File not found");
      } else {
        res.writeHead(500);
        res.end("Server error: " + error.code);
      }
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf-8");
    }
  });
});

// Start server
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
