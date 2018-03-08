import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import Cookies from 'js-cookie'

import { auth } from '../axios-urls'
import router from '../router'
import { login } from './modules/login'
import { signup } from './modules/signup'
import { headings } from './modules/headings'
import { nfPosts } from './modules/nfPosts'

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		dbStorage: 'http://192.168.0.154:8000/storage/'
	},

	getters: {
		dbStorage(state) {
			return state.dbStorage;
		}
	},

	plugins: [createPersistedState({
		key: 'user',
		paths: [
			'login.idUser',
			'login.username',
			'login.userAvatar',
			'login.userProfile',
			'login.userAbout',
			'login.userPostsNo',
			'login.userFollowersNo',
			'login.userFollowingNo'
		],
		storage: {
		  getItem: key => Cookies.get(key),
		  setItem: (key, value) => Cookies.set(key, value, { expires: 3 }),
		  removeItem: key => Cookies.remove(key)
		}
	})],

	modules: {
		login,
		signup,
		headings,
		nfPosts
	}
});
