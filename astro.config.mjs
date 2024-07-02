// astro.config.mjs
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://my-portfolio.sbouldin.com', // Replace with your site's URL
  base: '/', // Base path for your project
  build: {
    format: 'directory', // Options: 'directory' or 'file'
    outDir: 'dist', // Output directory for build
    assetsDir: 'assets', // Directory for assets within outDir
  },
  server: {
    host: true, // Set to true to enable network access
    port: 3000, // Port to run the development server on
  },
  integrations: [
    // Add your integrations here
    // Example: tailwind integration
    // import tailwind from '@astrojs/tailwind';
    // tailwind(),
  ],

  vite: {
    // Vite-specific configuration
    resolve: {
      alias: {
        '@components': '/src/components', // Example alias
      },
    },
  },
});
