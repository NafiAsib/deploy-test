const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const fs = require("fs");
const { exec } = require("child_process");

// Serve static files
app.use(express.static("./"));

// API endpoint to get container information
app.get("/api/container-info", (req, res) => {
  const info = {
    isDocker: false,
    containerName: null,
    isKubernetes: false,
  };

  // Check if running in Docker by looking for .dockerenv file
  if (fs.existsSync("/.dockerenv")) {
    info.isDocker = true;
  }

  // Try to get container name
  exec("hostname", (error, stdout, stderr) => {
    if (!error) {
      info.containerName = stdout.trim();
    }

    // Check for Kubernetes-specific environment variables
    if (process.env.KUBERNETES_SERVICE_HOST || process.env.KUBERNETES_PORT) {
      info.isKubernetes = true;
    }

    res.json(info);
  });
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
