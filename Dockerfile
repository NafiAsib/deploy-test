FROM golang:1.23-alpine AS go-builder

WORKDIR /app

COPY main.go .

RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -ldflags="-s -w" -o server .

FROM scratch AS runtime

COPY --from=go-builder /app/server /server

COPY index.html styles.css script.js /

EXPOSE 3000

CMD ["/server"]