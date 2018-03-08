<template>
  	<div class="o-news-feed-post">

		<div v-if="$route.name === 'homepage'" class="o-news-feed-post__user  m-user">
			<router-link :to="{ name: 'user', params: { userId: newsFeedPost.user_id } }" tag="div" class="m-user__link" @click.native="inUserDetail">
				<div class="m-user__avatar">
					<img :src="storage + newsFeedPost.user_image.avatar" alt="avatar">
				</div>
				<p class="m-user__username">{{ newsFeedPost.username }}</p>
			</router-link>
		</div>

		<router-link v-if="$route.name === 'homepage' || $route.name === 'photo'" :to="{ name: 'photo' }" tag="div" class="o-news-feed-post__media  m-media" @click.native="inPostDetail">
			<template v-if="newsFeedPost.type_id == 1">
				<img :src="storage + newsFeedPost.media.large" alt="news feed post image">
			</template>
			<template v-else>
				<video controls>
					<source :src="storage + newsFeedPost.media" type="video/mp4">
				</video>
			</template>
		</router-link>
		<router-link v-if="$route.name === 'user' || $route.name === 'photo-detail'" :to="{ name: 'photo-detail' }" tag="div" class="o-news-feed-post__media  m-media" @click.native="inPostDetail">
			<template v-if="newsFeedPost.type_id == 1">
				<img :src="storage + newsFeedPost.media.large" alt="news feed post image">
			</template>
			<template v-else>
				<video controls>
					<source :src="storage + newsFeedPost.media" type="video/mp4">
				</video>
			</template>
		</router-link>

		<div class="o-news-feed-post__bar  m-bar">

			<div class="m-bar__icon  m-bar__icon--like" :class="{ 'is-active': postLiked }" @click="unLikePost">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="2700.998 281.935 22.901 23.092">
				<path id="Path_79" data-name="Path 79" class="cls-1" d="M19.339,1.1A4.1,4.1,0,0,0,13.823.959h0a5.493,5.493,0,0,1-3.337,1.318A5.225,5.225,0,0,1,6.809.959h0a4.166,4.166,0,0,0-5.448.069,4.366,4.366,0,0,0-.409,5.9h0L10.35,20.1,19.816,6.854A4.416,4.416,0,0,0,19.339,1.1Z" transform="translate(2702.004 283.205)"/>
				</svg>
			</div>
			
			<div class="m-bar__icon  m-bar__icon--comment" @click.stop="openMakeComment">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="2736.636 282 25.678 23.277">
				<path id="Union_15" data-name="Union 15" class="cls-1" d="M4.028,13.662a9.6,9.6,0,1,1,3.278,3.861L0,20.306Z" transform="translate(2739 283)"/>
				</svg>
			</div>

			<div class="m-bar__make-comment">
				<app-make-comment @commentSubmited="refreshComments"></app-make-comment>
			</div>

			<div class="m-bar__info-likes">
				<div class="m-bar__info-icon">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="2700.998 281.935 22.901 23.092">
					<path id="Path_79" data-name="Path 79" class="cls-1" d="M19.339,1.1A4.1,4.1,0,0,0,13.823.959h0a5.493,5.493,0,0,1-3.337,1.318A5.225,5.225,0,0,1,6.809.959h0a4.166,4.166,0,0,0-5.448.069,4.366,4.366,0,0,0-.409,5.9h0L10.35,20.1,19.816,6.854A4.416,4.416,0,0,0,19.339,1.1Z" transform="translate(2702.004 283.205)"/>
					</svg>
				</div>

				<p class="m-bar__likes-count">{{ likesCount }}</p>
			</div>
			
		</div>

		<div v-if="newsFeedPost.description" class="o-news-feed-post__media-descrpt  m-media-descrpt">
			<div class="m-media-descrpt__avatar">
				<img :src="storage + newsFeedPost.user_image.avatar" alt="this user avatar">
			</div>

			<p class="m-media-descrpt__txt">{{ newsFeedPost.description }}</p>
		</div>

		<div class="o-news-feed-post__comments  m-comments" v-if="newsFeedPost.comments_count >= 0">
			<div class="m-comments__comment-block" v-for="(comment, index) in newsFeedPost.comments" v-if="index < 1" :key="comment.id">
				<div class="m-comments__avatar">
					<img :src="storage + comment.user_image.avatar" alt="user avatar that made this comment">
				</div>

				<p class="m-comments__txt">{{ comment.body }}</p>
			</div>

			<router-link v-if="$route.name === 'homepage' && newsFeedPost.comments_count > 0"
				:to="{ name: 'comments' }" tag="span" class="m-comments__view-all" @click.native="viewAllComments">view all comments</router-link>
			<router-link v-if="$route.name === 'user' && newsFeedPost.comments_count > 0"
				:to="{ name: 'comments-view' }" tag="span" class="m-comments__view-all" @click.native="viewAllComments">view all comments</router-link>
		</div>

		<!-- <div class="o-news-feed-post__comments  m-comments" v-else>
			<div class="m-comments__comment-block" v-for="comment in newsFeedPost.comments" :key="comment.id">
				<div class="m-comments__avatar">
					<img :src="storage + comment.user_image.avatar" alt="user avatar that made this comment">
				</div>

				<p class="m-comments__txt">{{ comment.body }}</p>
			</div>
		</div> -->

    </div>
</template>

