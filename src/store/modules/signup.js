import { auth } from '../../axios-urls';
import router from '../../router';

export const signup = {
  namespaced: true,

  state: {
    error: '',
    success: ''
  },

  mutations: {
    authError(state, msg) {
      state.success = '';
      state.error = msg;
    },
    authSuccess(state, msg) {
      state.error = '';
      state.success = msg;
    }
  },

  actions: {
    signup({commit, dispatch}, authData) {
  		auth.post('signup', {
          email: authData.email,
          password: authData.password,
          password_confirmation: authData.password_confirmation,
          name: authData.name,
          username: authData.username,
          returnSecureToken: true
        })
          .then(res => {
            const msg = res.data.message;
            commit('authSuccess', msg);
          })
          .catch(error => {
            const msg = error.response.data.error.errors.email[0];
            commit('authError', msg);
          });
  	}
  },

  getters: {
  }
};
