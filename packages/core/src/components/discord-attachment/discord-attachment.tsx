import { Component, ComponentInterface, Element, Fragment, h, Host, Prop, State } from '@stencil/core';
import VoiceMessagePlaying from '../svgs/voice-message-playing';
import VoiceMessagePaused from '../svgs/voice-message-paused';
import Volume100 from '../svgs/volume-100';
import VolumeMuted from '../svgs/volume-muted';
import FileIconGeneric from '../svgs/file-icon-generic';
import FileIconAudio from '../svgs/file-icon-audio';

enum DiscordAttachmentType {
	IMAGE = 'image',
	VIDEO = 'video',
	AUDIO = 'audio',
	FILE = 'file',
	VOICE = 'voice'
}

@Component({
	tag: 'discord-attachment',
	styleUrl: 'discord-attachment.css'
})
export class DiscordAttachment implements ComponentInterface {
	/**
	 * The DiscordAttachment element.
	 */
	@Element()
	public el: HTMLElement;

	/**
	 * The URL for the attachment
	 * @important Should be a valid image URL, i.e. matching the regex `/\.(bmp|jpe?g|png|gif|webp|tiff|ogg|mp3|mp4)$/i`
	 */
	@Prop()
	public url: string;

	/**
	 * The type of file the attachment is.
	 * 'image' | 'video' | 'audio' | 'file' | 'voice'
	 */
	@Prop()
	public type: 'image' | 'video' | 'audio' | 'file' | 'voice';

	/**
	 * The size of the file.
	 */
	@Prop()
	public size: string;

	/**
	 * The height of the image in pixels
	 */
	@Prop()
	public height?: number;

	/**
	 * The width of the image in pixels
	 */
	@Prop()
	public width?: number;

	/**
	 * The alt text to show in case the image was unable to load
	 * @default 'discord attachment'
	 */
	@Prop()
	public alt? = 'discord attachment';

	/**
	 * The duration of the voice message in seconds
	 * @important Only applicable to voice messages
	 */
	@Prop()
	public durationSecs?: number;

	/**
	 * Whether the voice message is playing or not
	 */
	@State()
	private playing: boolean = false;

	/**
	 * The volume of the voice message
	 * @default 1
	 */
	@State()
	private volume: number = 1;

	/**
	 * The lenght of the voice message in seconds
	 * @default 0
	 */
	private audioTime: number = 0;

