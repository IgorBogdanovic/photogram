<template>
  	<div class="o-footer  u-only-mobile">

			<div class="o-footer__home  a-home" :class="{ 'is-active': isHomeActive }">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="2700 1481 29 29">
				<g id="Group_132" data-name="Group 132" transform="translate(-267 487)">
					<ellipse id="Ellipse_18" data-name="Ellipse 18" class="cls-1" cx="14.5" cy="14.5" rx="14.5" ry="14.5" transform="translate(2967 994)"/>
					<rect id="Rectangle_119" data-name="Rectangle 119" class="cls-2" width="13" height="11" transform="translate(2975 1003)"/>
					<rect id="Rectangle_120" data-name="Rectangle 120" class="cls-1" width="3" height="5" transform="translate(2980 1010)"/>
				</g>
				</svg>
			</div>

			<div class="o-footer__avatar  a-avatar">
				<img :src="storage + userAvatar" alt="logged user avatar">
			</div>

			<div class="o-footer__upload  a-upload">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="2830.105 1480.158 29.843 29.842">
				<g id="Group_370" data-name="Group 370" transform="translate(2620.228 1461.233)">
					<g id="Ellipse_170" data-name="Ellipse 170" class="cls-1" transform="translate(209.876 18.925)">
					<ellipse class="cls-3" cx="14.921" cy="14.921" rx="14.921" ry="14.921"/>
					<ellipse class="cls-4" cx="14.921" cy="14.921" rx="13.921" ry="13.921"/>
					</g>
					<path id="Union_49" data-name="Union 49" class="cls-2" d="M6.353,13.573V8.086H.867a.866.866,0,1,1,0-1.732H6.353V.867a.866.866,0,1,1,1.732,0V6.353h5.487a.866.866,0,0,1,0,1.732H8.086v5.487a.866.866,0,0,1-1.732,0Z" transform="translate(217.764 26.359)"/>
				</g>
				</svg>
			</div>

		</div>
</template>

<script>
	import { mixinStorage } from '../mixins'

    export default {
        computed: {
			heading() {
				return this.$store.getters['headings/heading'];
			},
            isHomeActive() {
                return this.heading === 'photogram';
			},
			userAvatar() {
				return this.$store.getters['login/userAvatar'];
			}
		},
		mixins: [ mixinStorage ]
	}
</script>

<style lang="scss" scoped>
	@import '../scss/settings';

    .o-footer {
        z-index: 10;
		position: fixed;
		bottom: 0;
        background-color: $white;
		width: 100vw;
		padding-bottom: 0.6rem;
		border-top: 1px solid rgba($darkgrey, .5);
	}

	.a-home {
		float: left;
		width: 2.9rem;
		height: 2.9rem;
		margin-top: 0.6rem;
		margin-left: 1.5rem;
		
		& .cls-1 {
			fill: $lightblack;
		}

		& .cls-2 {
			fill: $white;
		}

		&.is-active {
			& .cls-2 {
				fill: $lightgreen;
			}
		}
	}

	.a-upload {
		width: 2.9rem;
		height: 2.9rem;
		margin: 0.6rem auto auto auto;
		
		& .cls-1, .cls-4 {
			fill: none;
		}

		& .cls-1 {
			stroke: $lightblack;
			stroke-width: 0.1rem;
		}

		& .cls-2 {
			fill: $lightblack;
		}

		& .cls-3 {
			stroke: none;
		}

		&.is-active {
			& .cls-2 {
				fill: $lightgreen;
			}
		}
	}

	.a-avatar {
		float: right;
		width: 2.9rem;
		height: 2.9rem;
		background-color: burlywood;
		border-radius: 50%;
		margin-top: 0.6rem;
		margin-right: 1.5rem;
		
		img {
			width: 100%;
		}
	}
</style>
