import { parseUnixTimestamp } from './utils';

describe('parseUnixTimestamp', () => {
	test('should return a valid date in a human readable format', () => {
		const timestamp = 1588197712263;

		const result = parseUnixTimestamp(timestamp);

		expect(result).toBe('2020-04-30 00:01');
	});

	test('should return another valid date in a human readable format', () => {
		const timestamp = 1479798793044;

		const result = parseUnixTimestamp(timestamp);

		expect(result).toBe('2016-11-22 08:13');
	});
});
