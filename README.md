# Deploy Test

A simple one-page application that displays:

- Domain name used to access the application
- IP address
- Current time
- Is it running in docker
- Hostname
- Is it running in k8s

## Running with Docker

### Build the Docker image

```bash
docker build -t deploy-test .
```

### Run the container

```bash
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
