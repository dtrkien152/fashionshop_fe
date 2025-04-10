import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import inject from '@rollup/plugin-inject';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: env.VITE_BASE_PATH || '',
    plugins: [
      react(),
      inject({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
      }),
    ],
    optimizeDeps: {
      include: ['@ckeditor/ckeditor5-react', '@react-oauth/google'],
    },
    build: {
      rollupOptions: {},
    },
    server: {
      port: 3100,
    },
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },
    define: {
      'process.env': env,
    },
  };
});
