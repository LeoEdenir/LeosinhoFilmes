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
  // ON_AUTH_STATE_CHANGED_MUTATION: (state, { authUser, claims }) => {
  //   if (authUser) {
  //     const { uid, email, emailVerified } = authUser
  //     state.user = { uid, email, emailVerified }
  //   } else {
  //     state.user = null
  //   }
  // },

  async addProfileToUser(profile) {
    await this.$fire.firestore.collection("profile").add(profile);
  },

  async getProfile() {
    let user = this.$fire.auth.currentUser;

    const profile = await this.$fire.firestore
      .collection("profile")
      .where("uid", "==", user.uid)
      .get();

    const profileData = profile.docs[0];
    this.user.id = profileData.id;
    this.user.name = profileData.data().name;
  },
}
