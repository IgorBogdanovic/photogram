<template>
  	<div class="o-news-feed-post">

		<div class="o-news-feed-post__user  m-user">
			<div class="m-user__avatar">
				<img :src="storage + followedUserPost.user_image.avatar" alt="avatar">
			</div>
			<p class="m-user__username">{{ followedUserPost.username }}</p>
		</div>

		<router-link :to="{ name: 'photo' }" tag="div" class="o-news-feed-post__media  m-media" @click.native="inPostDetail">
			<template v-if="followedUserPost.type_id == 1">
				<img :src="storage + followedUserPost.media.large" alt="news feed post image">
			</template>
			<template v-else>
				<video controls>
					<source :src="storage + followedUserPost.media" type="video/mp4">
				</video>
			</template>
		</router-link>

		<div class="o-news-feed-post__bar  m-bar">

			<div class="m-bar__icon  m-bar__icon--like">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="2700.998 281.935 22.901 23.092">
				<path id="Path_79" data-name="Path 79" class="cls-1" d="M19.339,1.1A4.1,4.1,0,0,0,13.823.959h0a5.493,5.493,0,0,1-3.337,1.318A5.225,5.225,0,0,1,6.809.959h0a4.166,4.166,0,0,0-5.448.069,4.366,4.366,0,0,0-.409,5.9h0L10.35,20.1,19.816,6.854A4.416,4.416,0,0,0,19.339,1.1Z" transform="translate(2702.004 283.205)"/>
				</svg>
			</div>

			<div class="m-bar__icon  m-bar__icon--comment">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="2736.636 282 25.678 23.277">
				<path id="Union_15" data-name="Union 15" class="cls-1" d="M4.028,13.662a9.6,9.6,0,1,1,3.278,3.861L0,20.306Z" transform="translate(2739 283)"/>
				</svg>
			</div>

			<div class="m-bar__info-likes">
				<div class="m-bar__info-icon">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="2700.998 281.935 22.901 23.092">
					<path id="Path_79" data-name="Path 79" class="cls-1" d="M19.339,1.1A4.1,4.1,0,0,0,13.823.959h0a5.493,5.493,0,0,1-3.337,1.318A5.225,5.225,0,0,1,6.809.959h0a4.166,4.166,0,0,0-5.448.069,4.366,4.366,0,0,0-.409,5.9h0L10.35,20.1,19.816,6.854A4.416,4.416,0,0,0,19.339,1.1Z" transform="translate(2702.004 283.205)"/>
					</svg>
				</div>

				<p class="m-bar__likes-count">{{ followedUserPost.likes_count }}</p>
			</div>
			
		</div>

		<div class="o-news-feed-post__media-descrpt  m-media-descrpt">
			<div class="m-media-descrpt__avatar">
				<img :src="storage + followedUserPost.user_image.avatar" alt="this user avatar">
			</div>

			<p class="m-media-descrpt__txt">{{ followedUserPost.description }}</p>
		</div>

		<div class="o-news-feed-post__comments  m-comments" v-if="followedUserPost.comments_count > 5">
			<div class="m-comments__comment-block" v-for="(comment, index) in followedUserPost.comments" v-if="index < 2" :key="comment.id">
				<div class="m-comments__avatar">
					<img :src="storage + comment.user_image.avatar" alt="user avatar that made this comment">
				</div>

				<p class="m-comments__txt">{{ comment.body }}</p>
			</div>

			<!-- need route path once made -->
			<router-link to="/" class="m-comments__view-all">view all comments</router-link>
		</div>

		<div class="o-news-feed-post__comments  m-comments" v-else>
			<div class="m-comments__comment-block" v-for="comment in followedUserPost.comments" :key="comment.id">
				<div class="m-comments__avatar">
					<img :src="storage + comment.user_image.avatar" alt="user avatar that made this comment">
				</div>

				<p class="m-comments__txt">{{ comment.body }}</p>
			</div>
		</div>

    </div>
</template>

<script>
	import { mixinStorage, basicVars } from '../mixins'

    export default {
        props: ['followedUserPost'],
		mixins: [ mixinStorage, basicVars ],
		data () {
		    return {
		    }
		},
		methods: {
			inPostDetail() {
				const post = this.followedUserPost;
				this.$store.dispatch('nfPosts/changeNewsFeedPost', post);
				this.$store.dispatch('nfPosts/changePostDetail');
				this.$store.dispatch('nfPosts/changeInfScrollDisable');
				if (this.windowWidth > this.breakpoint) {
					$('.o-homepage').addClass('u-overflow-disabled');
				}
			}
		},
		beforeCreate() {
            this.$store.dispatch('headings/actSetHeading', 'photogram');
        }
	}
</script>

