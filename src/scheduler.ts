import { Config, Job } from './config/dto';
import { EventEmitter } from 'events';
import { JobFactory } from './job/factory';

export { Config } from './config/dto';

enum Event {
	JOB_STARTED = 'JOB_STARTED',
	JOB_TRIGGERED = 'JOB_TRIGGERED',
}

export class Scheduler {
	constructor(
		private config: Config,
		private jobFactory: JobFactory,
		private emitter: EventEmitter = new EventEmitter()
	) {}

	onEventTriggered(callback: (job: Job) => void) {
		this.emitter.on(Event.JOB_TRIGGERED, callback);
	}

	start() {
		for (const job of this.config.scheduler.jobs) {
			const { actionHandler, eventHandler } = this.jobFactory.create(
				this.config.scheduler.timezone,
				job
			);
			eventHandler.onTriggered(async (job) => {
				this.emitter.emit(Event.JOB_TRIGGERED, job);
				await actionHandler.do(job);
			});
			eventHandler.start();
		}
	}
}
