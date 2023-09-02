import { h } from '@stencil/core';
import Fragment from '../../Fragment';

export default function ServerGuide<T>(props: T) {
	return (
		<Fragment>
			<svg {...props} aria-label="Server Guide" aria-hidden="false" role="img" width="24" height="24" viewBox="0 0 16 16" fill="none">
				<path fill-rule="evenodd" clip-rule="evenodd" d="M7 15H9V8H12.5L15 5.5L12.5 3H9V1H7V3H1L3.5 5.5L1 8H7V15Z" fill="currentColor"></path>
				<path d="M5 14C5 12.8954 5.89543 12 7 12H9C10.1046 12 11 12.8954 11 14V15H5V14Z" fill="currentColor"></path>
			</svg>
			<span>Server Guide</span>
		</Fragment>
	);
}
