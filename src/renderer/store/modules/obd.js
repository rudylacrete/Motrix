const state = {
  connected: false
}

const getters = {
}

const mutations = {
  CHANGE_CONNECTION_STATUS (state, connected) {
    state.connected = connected
  }
}

const actions = {
  changeConnectedStatus ({ commit }, connected) {
    commit('CHANGE_CONNECTION_STATUS', connected)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
