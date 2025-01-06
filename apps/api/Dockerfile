FROM nixpacks/nixpacks AS builder

WORKDIR /app
COPY . .

RUN nixpacks build . \ 
    --name api \
    --pkgs go@latest \ 
    --build-cmd "go build -o main ." \
    --start-cmd "./main"

FROM nixpacks/nixpacks
COPY --from=builder /app /app
WORKDIR /app
EXPOSE 8080
CMD ["./main"]