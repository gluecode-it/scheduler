import { IsUrl, IsEnum, IsString } from 'class-validator';
import Method from 'http-method-enum';

export class WebHook {
	@IsUrl()
	url: string;

	@IsEnum(Method)
	method: 'GET' | 'POST';

	@IsString()
	data: string;
}
