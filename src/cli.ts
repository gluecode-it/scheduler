import 'reflect-metadata';
import 'source-map-support/register';
import { Scheduler } from './scheduler';
import { ConfigLoader } from './config/loader';
import { JobFactory } from './job/factory';
import { CronEventFactory } from './eventHandler/cron/factory';
import { WebhookActionFactory } from './actionHandler/webhook/factory';

(async () => {
	const cronjobFactory = new JobFactory(
		[new CronEventFactory()],
		[new WebhookActionFactory()]
	);
	const configPath = process.env.CONFIG || 'config.yml';
	const config = await ConfigLoader.load(configPath);
	const scheduler = new Scheduler(config, cronjobFactory);
	scheduler.start();
})();
