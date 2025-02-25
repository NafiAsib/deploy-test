document.addEventListener("DOMContentLoaded", () => {
  // Get DOM elements
  const domainElement = document.getElementById("domain");
  const ipElement = document.getElementById("ip");
  const timeElement = document.getElementById("time");
  const dockerElement = document.getElementById("docker");
  const containerElement = document.getElementById("container");
  const kubernetesElement = document.getElementById("kubernetes");

  // Set domain name
  domainElement.textContent = window.location.hostname || "localhost";

  // Update time every second
  function updateTime() {
    const now = new Date();

    const options = {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };

    timeElement.textContent = now.toLocaleString("en-US", options);
  }

  updateTime();
  setInterval(updateTime, 1000);

  // Fetch IP address
  fetch("https://api.ipify.org?format=json")
    .then((response) => response.json())
    .then((data) => {
      ipElement.textContent = data.ip;
    })
    .catch((error) => {
      console.error("Error fetching IP:", error);
      ipElement.textContent = "Could not determine";
    });

  // Fetch container information
  fetch("/api/container-info")
    .then((response) => response.json())
    .then((data) => {
      dockerElement.textContent = data.isDocker ? "Yes" : "No";
      containerElement.textContent = data.containerName || "Not available";
      kubernetesElement.textContent = data.isKubernetes ? "Yes" : "No";
    })
    .catch((error) => {
      console.error("Error fetching container info:", error);
      dockerElement.textContent = "Could not determine";
      containerElement.textContent = "Could not determine";
      kubernetesElement.textContent = "Could not determine";
    });
});
