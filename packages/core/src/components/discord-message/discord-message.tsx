import { Component, ComponentInterface, Element, h, Host, Prop, Watch } from '@stencil/core';
import clsx from 'clsx';
import Fragment from '../../Fragment';
import { avatars, Profile, profiles, useTwentyFourHourMode } from '../../options';
import { DiscordTimestamp, handleTimestamp } from '../../util';
import { AuthorInfo } from '../author-info/author-info';
import Ephemeral from '../svgs/ephemeral';

@Component({
	tag: 'discord-message',
	styleUrl: 'discord-message.css'
})
export class DiscordMessage implements ComponentInterface {
	/**
	 * The DiscordMessage element.
	 */
	@Element()
	public el: HTMLElement;

	/**
	 * The id of the profile data to use.
	 */
	@Prop()
	public profile: string;

	/**
	 * The message author's username.
	 * @default 'User'
	 */
	@Prop()
	public author = 'User';

	/**
	 * The message author's avatar. Can be an avatar shortcut, relative path, or external link.
	 */
	@Prop()
	public avatar: string;

	/**
	 * Whether the message author is a bot or not.
	 * Only works if `server` is `false` or `undefined`.
	 */
	@Prop()
	public bot = false;

	/**
	 * Whether the message author is a server crosspost webhook or not.
	 * Only works if `bot` is `false` or `undefined`.
	 */
	@Prop()
	public server = false;

	/**
	 * Whether the bot is verified or not.
	 * Only works if `bot` is `true`
	 */
	@Prop()
	public verified = false;

	/**
	 * Whether the author is the original poster.
	 */
	@Prop()
	public op = false;

	/**
	 * Whether the author is clyde.
	 */
	@Prop()
	public clyde = false;

	/**
	 * Whether the author is a webhook.
	 */
	@Prop()
	public webhook = false;

	/**
	 * Whether the message has been edited or not.
	 */
	@Prop()
	public edited = false;

	/**
	 * The message author's primary role color. Can be any [CSS color value](https://www.w3schools.com/cssref/css_colors_legal.asp).
	 */
	@Prop()
	public roleColor: string;

	/**
	 * The message author's role icon URL.
	 */
	@Prop()
	public roleIcon: string;

	/**
	 * The name of the role to use as alternative image text.
	 */
	@Prop()
	public roleName: string;

	/**
	 * Whether this message is a system message.
	 */
	@Prop()
	public system = false;

	/**
	 * Whether to highlight this message.
	 */
	@Prop()
	public highlight = false;

	/**
	 * Whether to make this message ephemeral.
	 */
	@Prop()
	public ephemeral = false;

	/**
	 * The timestamp to use for the message date.
	 */
	@Prop({ mutable: true, reflect: true })
	public timestamp: DiscordTimestamp = new Date();

	/**
	 * Whether to use 24-hour format for the timestamp.
	 */
	@Prop()
	public twentyFour = useTwentyFourHourMode;

	@Watch('timestamp')
	public updateTimestamp(value: DiscordTimestamp): string | null {
		if (!value) return null;
		return handleTimestamp(value, this.twentyFour);
	}

	public componentWillRender() {
		this.timestamp = this.updateTimestamp(this.timestamp);
	}

	public render() {
		const parent: HTMLDiscordMessagesElement = this.el.parentElement as HTMLDiscordMessagesElement;

		if (parent.tagName.toLowerCase() !== 'discord-messages') {
			throw new Error('All <discord-message> components must be direct children of <discord-messages>.');
		}

		const resolveAvatar = (avatar: string): string => avatars[avatar] ?? avatar ?? avatars.default;

		const defaultData: Profile = {
			author: this.author,
			bot: this.bot,
			verified: this.verified,
			server: this.server,
			op: this.op,
			roleColor: this.roleColor,
			roleIcon: this.roleIcon,
			roleName: this.roleName,
			clyde: this.clyde,
			webhook: this.webhook,
			system: this.system
		};
		const profileData: Profile = Reflect.get(profiles, this.profile) ?? {};
		const profile: Profile = { ...defaultData, ...profileData, ...{ avatar: resolveAvatar(profileData.avatar ?? this.avatar) } };

		const highlightMention: boolean =
			// @ts-expect-error ts doesn't understand this
			Array.from(this.el.children).some((child: HTMLDiscordMentionElement): boolean => {
				return child.tagName.toLowerCase() === 'discord-mention' && child.highlight && ['user', 'role'].includes(child.type);
			}) || this.highlight;

		const hasThread: boolean =
			// @ts-expect-error ts doesn't understand this
			Array.from(this.el.children).some((child: HTMLDiscordThreadElement): boolean => {
				return child.tagName.toLowerCase() === 'discord-thread';
			});

		return (
			<Host
				class={clsx('discord-message', {
					'discord-highlight-mention': highlightMention,
					'discord-message-has-thread': hasThread,
					'discord-highlight-ephemeral': this.ephemeral
				})}
			>
				<slot name="reply"></slot>
				<div class="discord-message-inner">
					{parent.compactMode && <span class="discord-message-timestamp">{this.timestamp}</span>}
					{/* If clyde is true then we need to set clyde profile */}
					{this.clyde && (
						<div class="discord-author-avatar">
							<img src={resolveAvatar('clyde')} alt="Clyde" />
						</div>
					)}
					{!this.clyde && (
						<div class="discord-author-avatar">
							<img src={profile.avatar} alt={profile.author} />
						</div>
					)}
					<div class="discord-message-content">
						{!parent.compactMode && (
							<Fragment>
								<AuthorInfo
									author={profile.clyde ? 'Clyde' : profile.author ?? ''}
									bot={profile.bot ?? false}
									server={profile.server ?? false}
									verified={profile.verified ?? false}
									op={profile.op ?? false}
									roleColor={profile.roleColor ?? ''}
									roleIcon={profile.roleIcon ?? ''}
									roleName={profile.roleName ?? ''}
									compact={parent.compactMode}
									clyde={profile.clyde ?? false}
									webhook={profile.webhook ?? false}
									system={profile.system ?? false}
								/>
								<span class="discord-message-timestamp">{this.timestamp}</span>
							</Fragment>
						)}
						<div class="discord-message-body">
							{parent.compactMode && (
								<AuthorInfo
									author={profile.clyde ? 'Clyde' : profile.author ?? ''}
									bot={profile.bot ?? false}
									server={profile.server ?? false}
									verified={profile.verified ?? false}
									op={profile.op ?? false}
									roleColor={profile.roleColor ?? ''}
									roleIcon={profile.roleIcon ?? ''}
									roleName={profile.roleName ?? ''}
									compact={parent.compactMode}
									clyde={profile.clyde ?? false}
									webhook={profile.webhook ?? false}
									system={profile.system ?? false}
								/>
							)}
							<span class="discord-message-markup">
								<slot></slot>
							</span>
							{this.edited ? <span class="discord-message-edited">(edited)</span> : ''}
						</div>
						<div class="discord-message-compact-indent">
							<slot name="embeds"></slot>
							<slot name="attachments"></slot>
							<slot name="components"></slot>
							<slot name="reactions"></slot>
							<slot name="thread"></slot>
							{this.ephemeral && (
								<div class="discord-message-ephemeral">
									<Ephemeral class="discord-message-ephemeral-icon" />
									Only you can see this • <span class="discord-message-ephemeral-link">Dismiss message</span>
								</div>
							)}
						</div>
					</div>
				</div>
			</Host>
		);
	}
}
