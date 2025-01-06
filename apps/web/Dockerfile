FROM nixpacks/nixpacks AS builder

WORKDIR /app
COPY . .

RUN nixpacks build . \
    --name web \
    --pkgs bun \
    --install-cmd "bun install" \
    --build-cmd "bun run build" \
    --start-cmd "bun start"

FROM nixpacks/nixpacks
COPY --from=builder /app /app
WORKDIR /app
EXPOSE 3000
CMD ["bun", "start"]