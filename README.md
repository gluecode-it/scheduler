[![NPM Version](https://img.shields.io/npm/v/@gluecode-it/scheduler.svg?style=flat-square)](https://www.npmjs.com/package/@gluecode-it/scheduler)

A framework for triggering events of all kinds

## Contents

- [Installation](#installation)
- [Quick Start](#quick-start)

## Installation

```bash
$ npm install @gluecode-it/scheduler
```

You should also install at least one event handler and one action handler. As example: Cron base trigger to send a http request.
```bash
$ npm install \
    @gluecode-it/scheduler-actionhandler-request \   
    @gluecode-it/scheduler-eventhandler-cron
```
## Quick Start

```bash
$ npm install debug
```
```js
import { Scheduler, JobFactory, ConfigLoader } from '@gluecode-it/scheduler';
import { CronEventHandlerFactory } from '@gluecode-it/scheduler-eventhandler-cron';
import { RequestActionHandlerFactory } from '@gluecode-it/scheduler-actionhandler-request';
import debug from 'debug';

(async () => {
	const cronjobFactory = new JobFactory(
		[new CronEventHandlerFactory()],
		[new RequestActionHandlerFactory()]
	);
	const config = await ConfigLoader.load('config.yml');
	const scheduler = new Scheduler(config, cronjobFactory);
	scheduler.onEventTriggered((job) => {
		debug(`scheduler.${job.name}`)('triggered');
	});
	scheduler.start();
	debug('scheduler')('started');
})();

```

## See also
* [@gluecode-it/scheduler-eventhandler-cron](https://github.com/gluecode-it/scheduler-eventhandler-cron)
* [@gluecode-it/scheduler-actionhandler-request](https://github.com/gluecode-it/scheduler-actionhandler-request)