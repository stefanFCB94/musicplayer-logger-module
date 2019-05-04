import * as moxios from 'moxios';
import { Logger, open_service_file } from '../src';

describe('Open service log file', () => {

  let logger: Logger;

  beforeEach(() => {
    logger = new Logger(true, 'host', 1234, 1, 'serviceName');
    logger.start();

    moxios.install();
    moxios.stubRequest('https://host:1234/v1/service/serviceName/logger', { status: 204 });
  });

  afterEach(() => {
    moxios.uninstall();
    logger.stop();
  });

  it('should call the correct url', (done) => {
    open_service_file();

    moxios.wait(() => {
      expect(moxios.requests.mostRecent().config.method).toEqual('post');
      expect(moxios.requests.mostRecent().url).toEqual('https://host:1234/v1/service/serviceName/logger');

      done();
    });
  });

});
