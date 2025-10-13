import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from '@svgr/rollup'

export default defineConfig({
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
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            proxyReq.setHeader('x-ncp-apigw-api-key-id', 'pvngw60boi');
            proxyReq.setHeader('x-ncp-apigw-api-key', 'pQerQ8RH43mXRUitA0yZS0fv8az2y3AR2NAJ1GR3');
          });
        }
      }
    }
  }
})
