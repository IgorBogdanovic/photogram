import { auth } from '../../axios-urls'
import router from '../../router'

export const login = {
  namespaced: true,
  
  state: {
    idToken: null,
    idUser: null,
    userAvatar: null,
    error: false
  },

  mutations: {
    authUser(state, userData) {
      state.idToken = userData.token;
      state.idUser = userData.id;
      state.userAvatar = userData.avatar;
    },
    autologAuthUser(state, userData) {
      state.idToken = userData.token;
    },
    authError(state) {
      state.error = true;
    }
  },

  actions: {
    login({commit, dispatch}, authData) {
      auth.post('login', {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        })
          .then(res => {
            // console.log(res);
            commit('authUser', {
              token: res.data.token,
              id: res.data.data.id,
              avatar: res.data.data.image.avatar
            });
            localStorage.setItem('token', res.data.token);
            router.push({ name: 'homepage' });
          })
          .catch(error => {
            commit('authError');
          });
    },
    tryAutoLogin({commit}) {
      const token = localStorage.getItem('token');
      if (!token) {
        return false;
      }
      commit('autologAuthUser', {
        token
      });
    },
  },

  getters: {
    isAuthenticated(state) {
      return state.idToken !== null;
    },
    token(state) {
      return state.idToken;
    },
    idUser(state) {
      return state.idUser;
    },
    userAvatar(state) {
      return state.userAvatar;
    },
    error(state) {
      return state.error;
    }
  }
};
