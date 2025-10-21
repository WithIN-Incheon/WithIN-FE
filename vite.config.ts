import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from '@svgr/rollup'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [
      react(),
      svgr(),
    ],
    server: {
      proxy: {
        '/api/geocode': {
          target: 'https://maps.apigw.ntruss.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/geocode/, '/map-geocode/v2/geocode'),
          configure: (proxy, _options) => {
            proxy.on('proxyReq', (proxyReq, _req, _res) => {
              proxyReq.setHeader('x-ncp-apigw-api-key-id', env.VITE_NCP_API_KEY_ID || '');
              proxyReq.setHeader('x-ncp-apigw-api-key', env.VITE_NCP_API_KEY || '');
            });
          }
        }
      }
    }
  }
})
