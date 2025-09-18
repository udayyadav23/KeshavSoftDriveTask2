import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
	root: '../',
	plugins: [
		handlebars({
			partialDirectory: [
				'src/templates/AboutTemplates',
				'src/templates/ContactTemplates',
				'src/templates/IndexTemplates'
			]
		})
	],
	build: {
		outDir: 'dist',
		rollupOptions: {
			input: {
				main: 'src/templates/index.hbs',
				about: 'src/templates/about.hbs',
				contact: 'src/templates/contact.hbs'
			}
		}
	},
	publicDir: 'src/assets',
	server: {
		open: '/src/templates/index.hbs'
	}
});
