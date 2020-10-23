import 'reflect-metadata';
import { ConfigLoader } from './loader';

describe(ConfigLoader.name, () => {
	describe('load()', () => {
		it('should load a valid file from disk and returns config', () => {
			expect(ConfigLoader.load('test/valid_config.yml')).resolves.toEqual({
				scheduler: {
					timezone: 'Europe/Berlin',
					jobs: [
						{
							cron_pattern: '* * * * *',
							name: 'test',
							webhook: {
								data: null,
								method: 'POST',
								url: 'https://example.com',
							},
						},
					],
				},
			});
		});
	});
});
