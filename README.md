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

// Create log files to log service and request messages (optional)
open_service_file();
open_request_file('request_number');

// Log messages
log_error('request_number', 'message');
log_error('request_number', new Error('error_message'));

// Close the open file handles for the request and service log file
close_request_file('request_number');
close_service_file();

logger.stop();
```

## Available function to handle log files

* open_service_file
* open_request_file
* close_service_file
* close_request_file 

## Available functions to log messages

* log_error
* log_warn
* log_info
* log_verbose
* log_debug
* log_silly
