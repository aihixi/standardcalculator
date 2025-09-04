import { createApp } from 'vue'
import App from './App.vue'

// 引入组件库的少量全局样式变量
import './assets/main.css'
import 'tdesign-vue-next/es/style/index.css'
import ButtonPlugin from 'tdesign-vue-next'
import CardPlugin from 'tdesign-vue-next/es/card'
import router from './router'

const app = createApp(App)
app.use(ButtonPlugin)
app.use(CardPlugin)
app.use(router)
app.mount('#app')
