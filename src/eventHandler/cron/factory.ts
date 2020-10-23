import Timezone from 'timezone-enum';
import { EventHandlerFactory } from '../factory';
import { EventHandlerInterface } from '../interface';
import { CronEventHandler } from './handler';
import { CronEventOptions } from './options';

export class CronEventFactory extends EventHandlerFactory {
	create(timezone: Timezone, options: CronEventOptions): EventHandlerInterface {
		return new CronEventHandler(timezone, options);
	}
	suits(type: string) {
		return type.toLowerCase() === 'cron';
	}
}
