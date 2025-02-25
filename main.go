package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
)

type ContainerInfo struct {
	ContainerName string `json:"containerName"`
	IsDocker      bool   `json:"isDocker"`
	IsKubernetes  bool   `json:"isKubernetes"`
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		path := r.URL.Path
		if path == "/" {
			path = "/index.html"
		}

		// Get content type based on file extension
		var contentType string
		switch filepath.Ext(path) {
		case ".html":
			contentType = "text/html"
		case ".css":
			contentType = "text/css"
		case ".js":
			contentType = "text/javascript"
		default:
			contentType = "text/plain"
		}

		if contentType != "" {
			w.Header().Set("Content-Type", contentType)
		}

		http.ServeFile(w, r, "."+path)
	})

	http.HandleFunc("/api/container-info", func(w http.ResponseWriter, r *http.Request) {
		info := ContainerInfo{
			IsDocker:      false,
			ContainerName: "",
			IsKubernetes:  false,
		}

		if _, err := os.Stat("/.dockerenv"); err == nil {
			info.IsDocker = true
		}

		if hostname, err := exec.Command("hostname").Output(); err == nil {
			info.ContainerName = strings.TrimSpace(string(hostname))
		}

		if os.Getenv("KUBERNETES_SERVICE_HOST") != "" || os.Getenv("KUBERNETES_PORT") != "" {
			info.IsKubernetes = true
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(info)
	})

	fmt.Printf("Server running on port %s\n", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
