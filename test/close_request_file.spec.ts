import * as moxios from 'moxios';
import { Logger, close_request_file } from '../src';


describe('Close request log file', () => {

  let logger: Logger;

  beforeEach(() => {
    logger = new Logger(true, 'host', 1234, 1, 'serviceName');
    logger.start();

    moxios.install();
    moxios.stubRequest('https://host:1234/v1/request/r1/logger', { status: 204 });
  });

  afterEach(() => {
    moxios.uninstall();
    logger.stop();
  });

  it('should call the correct url', (done) => {
    close_request_file('r1');

    moxios.wait(() => {
      expect(moxios.requests.mostRecent().config.method).toEqual('delete');
      expect(moxios.requests.mostRecent().url).toEqual('https://host:1234/v1/request/r1/logger');

      done();
    });
  });

});
