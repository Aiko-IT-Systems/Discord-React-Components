import { Component, ComponentInterface, Element, h, Host, Prop } from '@stencil/core';
import hljs from 'highlight.js';

@Component({
	tag: 'discord-code-block',
	styleUrl: 'discord-code-block.css'
})
export class DiscordCodeBlock implements ComponentInterface {
	/**
	 * The DiscordCodeBlock element.
	 */
	@Element()
	public el: HTMLElement;

	/**
	 * The language of the code block.
	 */
	@Prop()
	public language?: string;

	/**
	 * The code to display. If not supplied, add the code as <pre></pre> tags inside the component.
	 */
	@Prop()
	public code?: string;

	public componentDidRender() {
		hljs.highlightBlock(this.el);
	}

	public render() {
		// check if hljs has the language
		const language = this.language ? (hljs.getLanguage(this.language) ? this.language : 'plaintext') : 'plaintext';

		return (
			<Host class="discord-code-block-pre discord-code-block-pre--multiline language">
				{this.code ? (
					<code class={`hljs language-${language}`} innerHTML={hljs.highlight(this.code, { language }).value} />
				) : (
					<code class={`hljs language-${language}`}>
						<slot></slot>
					</code>
				)}
			</Host>
		);
	}
	/*
	private highlight(language: string): string | undefined {
		const code = this.el.querySelector('code');
		if (!code) return undefined;
		const hl = hljs.highlight(code.querySelector('pre')!.innerText.trimEnd(), { language });
		return hl.value;
	}*/
}
