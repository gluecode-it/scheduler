import { IsString, IsObject } from 'class-validator';
import { ActionOptions } from './actionOptions';

export class Action {
	@IsString()
	type: string;

	@IsObject()
	options: ActionOptions;
}
