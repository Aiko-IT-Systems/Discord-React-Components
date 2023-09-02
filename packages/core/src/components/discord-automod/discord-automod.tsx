import { Component, ComponentInterface, Element, h, Host, Prop, Watch } from '@stencil/core';
import clsx from 'clsx';
import { avatars, useTwentyFourHourMode } from '../../options';
import { DiscordTimestamp, handleTimestamp } from '../../util';
import { AuthorInfo } from '../author-info/author-info';

@Component({
	tag: 'discord-automod',
	styleUrl: 'discord-automod.css'
})
export class DiscordAutomod implements ComponentInterface {
	/**
	 * The DiscordMessage element.
	 */
	@Element()
	public el: HTMLElement;

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

		return (
			<Host
				class={clsx('discord-message', {
					'discord-highlight-mention': false,
					'discord-message-has-thread': false,
					'discord-highlight-ephemeral': false
				})}
			>
				<div class="discord-message-inner">
					{parent.compactMode && <span class="discord-message-timestamp">{this.timestamp}</span>}
					<div class="discord-author-avatar">
						<img src={resolveAvatar('automod')} alt="Automod" />
					</div>
					<div class="discord-message-content">
						<AuthorInfo
							author={'Automod'}
							bot={true}
							server={false}
							verified={false}
							op={false}
							roleColor={'#707BF4'}
							roleIcon={''}
							roleName={''}
							compact={parent.compactMode}
							clyde={false}
							webhook={false}
							system={true}
						/>
						<span class="discord-message-timestamp">{this.timestamp}</span>
						<div class="discord-message-body">
							<span class="discord-message-markup">
								<slot></slot>
							</span>
						</div>
						<div class="discord-message-compact-indent">
							<slot name="embeds"></slot>
						</div>
					</div>
				</div>
			</Host>
		);
	}
}

/*
 put this as <discord-embed-field> in the <discord-embed-fields> slot
 
				{
					"name": "rule_name",
					"value": "Block Words in Member Profile Names",
					"inline": false
				},
				{
					"name": "decision_id",
					"value": "3f8d1642a16d4a8285c30dc8703f7af5",
					"inline": false
				},
				{
					"name": "keyword",
					"value": "^[.,?$#!\/()-].+$",
					"inline": false
				},
				{
					"name": "keyword_matched_content",
					"value": ".w.",
					"inline": false
				},
				{
					"name": "quarantine_user",
					"value": "display_name",
					"inline": false
				},
				{
					"name": "quarantine_event",
					"value": "username_update",
					"inline": false
				},
				{
					"name": "quarantine_user_action",
					"value": "quarantine_user",
					"inline": false
				}



				{
					"name": "rule_name",
					"value": "Block Words in Member Profile Names",
					"inline": false
				},
				{
					"name": "channel_id",
					"value": "948989405597663282",
					"inline": false
				},
				{
					"name": "decision_id",
					"value": "a93741f4dc7f410a8ebc30d0edf0e01c",
					"inline": false
				},
				{
					"name": "keyword",
					"value": "^[.,?$#!\/()-].+$",
					"inline": false
				},
				{
					"name": "keyword_matched_content",
					"value": "!-!ello",
					"inline": false
				},
				{
					"name": "quarantine_user",
					"value": "display_name",
					"inline": false
				},
				{
					"name": "quarantine_event",
					"value": "message_send",
					"inline": false
				},
				{
					"name": "quarantine_user_action",
					"value": "quarantine_user",
					"inline": false
				}



				{
					"name": "rule_name",
					"value": "Block Cyrillic",
					"inline": false
				},
				{
					"name": "channel_id",
					"value": "1132206148309749830",
					"inline": false
				},
				{
					"name": "decision_id",
					"value": "7c4d4c9863e44015990ff28391d41ef0",
					"inline": false
				},
				{
					"name": "keyword",
					"value": "([\\p{Cyrillic}]\\s*){6,}",
					"inline": false
				},
				{
					"name": "keyword_matched_content",
					"value": "Пошли в лс",
					"inline": false
				},
				{
					"name": "timeout_duration",
					"value": "60",
					"inline": false
				}



				{
					"name": "rule_name",
					"value": "Block Words in Member Profile Names",
					"inline": false
				},
				{
					"name": "decision_id",
					"value": "0577b01c2c0747e7a64ea7faf2fc0f3c",
					"inline": false
				},
				{
					"name": "keyword",
					"value": "^[.,?$#!\/()-].+$",
					"inline": false
				},
				{
					"name": "keyword_matched_content",
					"value": "!!!! CH3eK_MY_BĬO BRO!!!!1",
					"inline": false
				},
				{
					"name": "quarantine_user",
					"value": "display_name",
					"inline": false
				},
				{
					"name": "quarantine_event",
					"value": "guild_join",
					"inline": false
				},
				{
					"name": "quarantine_user_action",
					"value": "quarantine_user",
					"inline": false
				},
				{
					"name": "alert_actions_execution",
					"value": "{\"v\": 0, \"actions\": {\"1\": {\"actor\": \"856780995629154305\", \"ts\": \"2023-08-29T02:30:38.128589+00:00\"}}}",
					"inline": false
				},
				{
					"name": "alert_actions_execution",
					"value": "{\"v\": 0, \"actions\": {\"2\": {\"actor\": \"856780995629154305\", \"ts\": \"2023-09-02T16:24:54.002627+00:00\"}}}",
					"inline": false
				} 1 = handled | 2 = not handled



				{
					"name": "rule_name",
					"value": "Spam Rule",
					"inline": false
				},
				{
					"name": "channel_id",
					"value": "888370714791534652",
					"inline": false
				},
				{
					"name": "decision_id",
					"value": "automod/76e96ddd85614a9a97bfd03ca622907e",
					"inline": false
				},
				{
					"name": "alert_actions_execution",
					"value": "{\"v\": 0, \"actions\": {\"1\": {\"actor\": \"856780995629154305\", \"ts\": \"2023-08-22T17:08:03.613221+00:00\"}}}",
					"inline": false
				}



				{
					"name": "rule_name",
					"value": "Commonly Flagged Words",
					"inline": false
				},
				{
					"name": "channel_id",
					"value": "881224361015672863",
					"inline": false
				},
				{
					"name": "decision_id",
					"value": "2c52c2c37d114af48de79246f200955e",
					"inline": false
				},
				{
					"name": "keyword",
					"value": "xvideos",
					"inline": false
				},
				{
					"name": "keyword_matched_content",
					"value": "xvideos",
					"inline": false
				},
				{
					"name": "flagged_message_id",
					"value": "1135233509661884486",
					"inline": false
				}
*/
