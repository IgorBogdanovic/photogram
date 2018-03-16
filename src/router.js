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

const User = resolve => {
	require.ensure(['./components/User.vue'], () => {
		resolve(require('./components/User.vue'));
	});
};

const Comments = resolve => {
	require.ensure(['./components/Comments.vue'], () => {
		resolve(require('./components/Comments.vue'));
	});
};

const Upload = resolve => {
	require.ensure(['./components/Upload.vue'], () => {
		resolve(require('./components/Upload.vue'));
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
			{ path: 'photo', name: 'photo', component: PostDetail, meta: { requiresAuth: true } },
			{ path: 'comments', name: 'comments', component: Comments, meta: { requiresAuth: true } }
		]
	},
	{ path: '/user_id::userId', name: 'user', props: true, component: User,
		children: [
			{ path: 'photo-detail', name: 'photo-detail', component: PostDetail, meta: { requiresAuth: true } },
			{ path: 'comments-view', name: 'comments-view', component: Comments, meta: { requiresAuth: true } },
			{ path: 'upload', name: 'upload', component: Upload, meta: { requiresAuth: true } }
		]
	}
]

export default new VueRouter({ 
	mode: 'history',
	routes,
	scrollBehavior (to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition;
		} else {
		  	return { x: 0, y: 0 };
		}
		// if (savedPosition) {
		// 	return new Promise((resolve, reject) => {
		// 		setTimeout(() => {
		// 			resolve(savedPosition)
		// 		}, 1000)
		// 	});
		// } else {
		// 	return new Promise((resolve, reject) => {
		// 		setTimeout(() => {
		// 			resolve({ x: 0, y: 0 })
		// 		}, 1000)
		// 	});
		// }
	}
});
