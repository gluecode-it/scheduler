import { IsString, IsObject } from 'class-validator';
import { EventOptions } from './eventOptions';

export class Event {
	@IsString()
	type: string;

	@IsObject()
	options: EventOptions;
}
