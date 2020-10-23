/* istanbul ignore file */
import { IsString, ValidateNested, IsArray } from 'class-validator';
import { Job } from './job';
import { Type } from 'class-transformer';
import Timezone from 'timezone-enum';

export class SchedulerConfig {
	@IsString()
	timezone: Timezone;

	@IsArray()
	@ValidateNested()
	@Type(() => Job)
	jobs: Job[];
}
