import 'reflect-metadata';
import { Scheduler } from './scheduler';
import { JobFactory } from './job/factory';
import { Config, EventOptions, ActionOptions } from './config/dto';
import Timezone from 'timezone-enum';
import { EventEmitter } from 'events';
import { EventHandlerFactory } from './eventHandler/factory';
import { EventHandlerInterface } from './eventHandler/interface';
import { ActionHandlerFactory } from './actionHandler/factory';
import { ActionHandlerInterface } from './actionHandler/interface';
// import { Config } from './dto';
// import Timezone from 'timezone-enum';

const config: Config = {
	scheduler: {
		timezone: Timezone['Europe/Berlin'],
		jobs: [
			{
				name: 'test',
				event: {
					type: 'cron',
					options: {
						pattern: '* * * * *',
					},
				},
				action: {
					type: 'webhook',
					options: {
						url: 'https://example.com',
						method: 'POST',
						data: '',
					},
				},
			},
		],
	},
};

const emptyConfig: Config = {
	scheduler: {
		timezone: Timezone['Europe/Berlin'],
		jobs: [],
	},
};

function createFakeEventHandlerFactory(
	eventHandler?: EventHandlerInterface
): EventHandlerFactory {
	return {
		create: (
			timezone: Timezone,
			options: EventOptions
		): EventHandlerInterface => {
			return (
				eventHandler || {
					onTriggered: jest.fn(),
					nextDate: jest.fn(),
					start: jest.fn(),
				}
			);
		},
		suits: () => true,
	};
}

function createFakeActionHandlerFactory(): ActionHandlerFactory {
	return {
		create: (options: ActionOptions): ActionHandlerInterface => {
			return {
				do: jest.fn(),
			};
		},
		suits: () => true,
	};
}

describe(Scheduler.name, () => {
	it('should be defined', () => {
		expect(new Scheduler(emptyConfig, new JobFactory([], []))).toBeDefined();
	});

	describe('onJobTriggered()', () => {
		it('should triggered by cronjob', (done) => {
			const emitter = new EventEmitter();

			const eventHandlerFactory = createFakeEventHandlerFactory({
				onTriggered: jest.fn().mockImplementation((callback) => {
					emitter.on('__TIGGER___', callback);
				}),
				nextDate: jest.fn(),
				start: jest.fn(),
			});
			const scheduler = new Scheduler(
				config,
				new JobFactory(
					[eventHandlerFactory],
					[createFakeActionHandlerFactory()]
				),
				emitter
			);
			scheduler.onEventTriggered(() => done());
			scheduler.start();
			emitter.emit('__TIGGER___', config.scheduler.jobs[0]);
		});
	});
});
