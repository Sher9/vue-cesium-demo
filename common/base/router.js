import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export const configRouter = (routes, options = {}) => {
    return new VueRouter({
        linkActiveClass: 'active',
        routes,
        ...options
    })
}
