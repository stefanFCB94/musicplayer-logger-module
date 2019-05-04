import * as moxios from 'moxios';
import { Logger, open_request_file } from '../src';


describe('Open request log file', () => {

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
    open_request_file('r1');

    moxios.wait(() => {
      expect(moxios.requests.mostRecent().config.method).toEqual('post');
      expect(moxios.requests.mostRecent().url).toEqual('https://host:1234/v1/request/r1/logger');

      done();
    });
  });

});
