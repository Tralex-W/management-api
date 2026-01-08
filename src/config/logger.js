import winston from "winston";

const LOGGER = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: winston.format.combine(
    (winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()),
  ),
  defaultMeta: { service: "management-api" },
  transports: [
    //importance level of error
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});

//log to the console when not in production
if (process.env.NODE_ENV !== "production") {
  LOGGER.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
      ),
    }),
  );
}

export default LOGGER;
