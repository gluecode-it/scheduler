import { ActionOptions } from '../config/dto';

export interface ActionHandlerInterface {
	do(options: ActionOptions): Promise<any>;
}
