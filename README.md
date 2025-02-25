<center>
   <img width="99" height="99" src="https://img.icons8.com/external-smashingstocks-hand-drawn-black-smashing-stocks/99/external-launch-data-analytics-smashingstocks-hand-drawn-black-smashing-stocks.png" alt="external-launch-data-analytics-smashingstocks-hand-drawn-black-smashing-stocks"/> 
   <h1>Deploy Test</h1>
</center>

A simple, small (_4.5mb-ish_) one-page application that displays:

- Domain name used to access the application
- IP address
- Current time
- Hostname
- Is it running in docker
- Is it running in k8s

## Running with Docker

### Pull & run the Docker image

```bash
docker pull ghcr.io/nafiasib/deploy-test:latest
docker run -p 3000:3000 ghcr.io/nafiasib/deploy-test:latest
```

### Build & run the Docker image

```bash
docker build -t deploy-test .
docker run -p 3000:3000 deploy-test
```

The application will be available at http://localhost:3000

## Running without Docker

If you prefer to run the application without Docker:

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   npm start
   ```

The application will be available at http://localhost:3000
