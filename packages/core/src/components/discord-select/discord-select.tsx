import { Component, ComponentInterface, Element, h, Host, Prop } from '@stencil/core';
import Fragment from '../../Fragment';

@Component({
	tag: 'discord-select',
	styleUrl: 'discord-select.css'
})
export class DiscordSelect implements ComponentInterface {
	/**
	 * The DiscordButton element.
	 */
	@Element()
	public el: HTMLElement;

	/**
	 * The emoji URL to use in the button.
	 */
	@Prop()
	public emoji: string;

	/**
	 * The name of the emoji used in the button.
	 */
	@Prop()
	public emojiName = 'emoji';

	/**
	 * Whether to show the button as disabled.
	 */
	@Prop()
	public disabled = false;

	public render() {
		const parent: HTMLDiscordActionRowElement = this.el.parentElement as HTMLDiscordActionRowElement;

		if (parent.tagName.toLowerCase() !== 'discord-action-row') {
			throw new Error('All <discord-select> components must be direct children of <discord-action-row>.');
		}

		const content = (
			<Fragment>
				{this.emoji && <img src={this.emoji} alt={this.emojiName} draggable={false} class="discord-select-emoji" />}
				<span>
					<slot />
				</span>
			</Fragment>
		);

		return <Host class={`discord-select discord-select-${this.disabled ? 'disabled' : 'hoverable'}`}>{content}</Host>;
	}
}
