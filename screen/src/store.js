import { configVuex } from '../../common/base/store'

const state = {
    fullScreen: false,
}

const mutations = {
    updatefullScreen(state, full) {
        state.fullScreen = full
    },
}

export default configVuex(state, mutations)
