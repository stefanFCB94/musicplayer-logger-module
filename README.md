[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://travis-ci.org/stefanFCB94/musicplayer-logger-module.svg?branch=master)](https://travis-ci.org/stefanFCB94/musicplayer-logger-module)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/4745ed1b73fe4441a8f6fb1cd1fa3db1)](https://www.codacy.com/app/stefanFCB94/musicplayer-logger-module?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=stefanFCB94/musicplayer-logger-module&amp;utm_campaign=Badge_Grade)

# Logger module to use in musicplayer microservice environment

NPM package, which can be used in the musicplayer repository.

## Usage

```typescript
import { Logger, log_error } from '@musicplayer/logger-module';

// Address of the logger microservice
const useHttps = true;
const host = host;
const port = port;
const version = 1;

// Name of the service, on which the module is used
const serviceName = 'serviceName';

const logger = new Logger(useHttps, host, port, version, serviceName);
logger.start();

log_error('request_number', 'message');
log_error('request_number', new Error('error_message'));

logger.stop();
```

## Available functions

* log_error
* log_warn
* log_info
* log_verbose
* log_debug
* log_silly
