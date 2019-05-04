import * as axios from 'axios';

import { LogLevel } from './enums/LogLevel';
import { MessageBus } from './message-bus';
import { LogEvent } from './interfaces/LogEvent';
import { OpenRequestEvent } from './interfaces/OpenRequestEvent';
import { CloseRequestEvent } from './interfaces/CloseRequestEvent';


export class Logger {


  private url: string;
  private serviceName: string;


  constructor(https: boolean, host: string, port: number, version: number, serviceName: string) {
    const protocol = https ? 'https' : 'http';
    this.url = `${protocol}://${host}:${port}/v${version}`;

    this.serviceName = serviceName;
  }


  public start() {
    MessageBus.Instance.emitter.addListener('log', this.log_listener.bind(this));

    MessageBus.Instance.emitter.addListener('open-request', this.open_request_listener.bind(this));
    MessageBus.Instance.emitter.addListener('close-request', this.close_request_listener.bind(this));

    MessageBus.Instance.emitter.addListener('open-service', this.open_service_listener.bind(this));
    MessageBus.Instance.emitter.addListener('close-service', this.close_service_listener.bind(this));

    process.addListener('unhandledRejection', this.unhandled_listener.bind(this));
    process.addListener('uncaughtException', this.unhandled_listener.bind(this));
  }

  public stop() {
    MessageBus.Instance.emitter.removeAllListeners();
    process.removeAllListeners();
  }



  private log_listener(event: LogEvent) {
    return this.log(event.request, event.message, event.level);
  }

  private unhandled_listener(error: Error) {
    this.log('__UNHANDLED__', error, LogLevel.ERROR);
  }

  private async open_request_listener(event: OpenRequestEvent) {
    try {
      await axios.default.post(`${this.url}/request/${event.request}/logger`);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  private async open_service_listener() {
    try {
      await axios.default.post(`${this.url}/service/${this.serviceName}/logger`);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  private async close_request_listener(event: CloseRequestEvent) {
    try {
      await axios.default.delete(`${this.url}/request/${event.request}/logger`);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  private async close_service_listener() {
    try {
      await axios.default.delete(`${this.url}/service/${this.serviceName}/logger`);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
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
      await axios.default.post(`${this.url}/logs`, body);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }


}