	public render() {
		switch (this.type) {
			case DiscordAttachmentType.IMAGE:
				return (
					<Host class="discord-attachment">
						<div class="discord-image-wrapper">
							<img alt={this.alt} src={this.url} height={this.height} width={this.width} />
						</div>
					</Host>
				);

			case DiscordAttachmentType.VIDEO:
				return (
					<Host class="discord-attachment">
						<div class="discord-image-wrapper">
							<video src={this.url} height={this.height} width={this.width} controls />
						</div>
					</Host>
				);

			case DiscordAttachmentType.AUDIO:
				return (
					<Host class="discord-attachment-generic">
						<div class="discord-attachment-generic-icon">
							<FileIconAudio />
						</div>

						<div class="discord-attachment-generic-inner">
							<div class="discord-attachment-generic-name">
								<a href={this.url} target="_blank" rel="noopener noreferrer">
									{this.alt}
								</a>
							</div>

							<div class="discord-attachment-generic-size">{this.size}</div>
						</div>

						<div class="discord-attachment-generic-download">
							<a href={this.url} download>
								<svg aria-hidden="true" role="img" width="24" height="24" viewBox="0 0 24 24">
									<path
										fill="currentColor"
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M16.293 9.293L17.707 10.707L12 16.414L6.29297 10.707L7.70697 9.293L11 12.586V2H13V12.586L16.293 9.293ZM18 20V18H20V20C20 21.102 19.104 22 18 22H6C4.896 22 4 21.102 4 20V18H6V20H18Z"
									></path>
								</svg>
							</a>
						</div>
						<br />
						<div>
							<audio
								class="discord-audio-element"
								preload="metadata"
								onTimeUpdate={this.handlePlayTimeUpdate.bind(this)}
								onEnded={this.handlePlayEnded.bind(this)}
								onLoadedMetaData={this.handlePlayMetadata.bind(this)}
							>
								<source src={this.url}></source>
							</audio>
						</div>
					</Host>
				);

			case DiscordAttachmentType.VOICE:
				return (
					<Host class="discord-voice-message-container">
						<div class="ripple-container">
							<div class="ripple"></div>
						</div>
						<div class="discord-play-button-background" role="button" onClick={this.handlePlayClick.bind(this)}>
							<Fragment>
								{!this.playing && <VoiceMessagePlaying />}
								{this.playing && <VoiceMessagePaused />}
							</Fragment>
						</div>
						{/* <canvas class="discord-voice-canvas" height="32" width="56"></canvas> here we would normally display the waveform.. */}
						<input type="range" class="discord-voice-canvas" title="none" value={this.audioTime} />

						<div class="discord-voice-time" data-text-variant="text-sm/normal">
							{this.getVoiceMessageLenght()}
						</div>
						<div class="discord-volume-button">
							<div class="discord-volume-button-slider">
								<div class="vertical-3GO7H5">
									<div class="discord-mediabar-interaction">
										<div class="discord-mediabar-wrapper">
											<div class="discord-mediabar-progress">
												<span class="discord-mediabar-grabber"></span>
											</div>
										</div>
									</div>
								</div>
							</div>
							<button
								aria-label="Control volume"
								type="button"
								class="discord-volume-button-button"
								onClick={this.handleVolumeClick.bind(this)}
								onPointerEnter={this.handleVolumeHoverEnter.bind(this)}
								onPointerLeave={this.handleVolumeHoverLeave.bind(this)}
							>
								<div class="discord-volume-button-button-contents">
									<Fragment>
										{this.volume === 1 && <Volume100 />}
										{this.volume === 0 && <VolumeMuted />}
									</Fragment>
								</div>
							</button>
						</div>
						<audio
							class="discord-audio-element"
							preload="metadata"
							onTimeUpdate={this.handlePlayTimeUpdate.bind(this)}
							onEnded={this.handlePlayEnded.bind(this)}
							onLoadedMetaData={this.handlePlayMetadata.bind(this)}
						>
							<source src={this.url}></source>
						</audio>
					</Host>
				);

			case DiscordAttachmentType.FILE:
			default:
				return (
					<Host class="discord-attachment-generic">
						<div class="discord-attachment-generic-icon">
							<FileIconGeneric />
						</div>

						<div class="discord-attachment-generic-inner">
							<div class="discord-attachment-generic-name">
								<a href={this.url} target="_blank" rel="noopener noreferrer">
									{this.alt}
								</a>
							</div>

							<div class="discord-attachment-generic-size">{this.size}</div>
						</div>

						<div class="discord-attachment-generic-download">
							<a href={this.url} download>
								<svg aria-hidden="true" role="img" width="24" height="24" viewBox="0 0 24 24">
									<path
										fill="currentColor"
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M16.293 9.293L17.707 10.707L12 16.414L6.29297 10.707L7.70697 9.293L11 12.586V2H13V12.586L16.293 9.293ZM18 20V18H20V20C20 21.102 19.104 22 18 22H6C4.896 22 4 21.102 4 20V18H6V20H18Z"
									></path>
								</svg>
							</a>
						</div>
					</Host>
				);
		}
	}

	private getVoiceMessageLenght(): string {
		if (!this.durationSecs) return '0:00';
		const minutes = Math.floor(this.durationSecs / 60);
		const seconds = Math.floor(this.durationSecs % 60);
		return `${minutes}:${seconds.toString().padStart(2, '0')}`;
	}

