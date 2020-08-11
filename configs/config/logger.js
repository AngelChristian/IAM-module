const winston = require('winston');

// Logger configuration
const logConfiguration = {
    'transports': [
        // to log into file
        // new winston.transports.File({
        //     filename: './logs/data.log',
        //      format: winston.format.combine(
        //          winston.format.timestamp(),
        //          winston.format.json()
        //      ),
        // }),
        new winston.transports.Console({
            format: winston.format.combine(
                 winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.align(),
    winston.format.printf((info) => {
      const {
        timestamp, level, message, ...args
      } = info;

      const ts = timestamp.slice(0, 19).replace('T', ' ');
      return `${ts} [${level}]: ${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
    }),
            )
        }),
        
    ]
};

// Create the logger
const logger = winston.createLogger(logConfiguration);

module.exports = logger;