<style lang="scss" scoped>
	@import '../scss/settings';

    .o-news-feed-post {
		font-family: 'Roboto', sans-serif;
		margin-bottom: 2.8rem;

		@include breakpoint(desktop) {
			float: left;
			width: 21.6%;
			flex-grow: 1;
    		overflow: hidden;

			&:not(:nth-child(4n)) {
				margin-right: 4.5%;
			}
		}

		img {
			width: 100%;
			height: 100%;
		}
	}

	.m-user {
		height: 7.5rem;

		&__avatar {
			float: left;
			width: 4.4rem;
			height: 4.4rem;
			margin-top: 1.7rem;
			margin-left: 1.7rem;

			img {
				border-radius: 50%;
			}

			@include breakpoint(desktop) {
				margin-left: 0;
			}
		}

		&__username {
			@include fontSizeRem(14, 20);
			@include lineHeightRem(45, 24);
			color: $lightblack;
			display: inline-block;
			height: 4rem;
			margin-top: 1.7rem;
			margin-left: 1rem;

			@include breakpoint(desktop) {
				margin-top: 2.7rem;
			}
		}
	}

	.m-media {
		position: relative;
		width: 100%;
		cursor: pointer;

		// Initializing 1:1 ratio
		&:after{
			content: "";
			display: block;
			padding-top: 100%;
		}

		img, video {
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
		}
		//////////////////////////
		
		video {
			width: 100%;
			height: 100%;
			object-fit: fill;
		}
	}

	.m-bar {
		height: 4.2rem;
		border-bottom: 1px solid rgba($darkgrey, .5);
		-webkit-background-clip: padding-box;
		background-clip: padding-box;

		&__icon {
			display: inline-block;
			width: 2.5rem;
			height: 2.5rem;
			margin-top: 0.9rem;
			margin-left: 1.3rem;

			@include breakpoint(desktop) {
				margin-left: 1rem;

				&:first-child {
					margin-left: 0;
				}
			}

			svg {
				stroke: $lightblack;
				stroke-width: 0.1rem;
				fill: $white;

				@include breakpoint(desktop) {
                    stroke-width: 0.2rem;
                }
			}
			
			&--like {
				&.is-active {
					svg {
						stroke: $lightgreen;
						stroke-width: 0.1rem;
						fill: $lightgreen;

						@include breakpoint(desktop) {
							stroke-width: 0.2rem;
						}
					}
				}
			}
		}

		&__info-likes {
			float: right;
			margin-top: 1.7rem;
			margin-right: 2rem;

			@include breakpoint(desktop) {
				margin-right: 0;
			}
		}

		&__info-icon {
			display: inline-block;
			width: 1.3rem;
			height: 1.3rem;
			fill: $lightgreen;
			margin-right: 0.5rem;
		}

		&__likes-count {
			@include fontSizeRem(10, 16);
			@include lineHeightRem(12, 11);
			color: $lightblack;
			display: inline-block;
			vertical-align: top;
			opacity: 0.4;
		}
	}
        
	.m-media-descrpt {
		width: 89%;
		margin: 0.9rem auto 1.7rem auto;

		@include breakpoint(desktop) {
			width: 100%;
			margin-top: 2rem;
			margin-bottom: 2.6rem;
		}

		&__avatar {
			float: left;
			width: 1.8rem;
			height: 1.8rem;

			img {
                border-radius: 50%;
            }

			@include breakpoint(desktop) {
				width: 3.2rem;
				height: 3.2rem;
			}
		}

		&__txt {
			@include fontSizeRem(10, 16);
			@include lineHeightRem(12, 19);
			width: 90%;
			color: $lightblack;
			display: inline-block;
			margin-top: 0.7rem;
			margin-left: 1rem;

			@include breakpoint(desktop) {
				width: 83%;
				margin-left: 0.7rem;
			}
		}
	}

	.m-comments {
		width: 89%;
		margin: 0 auto;

		@include breakpoint(desktop) {
			width: 100%;
		}

		&__comment-block {
			margin-top: 0.9rem;
			margin-bottom: 1.7rem;

			@include breakpoint(desktop) {
				margin-top: 2rem;
				margin-bottom: 2.6rem;
			}
		}

		&__avatar {
			float: left;
			width: 1.8rem;
			height: 1.8rem;

			img {
                border-radius: 50%;
            }

			@include breakpoint(desktop) {
				width: 3.2rem;
				height: 3.2rem;
			}
		}

		&__txt {
			@include fontSizeRem(10, 16);
			@include lineHeightRem(12, 19);
			width: 90%;
			color: $lightblack;
			display: inline-block;
			margin-top: 0.5rem;
			margin-left: 1rem;

			@include breakpoint(desktop) {
				width: 83%;
				margin-top: 0.7rem;
				margin-left: 0.7rem;
			}
		}

		&__view-all {
			@include fontSizeRem(10, 14);
			@include lineHeightRem(12, 17);
			color: $lightblack;
			opacity: 0.5;

			@include breakpoint(desktop) {
				margin-left: 0.5rem;
			}
		}
	}
</style>
