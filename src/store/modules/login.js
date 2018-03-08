import { auth } from '../../axios-urls'
import router from '../../router'

export const login = {
  namespaced: true,
  
  state: {
    idToken: null,
    idUser: null,
    username: null,
    userAvatar: null,
    userProfile: null,
    userAbout: null,
    userPostsNo: null,
    userFollowersNo: null,
    userFollowingNo: null,
    error: false
  },

  mutations: {
    authUser(state, userData) {
      state.idToken = userData.token;
      state.idUser = userData.id;
      state.username = userData.username;
      state.userAvatar = userData.avatar;
      state.userProfile = userData.profile;
      state.userAbout = userData.about;
      state.userPostsNo = userData.posts;
      state.userFollowersNo = userData.followers;
      state.userFollowingNo = userData.following;
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
              username: res.data.data.username,
              avatar: res.data.data.image.avatar,
              profile: res.data.data.image.profile,
              about: res.data.data.about,
              posts: res.data.data.posts_count,
              followers: res.data.data.followers_count,
              following: res.data.data.following_count
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
    username(state) {
      return state.username;
    },
    userAvatar(state) {
      return state.userAvatar;
    },
    userProfile(state) {
      return state.userProfile;
    },
    userAbout(state) {
      return state.userAbout;
    },
    userPostsNo(state) {
      return state.userPostsNo;
    },
    userFollowersNo(state) {
      return state.userFollowersNo;
    },
    userFollowingNo(state) {
      return state.userFollowingNo;
    },
    error(state) {
      return state.error;
    }
  }
};
