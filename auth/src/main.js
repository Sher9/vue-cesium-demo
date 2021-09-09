import Vue from 'vue'
import App from './components/App.vue'
import '../../common/css/base.css'
import '../../common/css/iconfont/style.css'

import { Message } from 'element-ui'
Vue.prototype.$message = Message

new Vue({
    render: (h) => h(App),
}).$mount('#app')
