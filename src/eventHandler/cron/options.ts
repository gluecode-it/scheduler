import { Options } from '../../config/dto';

export interface CronEventOptions extends Options {
	pattern: string;
}
