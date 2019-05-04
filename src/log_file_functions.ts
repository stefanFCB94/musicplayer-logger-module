import { MessageBus } from './message-bus';
import { OpenRequestEvent } from './interfaces/OpenRequestEvent';
import { CloseRequestEvent } from './interfaces/CloseRequestEvent';


export function open_request_file(request: string) {
  MessageBus.Instance.emitter.emit('open-request', { request } as OpenRequestEvent);
}

export function close_request_file(request: string) {
  MessageBus.Instance.emitter.emit('close-request', { request } as CloseRequestEvent);
}

export function open_service_file() {
  MessageBus.Instance.emitter.emit('open-service');
}

export function close_service_file() {
  MessageBus.Instance.emitter.emit('close-service');
}
