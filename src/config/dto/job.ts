/* istanbul ignore file */
import { IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Event } from './event';
import { Action } from './action';

export class Job {
	@IsString()
	name: string;

	@ValidateNested()
	@Type(() => Event)
	event: Event;

	@ValidateNested()
	@Type(() => Action)
	action: Action;
}
