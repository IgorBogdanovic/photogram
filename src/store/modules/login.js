import { auth } from '../../axios-urls';
import router from '../../router';

export const login = {
  namespaced: true,
  
  state: {
    idToken: null,
    idUser: null,
    userAvatar: null,
    userProfile: null,
    error: false
  },

  mutations: {
    authUser(state, userData) {
      state.idToken = userData.token;
      state.idUser = userData.id;
      state.userAvatar = userData.avatar;
      state.userProfile = userData.profile;
    },
    clearAuthUser(state) {
      state.idToken = null;
      state.idUser = null;
      state.userAvatar = null;
      state.userProfile = null;
    },
    changeUser(state, userData) {
      state.userAvatar = userData.avatar;
      state.userProfile = userData.profile;
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
              avatar: res.data.data.image.avatar,
              profile: {
                regular: res.data.data.image.profile,
                large: res.data.data.image.profile_large
              }
            });
            localStorage.setItem('token', res.data.token);
            router.push({ name: 'homepage' });
          })
          .catch(error => {
            commit('authError');
          });
    },
    logout({commit}) {
      commit('clearAuthUser');
      localStorage.removeItem('token');
      router.replace({ name: 'login' });
    },
    tryAutoLogin({commit, dispatch, state}) {
      const token = localStorage.getItem('token');
      const idUser = state.idUser;
      if (!token || !idUser) {
        dispatch('logout');
        return false;
      }
      commit('autologAuthUser', {
        token
      });
    },
    editUser({commit, state}, userData) {
      commit('changeUser', userData);
    }
  },

  getters: {
  }
};
