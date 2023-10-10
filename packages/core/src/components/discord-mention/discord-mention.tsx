import { Component, ComponentInterface, Element, h, Host, Prop, Watch } from '@stencil/core';
import hexToRgba from 'hex-to-rgba';
import ChannelForum from '../svgs/channel-forum';
import ChannelIcon from '../svgs/channel-icon';
import ChannelThread from '../svgs/channel-thread';
import LockedVoiceChannel from '../svgs/locked-voice-channel';
import VoiceChannel from '../svgs/voice-channel';
import CustomizeCommunity from '../svgs/customize-community';
import BrowseChannels from '../svgs/browse-channels';
import ServerGuide from '../svgs/server-guide';
import Members from '../svgs/members';

@Component({
	tag: 'discord-mention',
	styleUrl: 'discord-mention.css'
})
export class DiscordMention implements ComponentInterface {
	/**
	 * The DiscordMention element
	 */
	@Element()
	public el: HTMLElement;

	/**
	 * Whether this entire message block should be highlighted (to emulate the "logged in user" being pinged).
	 */
	@Prop()
	public highlight = false;

	/**
	 * The color to use for this mention. Only works for role mentions and must be in hex format.
	 */
	@Prop()
	public color: string;

	/**
	 * The type of mention this should be. This will prepend the proper prefix character.
	 * Valid values: `user`, `channel`, `role`, `voice`, `locked`, `thread`, `forum`, and `slash`.
	 */
	@Prop()
	public type:
		| 'user'
		| 'channel'
		| 'role'
		| 'voice'
		| 'locked'
		| 'thread'
		| 'forum'
		| 'slash'
		| 'automod'
		| 'customize'
		| 'browse'
		| 'guide'
		| 'members' = 'user';

	@Watch('type')
	public handleType(value: string) {
		if (typeof value !== 'string') {
			throw new TypeError('DiscordMention `type` prop must be a string.');
		} else if (
			![
				'user',
				'channel',
				'role',
				'voice',
				'locked',
				'thread',
				'forum',
				'slash',
				'automod',
				'customize',
				'browse',
				'guide',
				'members'
			].includes(value)
		) {
			throw new RangeError(
				"DiscordMention `type` prop must be one of: 'user', 'channel', 'role', 'voice', 'locked', 'thread', 'forum', 'slash', 'automod', 'customize', 'browse', 'guide' or 'members'."
			);
		}
	}

	public componentWillRender() {
		this.handleType(this.type);
	}

	public componentDidLoad() {
		if (this.color && this.type === 'role') {
			this.el.addEventListener('mouseover', this.setHoverColor.bind(this));
			this.el.addEventListener('mouseout', this.resetHoverColor.bind(this));
		}
	}

	public disconnectedCallback() {
		if (this.color && this.type === 'role') {
			this.el.removeEventListener('mouseover', this.setHoverColor.bind(this));
			this.el.removeEventListener('mouseout', this.resetHoverColor.bind(this));
		}
	}

	public setHoverColor() {
		if (this.type !== 'automod') {
			this.el.style.backgroundColor = hexToRgba(this.color, 0.3);
		}
	}

	public resetHoverColor() {
		if (this.type !== 'automod') {
			this.el.style.backgroundColor = hexToRgba(this.color, 0.1);
		}
	}

	public render() {
		const { color, type }: { color?: string; type?: string } = this;

		const colorStyle: {
			color?: string;
			'background-color'?: string;
		} =
			!color || (type !== 'role' && type !== 'automod')
				? {}
				: type === 'role'
				? { color, 'background-color': hexToRgba(color, 0.1) }
				: { color: hexToRgba(color, 1), 'background-color': undefined };

		let mentionPrepend = '';

		switch (this.type) {
			case 'channel':
				mentionPrepend = <ChannelIcon class="discord-mention-icon" />;
				break;
			case 'user':
			case 'role':
				mentionPrepend = '@';
				break;
			case 'voice':
				mentionPrepend = <VoiceChannel class="discord-mention-icon" />;
				break;
			case 'locked':
				mentionPrepend = <LockedVoiceChannel class="discord-mention-icon" />;
				break;
			case 'thread':
				mentionPrepend = <ChannelThread class="discord-mention-icon" />;
				break;
			case 'forum':
				mentionPrepend = <ChannelForum class="discord-mention-icon" />;
				break;
			case 'slash':
				mentionPrepend = '/';
				break;
			case 'automod':
				break;
			case 'customize':
				mentionPrepend = <CustomizeCommunity class="discord-mention-fixed-icon" />;
				break;
			case 'browse':
				mentionPrepend = <BrowseChannels class="discord-mention-fixed-icon" />;
				break;
			case 'guide':
				mentionPrepend = <ServerGuide class="discord-mention-fixed-icon" />;
				break;
			case 'members':
				mentionPrepend = <Members class="discord-mention-fixed-icon" />;
				break;
		}

		return (
			<Host style={colorStyle} class={`discord-mention discord-${type}-mention`}>
				{mentionPrepend}
				<slot></slot>
			</Host>
		);
	}
}
