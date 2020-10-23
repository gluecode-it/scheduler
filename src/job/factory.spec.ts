import { JobFactory } from './factory';
import { EventHandlerInterface } from '../eventHandler/interface';
import { EventHandlerFactory } from '../eventHandler/factory';
import Timezone from 'timezone-enum';
import { EventOptions, ActionOptions } from '../config/dto';
import { ActionHandlerFactory } from '../actionHandler/factory';
import { ActionHandlerInterface } from '../actionHandler/interface';

function createFakeEventHandlerFactory(params: {
	eventHandler?: EventHandlerInterface;
	suits: boolean;
}): EventHandlerFactory {
	return {
		create: (
			timezone: Timezone,
			options: EventOptions
		): EventHandlerInterface => {
			return (
				params?.eventHandler || {
					onTriggered: jest.fn(),
					nextDate: jest.fn(),
					start: jest.fn(),
				}
			);
		},
		suits: () => params?.suits,
	};
}

function createFakeActionHandlerFactory(params: {
	suits: boolean;
}): ActionHandlerFactory {
	return {
		create: (options: ActionOptions): ActionHandlerInterface => {
			return {
				do: jest.fn(),
			};
		},
		suits: () => params.suits,
	};
}

describe(JobFactory.name, () => {
	it('should be defined', () => {
		expect(new JobFactory([], [])).toBeDefined();
	});

	describe('create()', () => {
		it('should return a eventHandler', () => {
			const jobFactory = new JobFactory(
				[createFakeEventHandlerFactory({ suits: true })],
				[createFakeActionHandlerFactory({ suits: true })]
			);

			const job = jobFactory.create(Timezone['Europe/Berlin'], {
				name: 'a job',
				action: {
					type: 'type',
					options: {},
				},
				event: {
					type: 'event',
					options: {},
				},
			});
			expect(job).toHaveProperty('eventHandler');
		});
		it('should return a actionHandler', () => {
			const jobFactory = new JobFactory(
				[createFakeEventHandlerFactory({ suits: true })],
				[createFakeActionHandlerFactory({ suits: true })]
			);

			const job = jobFactory.create(Timezone['Europe/Berlin'], {
				name: 'a job',
				action: {
					type: 'type',
					options: {},
				},
				event: {
					type: 'event',
					options: {},
				},
			});
			expect(job).toHaveProperty('actionHandler');
		});

		it('should throw error if no eventHandler matches', () => {
			const jobFactory = new JobFactory(
				[createFakeEventHandlerFactory({ suits: false })],
				[createFakeActionHandlerFactory({ suits: true })]
			);

			expect(() =>
				jobFactory.create(Timezone['Europe/Berlin'], {
					name: 'a job',
					action: {
						type: 'type',
						options: {},
					},
					event: {
						type: 'event',
						options: {},
					},
				})
			).toThrow();
		});

		it('should throw error if no actionHandler matches', () => {
			const jobFactory = new JobFactory(
				[createFakeEventHandlerFactory({ suits: true })],
				[createFakeActionHandlerFactory({ suits: false })]
			);

			expect(() =>
				jobFactory.create(Timezone['Europe/Berlin'], {
					name: 'a job',
					action: {
						type: 'type',
						options: {},
					},
					event: {
						type: 'event',
						options: {},
					},
				})
			).toThrow();
		});
	});
});
