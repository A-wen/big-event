import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: 
     { '@': fileURLToPath(new URL('./src', import.meta.url))   }
    //[{ find: "@", replacement: resolve(__dirname, "./src") }]
  },
  server:{
    proxy:{
      '/api':{//獲取路徑中包含/api的請求
        target:'http://locallhost:8080',//後台的請求所在
        changeOrigin:true,//修改源
        rewrite:(path)=>path.replace(/^\/api/,'')//把 /api替換掉
      }
    }
  }
})
