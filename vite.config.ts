import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 82,
    proxy: {
      // 匹配所有以 /api 开头的请求路径
      '/api': {
        // 代理目标地址，这里指向后端服务的地址
        target: 'http://localhost:8080',
        // 允许跨域
        changeOrigin: true,
        // 重写路径，将 /api 替换为空字符串
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});
/*import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 80
  }
})*/
