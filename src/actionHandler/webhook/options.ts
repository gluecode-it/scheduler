import { ActionOptions } from '../../config/dto';

export interface WebhookActionOptions extends ActionOptions {
	url: string;
	method: 'GET' | 'POST';
	data: string;
}
