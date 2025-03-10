import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({mode}) => {

    const env = loadEnv(mode, process.cwd(), '')

    return {
        base: env.VITE_BASE_PATH || '',
        plugins: [
            react(),
        ],
        optimizeDeps: {
            include: ['@ckeditor/ckeditor5-react']
        },
        build: {
            plugins: [],
            rollupOptions: {},
            commonjsOptions: {
                exclude: [/./]
            }
        },
        server: {
            port: 3000
        },
        resolve: {
            alias: {
                '~': path.resolve(__dirname, './src')
            }
        }
    }
})
