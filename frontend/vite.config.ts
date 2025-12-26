// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// export default defineConfig({
//   plugins: [vue()],
//   server: {
//     proxy: {
//       '/api': {
//         target: 'http://localhost:8000', // 后端地址
//         changeOrigin: true,
//         // rewrite: (path) => path.replace(/^\/api/, '')
        
//       }
//     }
//   }
// })

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // ✅ 关键：添加 @ 别名指向 src 目录
      '@': '/src'
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true
      }
    }
  }
})