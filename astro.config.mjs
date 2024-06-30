import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'http://portfolio.sbouldin.tech', // Replace with your actual site URL
  
  output: 'static', // Use 'static' for static site generation

  build: {
    outDir: './dist', // Specify your custom output directory
  },
  
  // Remove unnecessary integrations for debugging
  // integrations: [
  //   tailwind(),
  // ],
});
