'use strict';

import winston from 'winston';

const logExt = '.log';

/**
 * Wrapper around Winston
 */
class Logger {
  static winstonInstance = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
      //
      // - Write to all logs with level `info` and below to `combined.log`
      // - Write all logs error (and below) to `error.log`.
      //
    //   new winston.transports.File({ filename: 'error.log', level: 'error' }),
    //   new winston.transports.File({ filename: 'combined.log' })
        new winston.transports.Console({

        })
    ]
  })

  static getLevel() {
    return Logger.winstonInstance.level || process.env.LOG_LEVEL || 'debug';
  }

  static setLevel(level) {
    Logger.winstonInstance.level = level;
  }

  /*
    Medium priority logging, default.
  */
  static log(message: string, ...meta: any[]) {
    Logger.winstonInstance.log('info', message, ...meta);
  }

  /*
    Appends red "ERROR" to the start of logs.
    Highest priority logging.
  */
  static error(message: string, ...meta: any[]) {
    Logger.winstonInstance.log('error', message, ...meta);
  }

  /*
    Less high priority than error, still higher visibility than default.
  */
  static warn(message: string, ...meta: any[]) {
    Logger.winstonInstance.log('warn', message, ...meta);
  }

  /*
    Lower priority logging.
    Only logs if the environment variable is set to VERBOSE.
  */
  static verbose(message: string, ...meta: any[]) {
    Logger.winstonInstance.log('verbose', message, ...meta);
  }

  //TODO: Be able to set and deactivate file logging via a server command.
  static setFileLogging(path) {
    if (!path.endsWith(logExt)) {
      path += logExt;
    }
    console.log("Adding file logging at " + path);
    Logger.winstonInstance.add(new winston.transports.File({
        filename: path,
        // timestamp: true
    }))
  }

  static deactivateFileLogging() {
    Logger.winstonInstance.remove(winston.transports.File);
  }

  static enablePrettyErrors() {
    // const longjohn = require('longjohn');
    const pe = require('pretty-error').start();
    pe.skipNodeFiles(); // Ignore native node files in stacktrace.
  }

}

export default Logger
