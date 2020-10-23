import { ActionHandlerFactory } from '../factory';
import { WebhookActionHandler } from './handler';
import { ActionOptions } from '../../config/dto';
import { ActionHandlerInterface } from '../interface';

export class WebhookActionFactory extends ActionHandlerFactory {
	create(options: ActionOptions): ActionHandlerInterface {
		return new WebhookActionHandler(options);
	}
	suits(type: string) {
		return type.toLowerCase() === 'webhook';
	}
}
