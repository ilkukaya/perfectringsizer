import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://perfectringsizer.netlify.app',
  integrations: [tailwind()],
  build: {
    format: 'directory',
  },
});
