import { FunctionalComponent, h } from '@stencil/core';
import Fragment from '../../Fragment';
import VerifiedTick from '../svgs/verified-tick';
import ClydeAiTag from '../svgs/clyde-ai';

interface AuthorInfoProps {
	/**
	 * The name of the author
	 */
	author: string;
	/**
	 * Whether this author is a bot. Only works if `server` is `false` or `undefined`.
	 */
	bot: boolean;
	/**
	 * Whether this author is a `server` crosspost webhook. Only works if `bot` is `false` or `undefined`.
	 */
	server: boolean;
	/**
	 * Whether this author is the original poster.
	 */
	op: boolean;
	/**
	 * The colour of the author, which comes from their highest role
	 */
	roleColor: string;
	/**
	 * The role icon of the author, which comes from their highest role
	 */
	roleIcon: string;
	/**
	 * The role name of the author, which comes from their highest role
	 */
	roleName: string;
	/**
	 * Whether this bot is verified by Discord. Only works if `bot` is `true`
	 */
	verified: boolean;
	/**
	 * Whether to reverse the order of the author info for compact mode.
	 */
	compact: boolean;
	/**
	 * Whether this author is clyde. Does not work with `bot`, `author`, `server` or `verified`.
	 */
	clyde: boolean;
	/**
	 * Whether this author is a webhook. Does not work with `bot`, `clyde`, `server` or `verified`.
	 */
	webhook: boolean;
	/**
	 * Whether this bot is official from Discord aka System. Only works if `bot` is `true`
	 */
	system: boolean;
}

export const AuthorInfo: FunctionalComponent<AuthorInfoProps> = ({
	author,
	bot,
	server,
	op,
	roleColor,
	roleIcon,
	roleName,
	verified,
	compact,
	clyde,
	webhook,
	system
}) => (
	<span class="discord-author-info">
		{!compact && (
			<Fragment>
				<span class="discord-author-username" style={{ color: roleColor }}>
					{author}
				</span>
				{roleIcon && <img class="discord-author-role-icon" src={roleIcon} height="20" width="20" alt={roleName} draggable={false} />}
			</Fragment>
		)}
		{
			<Fragment>
				{/* If bot is true then we need to render a Bot tag */}
				{clyde && !webhook && !bot && !server && (
					<span class="discord-application-tag discord-application-tag-clyde">
						{/* If clyde is true then a verified checkmark should be prefixed */}
						{clyde && <ClydeAiTag />}
						AI
					</span>
				)}
				{bot && system && !webhook && !server && !clyde && (
					<span class="discord-application-tag">
						{/* If system is true then a verified checkmark should be prefixed */}
						{system && <VerifiedTick />}
						System
					</span>
				)}
				{bot && !system && !webhook && !server && !clyde && (
					<span class="discord-application-tag">
						{/* If verified is true then a verified checkmark should be prefixed */}
						{verified && <VerifiedTick />}
						Bot
					</span>
				)}
				{webhook && !bot && !server && !clyde && <span class="discord-application-tag">Webhook</span>}
				{server && !webhook && !bot && !clyde && <span class="discord-application-tag">Server</span>}
				{op && <span class="discord-application-tag discord-application-tag-op">OP</span>}
			</Fragment>
		}
		{compact && (
			<span class="discord-author-username" style={{ color: roleColor }}>
				{author}
			</span>
		)}
	</span>
);
