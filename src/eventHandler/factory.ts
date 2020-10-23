import Timezone from 'timezone-enum';
import { EventHandlerInterface } from './interface';
import { EventOptions } from '../config/dto/eventOptions';

export abstract class EventHandlerFactory {
	abstract create(
		timezone: Timezone,
		event: EventOptions
	): EventHandlerInterface;
	abstract suits(type: string): boolean;
}
