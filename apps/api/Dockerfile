FROM golang:1.23.4-alpine

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -o /movies-api

EXPOSE 8081
CMD ["/movies-api"]