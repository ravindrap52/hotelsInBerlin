import winston from 'winston';

const { timestamp, json, colorize } = winston.format;

export const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    timestamp({
      format: 'YYYY-MM-DD hh:mm:ss.SSS A'
    }),
    json(),
    colorize({ all: true })
  )
});
