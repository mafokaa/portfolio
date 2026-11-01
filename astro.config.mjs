import { defineConfig } from 'astro/config';

export default defineConfig({
  trailingSlash: 'ignore',
  build: { inlineStylesheets: 'always' },
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  image: { responsiveStyles: false }
});
