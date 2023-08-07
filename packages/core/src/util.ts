import type { Emoji } from './options';

export type DiscordTimestamp = Date | string | number | null;

export const handleTimestamp = (value: DiscordTimestamp, hour24 = false): string | null => {
	if (!(value instanceof Date) && typeof value !== 'string' && typeof value !== 'number') {
		throw new TypeError('Timestamp prop must be a Date object, a number or a string.');
	}

	let converted: Date | string | number;

	if (typeof value === 'string') {
		const parsed = parseInt(value, 10);
		if (!isNaN(parsed)) {
			value = parsed;
		}
	}

	if (typeof value === 'number') {
		converted = timestampToDate(value);
	} else {
		converted = value;
	}

	return new Date(converted)
		.toLocaleDateString(undefined, {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
			hour12: !hour24
		})
		.replace(',', '');
};

export const timestampToDate = (timestamp: number): Date => {
	return new Date(timestamp * 1000);
};

export const getGlobalEmojiUrl = (emojiName: string): Emoji | undefined => window.$discordMessage?.emojis?.[emojiName];
