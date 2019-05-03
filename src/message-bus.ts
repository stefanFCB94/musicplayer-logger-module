import { EventEmitter } from 'events';

export class MessageBus {

  private static instance: MessageBus;
  public emitter: EventEmitter;


  private constructor() {
    this.emitter = new EventEmitter();
  }


  public static get Instance() {
    return this.instance || (this.instance = new this());
  }

}
