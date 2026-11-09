// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

// https://astro.build/config
// Las páginas siguen siendo estáticas; solo /api/chat corre en el servidor (prerender = false).
export default defineConfig({
  adapter: node({ mode: 'standalone' }),
});
