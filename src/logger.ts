import * as axios from 'axios';

import { LogLevel } from './enums/LogLevel';
import { MessageBus } from './message-bus';
import { LogEvent } from './interfaces/LogEvent';


export class Logger {


  private url: string;
  private serviceName: string;


  constructor(https: boolean, host: string, port: number, version: number, serviceName: string) {
    const protocol = https ? 'https' : 'http';
    this.url = `${protocol}://${host}:${port}/v${version}/logs`;

    this.serviceName = serviceName;
  }


  public start() {
    MessageBus.Instance.emitter.addListener('log', this.listener.bind(this));

    process.addListener('unhandledRejection', this.unhandled_listener.bind(this));
    process.addListener('uncaughtException', this.unhandled_listener.bind(this));
  }

  public stop() {
    MessageBus.Instance.emitter.removeAllListeners();
    process.removeAllListeners();
  }



  private listener(event: LogEvent) {
    return this.log(event.request, event.message, event.level);
  }

  private unhandled_listener(error: Error) {
    this.log('__UNHANDLED__', error, LogLevel.ERROR);
  }

  private async log(request: string, message: string | Error, level: LogLevel) {
    if (message instanceof Error) {
      await this.log(request, message.name, level);
      await this.log(request, message.message, level);
      await this.log(request, message.stack, level);
      return true;
    }


    const body = {
      request,
      message,
      level,
      service: this.serviceName,
    };

    try {
      await axios.default.post(this.url, body);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }


}
