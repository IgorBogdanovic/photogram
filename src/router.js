import Vue from 'vue'
import VueRouter from 'vue-router'

import { store } from './store/store'

import LogIn from './components/LogIn.vue'

// LAZY LOADING
const SignUp = resolve => {
	require.ensure(['./components/SignUp.vue'], () => {
		resolve(require('./components/SignUp.vue'));
	});
};

const Terms = resolve => {
	require.ensure(['./components/Terms.vue'], () => {
		resolve(require('./components/Terms.vue'));
	});
};

const HomePage = resolve => {
	require.ensure(['./components/HomePage.vue'], () => {
		resolve(require('./components/HomePage.vue'));
	});
};

const PostDetail = resolve => {
	require.ensure(['./components/PostDetail.vue'], () => {
		resolve(require('./components/PostDetail.vue'));
	});
};

Vue.use(VueRouter);

const routes = [
	{ path: '*', redirect: '/login' },
	{ path: '/', redirect: '/login' },
	{ path: '/login', name: 'login', component: LogIn },
	{ path: '/signup', name: 'signup', component: SignUp },
	{ path: '/terms', name: 'terms', component: Terms },
	{ path: '/homepage', name: 'homepage', component: HomePage,
		children: [
			{ path: 'photo', name: 'photo', component: PostDetail }
		]
	}
]

export default new VueRouter({ 
	mode: 'history',
	routes,
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition;
		}
		return { x: 0, y: 0 };
	}
});
