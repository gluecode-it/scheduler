/* istanbul ignore file */
import { ValidateNested } from 'class-validator';
import { SchedulerConfig } from './scheduler';
import { Type } from 'class-transformer';

export class Config {
	@ValidateNested()
	@Type(() => SchedulerConfig)
	scheduler: SchedulerConfig;
}
