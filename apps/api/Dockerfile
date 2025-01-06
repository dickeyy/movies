# Use golang image for building
FROM golang:1.23.4-alpine

# Set working directory
WORKDIR /app

# Copy go mod and sum files
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy the source code
COPY . .

# Build the application
RUN CGO_ENABLED=0 go build -o main .

# Expose the port the app runs on
EXPOSE 8080

# Run the application
CMD ["./main"]