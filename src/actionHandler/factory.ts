import { ActionOptions } from '../config/dto';
import { ActionHandlerInterface } from './interface';

export abstract class ActionHandlerFactory {
	abstract create(options: ActionOptions): ActionHandlerInterface;
	abstract suits(type: string): boolean;
}
