import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://jayakrishnanps.github.io',
  base: '/portfolio',
  integrations: [react()],
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});