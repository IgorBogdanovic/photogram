<template>
	<div id="app">
		<app-header v-if="$route.name !== 'login' && $route.name !== 'signup' && $route.name !== 'terms'"></app-header>
		<transition mode="out-in"
			enter-active-class="animated zoomIn"
			leave-active-class="animated zoomOut">
			<router-view></router-view>
		</transition>
		<app-footer v-if="$route.name !== 'login' && $route.name !== 'signup' && $route.name !== 'terms'"></app-footer>
	</div>
</template>

<script>
	import Header from './components/Header.vue'
	import Footer from './components/Footer.vue'

	export default {
		name: 'app',
		components: {
			appHeader: Header,
			appFooter: Footer
		},
		beforeCreate() {
			this.$store.dispatch('login/tryAutoLogin');
		}
	}
</script>

<style lang="scss">
	@import '../node_modules/animate.css/animate.css';
	@import './scss/main';

	// animation durations changes
	.zoomOut, .zoomIn, .slideInLeft, .slideInLeft {
		animation-duration: .6s;
	}
</style>
