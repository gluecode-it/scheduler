import 'reflect-metadata';
import { Logger } from './logger';
import { unix } from 'moment';
import { Debugger } from 'debug';

describe(Logger.name, () => {
	describe(`printNextEvent()`, () => {
		it('should call debug', () => {
			const debug = (jest.fn() as unknown) as Debugger;
			const logger = new Logger(debug);
			logger.printNextEvent(unix(0));
			expect(debug).toBeCalledTimes(1);
		});
	});

	describe(`printTiggered()`, () => {
		it('should call debug', () => {
			const debug = (jest.fn() as unknown) as Debugger;
			const logger = new Logger(debug);
			logger.printTiggered('name');
			expect(debug).toBeCalledTimes(1);
		});
	});

	describe(`printError()`, () => {
		it('should call debug', () => {
			const debug = (jest.fn() as unknown) as Debugger;
			const logger = new Logger(debug);
			logger.printError(new Error());
			expect(debug).toBeCalledTimes(1);
		});
	});

	describe(`printScheduled()`, () => {
		it('should call debug', () => {
			const debug = (jest.fn() as unknown) as Debugger;
			const logger = new Logger(debug);
			logger.printScheduled('* * * * * *');
			expect(debug).toBeCalledTimes(1);
		});
	});
});
