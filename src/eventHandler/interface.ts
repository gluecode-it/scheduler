import { EventOptions } from '../config/dto';

export interface EventHandlerInterface {
	onTriggered: (callback: (options: EventOptions) => void) => void;
	nextDate(): Date;
	start(): void;
}
