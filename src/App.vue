<template>
	<div id="app">
		<transition mode="out-in"
			enter-active-class="animated zoomIn"
			leave-active-class="animated zoomOut">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script>
	export default {
		name: 'app',
		beforeCreate() {
			this.$store.dispatch('login/tryAutoLogin');
		}
	}
</script>

<style lang="scss">
	@import '../node_modules/animate.css/animate.css';
	@import './scss/main';
</style>
