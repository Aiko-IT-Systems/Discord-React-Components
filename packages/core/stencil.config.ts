import { Config } from '@stencil/core';
import { reactOutputTarget } from '@stencil/react-output-target';
import nodePolyfills from 'rollup-plugin-node-polyfills';

export const config: Config = {
	namespace: 'aitsys-discord-components-core',
	extras: {
		experimentalImportInjection: true
	},
	outputTargets: [
		reactOutputTarget({
			componentCorePackage: '@aitsys/discord-components-core',
			proxiesFile: '../react/src/index.ts',
			includeDefineCustomElements: true,
			includePolyfills: true
		}),
		{
			type: 'dist',
			empty: true,
			esmLoaderPath: '../loader'
		},
		{
			type: 'docs-readme',
			strict: true
		},
		{
			type: 'www',
			serviceWorker: null,
			copy: [{ src: '../static', dest: 'static/' }]
		}
	],
	rollupPlugins: {
		after: [nodePolyfills()]
	}
};
