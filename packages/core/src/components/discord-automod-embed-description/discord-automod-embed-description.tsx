import { Component, ComponentInterface, Element, h, Host, Prop } from '@stencil/core';

@Component({
	tag: 'discord-automod-embed-description',
	styleUrl: 'discord-automod-embed-description.css'
})
export class DiscordAutomodEmbedDescription implements ComponentInterface {
	/**
	 * The DiscordAutomodEmbedDescription element.
	 */
	@Element()
	public el: HTMLElement;

	/**
	 * Whether the embed description is active.
	 * @default false
	 */
	@Prop()
	public active: boolean = false;

	public render() {
		const parent: HTMLDiscordMessagesElement = this.el.parentElement as HTMLDiscordMessagesElement;

		if (parent.tagName.toLowerCase() !== 'div') {
			throw new Error('All <discord-automod-embed-description> components must be direct children of <discord-automod-embed>.');
		}

		if (!this.active) return null;
		return (
			<Host class="discord-automod-embed-description">
				<slot></slot>
			</Host>
		);
	}
}
