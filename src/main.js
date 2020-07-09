import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 2. 在main.js 引入 和 使用
import ElementUI from 'element-ui'; // JS
import 'element-ui/lib/theme-chalk/index.css'; // CSS
Vue.use(ElementUI); // 使用

// 3. 在main.js引入icon
import "@/assets/icons/iconfont.css"
// 4. 在main.js引入reset
import "@/assets/css/reset.css"

// 5.引入echart
import echarts from "echarts"
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