	private handlePlayTimeUpdate({ target }: Event) {
		const targetElement: HTMLAudioElement = target as HTMLAudioElement;
		const timeShower = this.el.querySelector('.discord-voice-time') as HTMLElement;
		const progressBar = this.el.querySelector('.discord-voice-canvas') as HTMLInputElement;
		const minutes = Math.floor(targetElement.currentTime / 60);
		const seconds = Math.floor(targetElement.currentTime % 60);
		timeShower.innerText = `${minutes}:${seconds.toString().padStart(2, '0')}`;
		progressBar.value = targetElement.currentTime.toString();
		progressBar.style.setProperty('--range-progress', `${(targetElement.currentTime / this.audioTime) * 100}%`);
	}

	private handlePlayEnded({ target }: Event) {
		const targetElement: HTMLAudioElement = target as HTMLAudioElement;
		const timeShower = this.el.querySelector('.discord-voice-time') as HTMLElement;
		const progressBar = this.el.querySelector('.discord-voice-canvas') as HTMLInputElement;
		const ripple = this.el.querySelector('.ripple') as HTMLElement;
		if (targetElement.ended) {
			this.playing = false;
			ripple.style.setProperty('width', `0%`);
			ripple.style.setProperty('transform', `translate(-50%, -50%)`);
			const minutes = Math.floor(this.audioTime / 60);
			const seconds = Math.floor(this.audioTime % 60);
			timeShower.innerText = `${minutes}:${seconds.toString().padStart(2, '0')}`;
			progressBar.value = progressBar.max;
			progressBar.style.setProperty('--range-progress', `100%`);
		}
	}

	private handlePlayMetadata({ target }: Event) {
		const targetElement: HTMLAudioElement = target as HTMLAudioElement;
		const timeShower = this.el.querySelector('.discord-voice-time') as HTMLElement;
		const progressBar = this.el.querySelector('.discord-voice-canvas') as HTMLInputElement;
		this.audioTime = targetElement.duration;
		const minutes = Math.floor(this.audioTime / 60);
		const seconds = Math.floor(this.audioTime % 60);
		timeShower.innerText = `${minutes}:${seconds.toString().padStart(2, '0')}`;
		progressBar.max = Math.round(this.audioTime).toString();
	}

	private handleVolumeHoverEnter(_event: MouseEvent) {
		const volume = this.el.querySelector('.discord-volume-button-slider') as HTMLAudioElement;
		volume.style.setProperty('display', 'block');
	}

	private handleVolumeHoverLeave(_event: MouseEvent) {
		const volume = this.el.querySelector('.discord-volume-button-slider') as HTMLAudioElement;
		volume.style.setProperty('display', 'none');
	}

	private handleVolumeClick(_event: MouseEvent) {
		const audio = this.el.querySelector('audio') as HTMLAudioElement;
		const volume = this.el.querySelector('.discord-mediabar-progress') as HTMLAudioElement;
		if (this.volume === 0) {
			this.volume = 1;
			audio.volume = this.volume;
			volume.style.setProperty('width', `100%`);
		} else {
			this.volume = 0;
			audio.volume = this.volume;
			volume.style.setProperty('width', `0%`);
		}
	}

	private handlePlayClick(_event: MouseEvent) {
		const audio = this.el.querySelector('audio') as HTMLAudioElement;
		const progressBar = this.el.querySelector('.discord-voice-canvas') as HTMLInputElement;
		const ripple = this.el.querySelector('.ripple') as HTMLElement;
		this.audioTime = audio.duration;
		progressBar.max = Math.round(this.audioTime).toString();
		if (this.playing) {
			void audio.pause();
			ripple.style.setProperty('width', `0%`);
			ripple.style.setProperty('transform', `translate(-50%, -50%)`);
			this.playing = false;
		} else {
			void audio.play();
			ripple.style.setProperty('width', `100%`);
			ripple.style.setProperty('transform', `translate(-50%, -50%)`);
			this.playing = true;
		}
	}
}
