export interface Avatars {
	default: 'blue' | 'gray' | 'green' | 'orange' | 'red' | 'pink' | 'clyde';
	blue?: string;
	gray?: string;
	green?: string;
	orange?: string;
	red?: string;
	pink?: string;
	clyde?: string;
	[key: string]: string | undefined;
}

export interface Profile {
	author?: string;
	avatar?: string;
	bot?: boolean;
	verified?: boolean;
	server?: boolean;
	op?: boolean;
	roleColor?: string;
	roleIcon?: string;
	roleName?: string;
	clyde?: boolean;
	webhook?: boolean;
	system?: boolean;
}

export interface DiscordMessageOptions {
	avatars?: Avatars;
	profiles?: { [key: string]: Profile };
	emojis?: { [key: string]: Emoji };
	defaultTheme?: string;
	defaultMode?: string;
	defaultBackground?: 'discord' | 'none';
	useTwentyFourHourMode?: boolean;
}

export const defaultDiscordAvatars: Omit<Avatars, 'default'> = {
	blue: 'https://cdn.discordapp.com/embed/avatars/0.png',
	gray: 'https://cdn.discordapp.com/embed/avatars/1.png',
	green: 'https://cdn.discordapp.com/embed/avatars/2.png',
	orange: 'https://cdn.discordapp.com/embed/avatars/3.png',
	red: 'https://cdn.discordapp.com/embed/avatars/4.png',
	pink: 'https://cdn.discordapp.com/embed/avatars/5.png',
	clyde: 'https://i.imgur.com/CqOlANM.gif',
	automod: 'https://i.imgur.com/xKyKfyj.gif'
};

export interface Emoji {
	name?: string;
	url?: string;
	embedEmoji?: boolean;
}

const globalAvatars: Avatars = window.$discordMessage?.avatars ?? ({} as Avatars);

export const avatars: Avatars = Object.assign(defaultDiscordAvatars, globalAvatars, {
	default: defaultDiscordAvatars[globalAvatars.default] ?? globalAvatars.default ?? defaultDiscordAvatars.blue
});

export const profiles: { [key: string]: Profile } = window.$discordMessage?.profiles ?? {};

export const defaultTheme: string =
	window.$discordMessage?.defaultTheme === 'light' ? 'light' : window.$discordMessage?.defaultTheme === 'amoled' ? 'amoled' : 'dark';

export const defaultMode: string = window.$discordMessage?.defaultMode === 'compact' ? 'compact' : 'cozy';

export const defaultBackground: string = window.$discordMessage?.defaultBackground === 'none' ? 'none' : 'discord';

export const useTwentyFourHourMode: boolean = window.$discordMessage?.useTwentyFourHourMode ?? true;

declare global {
	interface Window {
		$discordMessage: DiscordMessageOptions;
	}
}
