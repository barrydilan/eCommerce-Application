/// <reference types='vitest'/>
/// <reference types='vite/client'/>

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
	plugins: [react()],
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: ['./src/test/setupTest.ts'],
	},
	resolve: {
		alias: {
			$icons: resolve('src/assets/icons'),
		},
	},
	base: './',
	server: {
		open: '/',
	},
});
