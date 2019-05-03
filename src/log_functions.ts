import { LogLevel } from './enums/LogLevel';
import { MessageBus } from './message-bus';
import { LogEvent } from './interfaces/LogEvent';


function log(request: string, message: string | Error, level: LogLevel) {
  MessageBus.Instance.emitter.emit('log', { request, message, level } as LogEvent);
}

export function log_error(request: string, message: string | Error) {
  log(request, message, LogLevel.ERROR);
}

export function log_warn(request: string, message: string | Error) {
  log(request, message, LogLevel.WARN);
}

export function log_info(request: string, message: string | Error) {
  log(request, message, LogLevel.INFO);
}

export function log_verbose(request: string, message: string | Error) {
  log(request, message, LogLevel.VERBOSE);
}

export function log_debug(request: string, message: string | Error) {
  log(request, message, LogLevel.DEBUG);
}

export function log_silly(request: string, message: string | Error) {
  log(request, message, LogLevel.SILLY);
}
