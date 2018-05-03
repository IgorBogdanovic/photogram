import router from '../../router';

export const headings = {
  namespaced: true,
  
  state: {
    heading: ''
  },

  mutations: {
    setHeading(state, heading) {
      state.heading = heading;
    }
  },

  actions: {
    actSetHeading({commit}, heading) {
      commit('setHeading', heading);
    }
  },

  getters: {
  }
};
