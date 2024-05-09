const winston = require("winston");
const { ElasticsearchTransport } = require("winston-elasticsearch");

// Elasticsearch client configuration
const esTransportOpts = {
  level: "info",
  clientOpts: {
    node: "http://localhost:9200", // URL of your Elasticsearch instance
    log: "info",
  },
  indexPrefix: "my-node-app-logs",
  bufferLimit: 100, // How many logs to buffer before bulk-sending (adjust as needed)
  messageType: "log",
};

// Configure Winston logger
const logger = winston.createLogger({
  level: "info", // Minimum log level to record
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.errors({ stack: true }), // Capture stack trace
    winston.format.splat(),
    winston.format.json()
  ),
  defaultMeta: { service: "user-service" }, // Default metadata to log
  transports: [
    // File transport for error logging
    new winston.transports.File({
      filename: "errors.log",
      level: "error",
    }),
    // Elasticsearch transport for sending logs to Elasticsearch
    new ElasticsearchTransport(esTransportOpts),
  ],
});

// Add console log transport only if not in production
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    })
  );
}

module.exports = logger;
