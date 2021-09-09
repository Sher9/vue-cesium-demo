/**配置Vuex的通用方法*/
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const baseState = {}

const baseMutations = {}

export const configVuex = (state, mutations, options = {}) => {
    return new Vuex.Store({
        state: { ...baseState, ...state },
        mutations: { ...baseMutations, ...mutations },
        ...options
    })
}
