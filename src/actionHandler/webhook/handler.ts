import { ActionOptions } from '../../config/dto';
import Axios from 'axios';
import { ActionHandlerInterface } from '../interface';

export class WebhookActionHandler implements ActionHandlerInterface {
	constructor(private options: ActionOptions) {}
	async do() {
		return Axios(this.options);
	}
}
