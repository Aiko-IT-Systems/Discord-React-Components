import { Component, ComponentInterface, Element, h, Prop, State } from '@stencil/core';
import Fragment from '../../Fragment';

@Component({
	tag: 'discord-automod-embed',
	styleUrl: 'discord-automod-embed.css'
})
export class DiscordAutomodEmbed implements ComponentInterface {
	/**
	 * The DiscordEmbed element.
	 */
	@Element()
	public el: HTMLElement;

	/**
	 * The color to use for the embed's left border. Can be any [CSS color value](https://www.w3schools.com/cssref/css_colors_legal.asp).
	 */
	@Prop()
	public color: string;

	/**
	 * The user's name.
	 */
	@Prop()
	public userName: string;

	/**
	 * The user's avatar URL.
	 */
	@Prop()
	public userImage: string;

	/**
	 * The user's color.
	 */
	@Prop()
	public userColor: string;

	/**
	 * Whether the embed is active.
	 * @default false
	 */
	@Prop()
	public active: boolean = false;

	private hasPerformedRerenderChecks: 'dirty' | 'pristine' = 'pristine';

	@State()
	private hasProvidedDescriptionSlot = true;

	public componentDidRender() {
		if (this.hasPerformedRerenderChecks === 'pristine') {
			try {
				const discordAutomodEmbedDescriptionChild = this.el.querySelector('.discord-automod-embed-description');
				this.hasProvidedDescriptionSlot = Boolean(discordAutomodEmbedDescriptionChild?.innerHTML.trim());
			} finally {
				this.hasPerformedRerenderChecks = 'dirty';
			}
		}
	}

	public render() {
		if (!this.active) return null;
		return (
			<div class="discord-automod-embed">
				<div style={{ 'background-color': this.color }} class="discord-left-border"></div>
				<div class="discord-automod-embed-root">
					<div class="discord-automod-embed-wrapper">
						<div class="discord-automod-embed-grid">
							<div class="discord-automod-embed-author">
								{this.userImage ? <img src={this.userImage} alt="" class="discord-user-image" /> : ''}
								<Fragment>
									<discord-mention type="automod" color={this.userColor}>
										{this.userName}
									</discord-mention>
								</Fragment>
							</div>

							{this.hasProvidedDescriptionSlot && <slot name="description"></slot>}

							<slot name="fields"></slot>

							<slot name="footer"></slot>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
