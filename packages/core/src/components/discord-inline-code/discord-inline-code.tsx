import { Component, Host, Prop, h } from '@stencil/core';

@Component({
	tag: 'discord-inline-code',
	styleUrl: 'discord-inline-code.css'
})
export class DiscordInlineCode {
	/**
	 * Whether the inline code is within an embed.
	 */
	@Prop()
	public inEmbed: boolean = false;

	public render() {
		return (
			<Host>
				{this.inEmbed ? (
					<code class="discord-inline-code in-embed">
						<slot></slot>
					</code>
				) : (
					<code class="discord-inline-code ">
						<slot></slot>
					</code>
				)}
			</Host>
		);
	}
}
