import { plainToClass } from 'class-transformer';
import { readFileSync } from 'fs';
import { safeLoad } from 'js-yaml';
import { validate } from 'class-validator';
import { Config } from './dto';

export class ConfigLoader {
	static async load(filePath: string): Promise<Config> {
		const yamlContent = readFileSync(filePath).toString();
		const config = plainToClass(Config, safeLoad(yamlContent));
		await validate(config, {
			whitelist: true,
			forbidNonWhitelisted: true,
			validationError: { target: false },
		});
		return config;
	}
}
