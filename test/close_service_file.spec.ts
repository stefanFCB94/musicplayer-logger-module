import * as moxios from 'moxios';
import { Logger, close_service_file } from '../src';


describe('Close service log file', () => {

  let logger: Logger;

  beforeEach(() => {
    logger = new Logger(true, 'host', 1234, 1, 'serviceName');
    logger.start();

    moxios.install();
    moxios.stubRequest('https://host:1234/v1/service/serviceName/logger', { status: 204 });
  });

  it('should call the correct url', (done) => {
    close_service_file();

    moxios.wait(() => {
      expect(moxios.requests.mostRecent().config.method).toEqual('delete');
      expect(moxios.requests.mostRecent().url).toEqual('https://host:1234/v1/service/serviceName/logger');

      done();
    });
  });

});

