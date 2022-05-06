export const state = () => ({
  user: null
})

export const actions = {
  setUser({ commit }, data) {
    commit("SET_USER", data);
  },
  setFavorites({ commit }, data) {
    commit("SET_FAVORITES", data)
  }
}

export const mutations = {
  SET_USER(state, data) {
    state.user = data;
  },
  SET_FAVORITES(state, data) {
    state.user.profile.favorite_ids = data;
  },
}
