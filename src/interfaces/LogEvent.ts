import { LogLevel } from '../enums/LogLevel';

export interface LogEvent {
  request: string;
  message: string | Error;
  level: LogLevel;
}
