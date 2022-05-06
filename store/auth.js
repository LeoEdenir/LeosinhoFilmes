export const state = () => ({
  user: null
})

export const actions = {
  setUser({ commit }, data) {
    commit("SET_USER", data);
  }
}

export const mutations = {
  SET_USER(state, data) {
    state.user = data;
  },
}
