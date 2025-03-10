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
      include: ['@ckeditor/ckeditor5-react'],
    },
    build: {
      plugins: [],
      rollupOptions: {},
      commonjsOptions: {
        exclude: [/./],
      },
    },
    server: {
      port: 3000,
      proxy: {
        // Tất cả request bắt đầu bằng /api sẽ được chuyển tiếp tới backend
        '/api': {
          target: 'http://localhost:5000',
          changeOrigin: true,
          secure: false, // Nếu backend dùng HTTPS không có chứng chỉ hợp lệ
          rewrite: (path) => path.replace(/^\/api/, '/api'), // Giữ nguyên đường dẫn
        },
      },
    },
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },
  };
});
