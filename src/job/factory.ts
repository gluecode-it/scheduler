import { Job, Action, Event } from '../config/dto';
import { EventHandlerFactory } from '../eventHandler/factory';
import { ActionHandlerFactory } from '../actionHandler/factory';
import { JobInterface } from './interface';
import Timezone from 'timezone-enum';
import { EventHandlerInterface } from '../eventHandler/interface';
import { ActionHandlerInterface } from '../actionHandler/interface';

export class JobFactory {
	constructor(
		private eventFactoryList: EventHandlerFactory[],
		private actionFactoryList: ActionHandlerFactory[]
	) {}

	create(timezone: Timezone, job: Job): JobInterface {
		return {
			eventHandler: this.getEventFactory(timezone, job.event),
			actionHandler: this.getActionFactory(job.action),
		};
	}

	private getEventFactory(
		timezone: Timezone,
		event: Event
	): EventHandlerInterface {
		const factory = this.eventFactoryList.find((factory) => {
			return factory.suits(event.type);
		});
		if (!factory) {
			throw Error(`event factory for type "${event.type}" not found!`);
		}
		return factory.create(timezone, event.options);
	}

	private getActionFactory(action: Action): ActionHandlerInterface {
		const factory = this.actionFactoryList.find((factory) => {
			return factory.suits(action.type);
		});
		if (!factory) {
			throw Error(`action factory for type "${action.type}" not found!`);
		}
		return factory.create(action);
	}
}
