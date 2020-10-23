import { EventHandlerInterface } from '../eventHandler/interface';
import { ActionHandlerInterface } from '../actionHandler/interface';

export interface JobInterface {
	eventHandler: EventHandlerInterface;
	actionHandler: ActionHandlerInterface;
}
