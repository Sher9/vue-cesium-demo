import Vue from 'vue'
import App from './components/App.vue'
import '../../common/css/base.css'
import '../../common/css/iconfont/style.css'
import '../../common/css/animate.css'
import store from './store'
import {
    Dialog,
    Tree,
    Autocomplete,
    DatePicker,
    Cascader,
    Input,
    Select,
    Option,
    Pagination,
} from 'element-ui'
Vue.use(Dialog)
Vue.use(Tree)
Vue.use(Autocomplete)
Vue.use(DatePicker)
Vue.use(Cascader)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Pagination)
new Vue({
    store,
    render: (h) => h(App),
}).$mount('#app')