<script>
	import { posts, users } from '../axios-urls'
	import { mixinStorage, basicVars } from '../mixins'
	import MakeComment from './MakeComment.vue'

    export default {
        props: ['post'],
		mixins: [ mixinStorage, basicVars ],
		data () {
		    return {
				newsFeedPost: this.post,
				// postLiked: Boolean(this.post.auth_like_id),
				// likesCount: this.post.likes_count
				postLiked: null,
				likesCount: null
		    }
		},
		watch: {
			postLiked(e) {
				if (e) {
					this.likesCount += 1;
				} else this.likesCount -= 1;
			}
		},
		computed: {
			token() {
				return this.$store.getters['login/token'];
			},
			newsFeedPostsAll() {
				return this.$store.getters['nfPosts/newsFeedPostsAll'];
			}
		},
		methods: {
			openMakeComment(e) {
				const icon = $(e.currentTarget);

				if ( icon.hasClass('js-active') ) {
					icon.next().find('.m-make-comment__icon').removeClass('is-visible');
					icon.next().children().animate({
						opacity: 0,
						bottom: '-.6rem'
					}, 500, function() {
						icon.next().find('.m-make-comment__input').off( "focus" );
						icon.next().hide(0);
						icon.removeClass('js-active');
						icon.removeClass('is-active');
					});
				} else {
					const post = this.newsFeedPost;
					this.$store.dispatch('nfPosts/changeNewsFeedPost', post);
					icon.addClass('is-active');
					icon.next().show(0);
					icon.next().find('.m-make-comment__icon').addClass('is-visible');
					icon.next().children().animate({
						opacity: 1,
						bottom: '3.65rem'
					}, 500, function() {
						icon.addClass('js-active');
						icon.next().find('.m-make-comment__input').focus();
					});
				}
			},
			refreshComments() {
				const icon = $('.js-active');

				icon.next().children().animate({
					opacity: 0,
					bottom: '-.6rem'
				}, 500, function() {
					icon.next().find('.m-make-comment__input').off( "focus" );
					icon.next().hide(0);
					icon.removeClass('js-active');
					icon.removeClass('is-active');
				});
				// update post in NewsFeedPostsAll array
                posts.get('' + this.newsFeedPost.id, { headers: { Authorization: 'Bearer ' + this.token } })
                .then(res => {
					const post = res.data.data;
                    const postId = post.id;
                    const allPosts = this.newsFeedPostsAll;
                    const postIndex = allPosts.map(function(el) { return el.id; }).indexOf(postId);
                    const postObj = {
                        index: postIndex,
                        value: post
					};
					this.newsFeedPost = post;
					this.$store.dispatch('nfPosts/updateNewsFeedPostsAll', postObj);
                })
                .catch(error => {
                    console.log(error);
				});
            },
			unLikePost() {
                const postId = this.newsFeedPost.id;
				var likeId = null;
                if (this.postLiked) {
                    likeId = this.newsFeedPost.auth_like_id;
                    this.postLiked = false;
				} else this.postLiked = true;
                const data = {
                    type: 1,
                    id: postId,
                    likeId
				}
				this.$store.dispatch('nfPosts/unLike', data)
				.then(res => {
					console.log(0);
				})
				.catch(error => {
					console.log(error);
				});
            },
			inPostDetail() {
				const post = this.newsFeedPost;
				this.$store.dispatch('nfPosts/changeNewsFeedPost', post);
				this.$store.dispatch('nfPosts/changePostDetail');
				this.$store.dispatch('nfPosts/changeInfScrollDisable');
				if (this.windowWidth > this.breakpoint) {
					$('.o-homepage').addClass('u-overflow-disabled');
				}
			},
			inUserDetail() {
				users.get('find?id=' + this.newsFeedPost.user_id, { headers: { Authorization: 'Bearer ' + this.token } })
                .then(res => {
					// console.log(res);
					const user = res.data.data;
					this.$store.dispatch('nfPosts/changeUser', user);
                })
                .catch(error => {
                    console.log(error);
				});
			},
			viewAllComments() {
				const post = this.newsFeedPost;
				this.$store.dispatch('nfPosts/changeNewsFeedPost', post);
				this.$store.dispatch('nfPosts/changeAllComments');
				this.$store.dispatch('nfPosts/changeInfScrollDisable');
				if (this.windowWidth > this.breakpoint) {
					$('.o-homepage').addClass('u-overflow-disabled');
				}
			}
		},
		components: {
            appMakeComment: MakeComment
		},
		created() {
			this.postLiked = Boolean(this.newsFeedPost.auth_like_id);
			// this below is because watch property will react on change of this.postLiked
			if (this.postLiked) {
				this.likesCount = this.newsFeedPost.likes_count - 1;
			} else this.likesCount = this.newsFeedPost.likes_count + 1;
		},
		// updated() {
		// 	console.log('u');
		// },
		// destroyed() {
		// 	console.log(0);
		// }
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

		&__link {
			display: inline-block;
			cursor: pointer;
		}

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
		position: relative;
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
			cursor: pointer;

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
						fill: $lightgreen;
					}
				}
			}

			&--comment {
				&.is-active {
					svg {
						stroke: $gray;
						fill: $gray;
					}
				}
			}
		}

		&__make-comment {
			display: none;
			position: absolute;
			right: 0;
			width: 88%;

			@include breakpoint(desktop) {
				width: 91%;
			}
		}

		&__info-likes {
			float: right;
			margin-top: 1.7rem;
			margin-right: 2rem;
			cursor: pointer;

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
			cursor: pointer;

			@include breakpoint(desktop) {
				margin-left: 0.5rem;
			}
		}
	}

	// corrections when loaded in User component
	.o-user__posts-wrapper.grid-view {
		.o-news-feed-post {
			@include breakpoint(mobile) {
				float: left;
				width: 33%;
				margin-bottom: .5%;

				&:not(:nth-child(3n)) {
					margin-right: .5%;
				}

				&__bar, &__media-descrpt, &__comments {
					display: none;
				}
			}
		}
	}
</style>
