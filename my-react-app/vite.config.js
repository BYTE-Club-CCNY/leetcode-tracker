import { defineConfig } from 'vite';
import { createVuePlugin } from 'vite-plugin-vue';
import browserExtension from 'vite-plugin-browser-extension';

export default defineConfig({
  plugins: [
    createVuePlugin(),
    browserExtension(),
  ],
});
