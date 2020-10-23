import { Debugger } from 'debug';

export class Logger {
	private log: Debugger;
	constructor(debug: Debugger) {
		this.log = debug;
	}

	printNextEvent(nextDate: moment.Moment) {
		this.log(
			`Next event at: ${nextDate.toLocaleString()} (${nextDate.fromNow()})`
		);
	}

	printTiggered(type: string) {
		this.log(`${type} trigger`);
	}

	printError(err: Error) {
		this.log(err);
	}

	printScheduled(cronPattern: string) {
		this.log(`scheduled with pattern "${cronPattern}"`);
	}
}
