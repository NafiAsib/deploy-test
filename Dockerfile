FROM alpine:3.18 AS build

WORKDIR /app

COPY index.html styles.css script.js server.js ./

FROM alpine:3.18 AS runtime

# Install only the Node.js binary without npm and other tools
RUN apk add --no-cache nodejs-current && \
    addgroup -S nodeapp && \
    adduser -S -G nodeapp nodeapp

WORKDIR /app

COPY --from=build --chown=nodeapp:nodeapp /app/index.html /app/styles.css /app/script.js /app/server.js ./

USER nodeapp

EXPOSE 3000

CMD ["node", "server.js"] 