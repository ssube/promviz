import { join, sep } from 'path';
import commonjs from 'rollup-plugin-commonjs';
import { eslint } from 'rollup-plugin-eslint';
import json from 'rollup-plugin-json';
import multiEntry from 'rollup-plugin-multi-entry';
import externals from 'rollup-plugin-node-externals';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import serve from 'rollup-plugin-serve';
import typescript from 'rollup-plugin-typescript2';
import yaml from 'rollup-plugin-yaml';

const flag_debug = process.env['DEBUG'] === 'TRUE';
const flag_serve = process.env['SERVE'] === 'TRUE';

const metadata = require('../package.json');

const external = require('./rollup-external.json').names;
const globals = require('./rollup-globals.json');
const namedExports = require('./rollup-named.json');

const rootPath = process.env['ROOT_PATH'];
const targetPath = process.env['TARGET_PATH'];

const bundle = {
	external,
	input: {
		include: [
			join(rootPath, 'src', 'app.tsx'),
			join(rootPath, 'test', 'harness.ts'),
			join(rootPath, 'test', '**', 'Test*.ts'),
		],
	},
	manualChunks(id) {
		if (id.match(/commonjs-external/i) || id.match(/commonjsHelpers/)) {
			return 'vendor';
		}

		if (id.includes(`${sep}node_modules${sep}`)) {
			return 'vendor';
		}

		if (id.includes(`${sep}test${sep}`)) {
			return 'test';
		}

		if (id.includes(`${sep}src${sep}index`)) {
			return 'index';
		}

		if (id.includes(`${sep}src${sep}`)) {
			return 'main';
		}

		return 'nochunk';
	},
	output: {
		dir: targetPath,
		chunkFileNames: '[name].js',
		entryFileNames: 'index.js',
		format: 'esm',
		globals,
		name: 'promviz',
		sourcemap: true,
	},
	plugins: [
		multiEntry(),
		json(),
		yaml(),
		externals({
			builtins: true,
			deps: true,
			devDeps: false,
			peerDeps: false,
		}),
		replace({
			delimiters: ['{{ ', ' }}'],
			values: {
				BUILD_JOB: process.env['CI_JOB_ID'],
				BUILD_RUNNER: process.env['CI_RUNNER_DESCRIPTION'],
				GIT_BRANCH: process.env['CI_COMMIT_REF_SLUG'],
				GIT_COMMIT: process.env['CI_COMMIT_SHA'],
				NODE_VERSION: process.env['NODE_VERSION'],
				PACKAGE_NAME: metadata.name,
				PACKAGE_VERSION: metadata.version,
			},
		}),
		/* fix react: https://github.com/rollup/rollup/issues/487 */
		replace({
			'process.env.NODE_ENV': JSON.stringify( 'production' ),
		}),
		/* fix plotly/d3: https://github.com/plotly/plotly.js/issues/3518 */
		replace({
			include: [
				join('node_modules', 'plotly.js', 'dist', '*.js'),
			],
			values: {
				'd3_document = this.document': 'd3_document = window.document',
				'this.navigator': 'window.navigator',
				'this[d3_vendorSymbol(this': 'window[d3_vendorSymbol(window',
				'new DOMParser': 'new window.DOMParser',
			},
		}),
		resolve({
			preferBuiltins: true,
		}),
		commonjs({
			namedExports,
		}),
		eslint({
			configFile: join('.', 'config', 'eslint.json'),
			exclude: [
				join('node_modules', '**'),
				join('src', 'resource'),
				join('src', '**', '*.json'),
				join('src', '**', '*.yml'),
			],
			include: [
				join('**', '*.ts'),
			],
			throwOnError: true,
		}),
		typescript({
			cacheRoot: join(targetPath, 'cache', 'rts2'),
			rollupCommonJSResolveHack: true,
		}),
	],
};

if (flag_serve) {
	bundle.plugins.push(serve({
		open: true,
		verbose: true,
		contentBase: join(rootPath, 'out'),
		mimeTypes: {
			'application/javascript': ['mjs'],
		},
	}));
}

export default [
	bundle,
];
