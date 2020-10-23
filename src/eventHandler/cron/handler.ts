import { CronJob as CronJobDep } from 'cron';
import { EventEmitter } from 'events';
import Timezone from 'timezone-enum';
import { CronEventOptions } from './options';
import { EventHandlerInterface } from '../interface';

enum EmitterEvent {
	TRIGGER = 'trigger',
	STARTED = 'started',
}

export class CronEventHandler implements EventHandlerInterface {
	private emitter: EventEmitter;
	private cronjob: CronJobDep;

	constructor(timezone: Timezone, private eventOptions: CronEventOptions) {
		this.emitter = new EventEmitter();
		this.cronjob = new CronJobDep(
			this.eventOptions.pattern,
			() => {
				this.emitter.emit(EmitterEvent.TRIGGER, this.eventOptions);
			},
			null,
			false,
			timezone
		);
	}

	onTriggered(callback: (options: CronEventOptions) => void) {
		this.emitter.on(EmitterEvent.TRIGGER, callback);
	}

	nextDate() {
		return this.cronjob.nextDate().toDate();
	}

	start() {
		this.cronjob.start();
	}
}
