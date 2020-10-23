import { Logger } from './logger';
import debug from 'debug';

export class LoggerFactory {
	create(namespace: string) {
		return new Logger(debug(namespace));
	}
}
