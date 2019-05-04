import moxios = require('moxios');
import { log_warn, Logger } from '../src';


describe('Log warning message', () => {

  let logger: Logger;

  beforeEach(() => {
    logger = new Logger(true, 'host', 1234, 1, 'serviceName');
    logger.start();

    moxios.install();
    moxios.stubRequest('https://host:1234/v1/logs', { status: 204 });
  });

  afterEach(() => {
    moxios.uninstall();
    logger.stop();
  });


  it('should call the correct url', (done) => {
    log_warn('123', 'abc');

    moxios.wait(() => {
      expect(moxios.requests.mostRecent().config.method).toEqual('post');
      expect(moxios.requests.mostRecent().url).toEqual('https://host:1234/v1/logs');
      done();
    });
  });

  it('should log the correct service name', (done) => {
    log_warn('123', 'abc');

    moxios.wait(() => {
      const data: any = JSON.parse(moxios.requests.mostRecent().config.data);
      expect(typeof data === 'object').toBeTruthy();
      expect(data.service).toEqual('serviceName');
      done();
    });
  });

  it('should log the message with warn level', (done) => {
    log_warn('123', 'abc');

    moxios.wait(() => {
      expect(JSON.parse(moxios.requests.mostRecent().config.data).level).toEqual('warn');
      done();
    });
  });

  it('should log the correct request number for the log message', (done) => {
    log_warn('123', 'abc');

    moxios.wait(() => {
      expect(JSON.parse(moxios.requests.mostRecent().config.data).request).toEqual('123');
      done();
    });
  });

  it('should log the correct message, when a string should be logged', (done) => {
    log_warn('123', 'abc');

    moxios.wait(() => {
      expect(JSON.parse(moxios.requests.mostRecent().config.data).message).toEqual('abc');
      done();
    });
  });

  it('should log the correct messages, if a error should be logged', (done) => {
    const error = new Error('message');
    log_warn('123', error);


    moxios.wait(() => {
      const firstRequest = JSON.parse(moxios.requests.first().config.data);
      const secondRequest = JSON.parse(moxios.requests.at(1).config.data);
      const thirdRequest = JSON.parse(moxios.requests.mostRecent().config.data);

      expect(moxios.requests.count()).toEqual(3);
      expect(firstRequest.message).toEqual(error.name);
      expect(secondRequest.message).toEqual('message');
      expect(thirdRequest.message).toEqual(error.stack);

      done();
    });
  });

});
