<template>
  	
    <div class="o-media-detail">

        <div class="o-media-detail__wrapper">

            <div class="o-media-detail__user  m-detail-user">
				<router-link :to="{ name: 'user', params: { userId: newsFeedPost.user_id } }" tag="div" class="m-detail-user__link">
					<div class="m-detail-user__avatar">
						<img :src="storage + newsFeedPost.user_image.avatar" alt="avatar">
					</div>
					<p class="m-detail-user__username">{{ newsFeedPost.username }}</p>
				</router-link>
            </div>

            <div class="o-media-detail__media  m-detail-media">
                <a href="javascript:history.go(-1)" class="m-detail-media__close  u-only-desktop">
                    <icon class="icon" name="close"></icon>
                </a>
				
				<ul v-if="$route.name === 'photo-detail' && $route.params.userId == loggedUserId" class="m-detail-media__post-edit  c-post-edit" @click="openList">
					<icon class="icon" name="ellipsis-h"></icon>
					<li class="m-detail-media__icon  m-detail-media__icon--edit  c-post-edit__icon  c-post-edit__icon--edit"><icon class="icon" name="edit"></icon></li>
					<li class="m-detail-media__icon  m-detail-media__icon--delete  c-post-edit__icon  c-post-edit__icon--delete" @click="deletePost"><icon class="icon" name="trash-o"></icon></li>
				</ul>

                <template v-if="newsFeedPost.type_id == 1">
                    <img :src="storage + newsFeedPost.media.large" alt="news feed post image">
                </template>
                <template v-else>
                    <video controls>
                        <source :src="storage + newsFeedPost.media" type="video/mp4">
						<source :src="storage + newsFeedPost.media" type="video/flv">
						<source :src="storage + newsFeedPost.media" type="video/wmv">
						<source :src="storage + newsFeedPost.media" type="video/avi">
						<source :src="storage + newsFeedPost.media" type="video/mpeg">
						<source :src="storage + newsFeedPost.media" type="video/qt">
                    </video>
                </template>

                <div class="m-detail-media__chevron  m-detail-media__chevron--left  u-only-desktop" @click="arrowClick('left')">
                    <icon class="icon" name="chevron-left"></icon>
                </div>

                <div class="m-detail-media__chevron  m-detail-media__chevron--right  u-only-desktop" @click="arrowClick('right')">
                    <icon class="icon" name="chevron-right"></icon>
                </div>
            </div>

            <div class="o-media-detail__bar  m-detail-bar">

                <div class="m-detail-bar__icon  m-detail-bar__icon--like" :class="{ 'is-active': newsFeedPost.auth_like_id }" @click="unLikePost">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="2700.998 281.935 22.901 23.092">
                    <path id="Path_79" data-name="Path 79" class="cls-1" d="M19.339,1.1A4.1,4.1,0,0,0,13.823.959h0a5.493,5.493,0,0,1-3.337,1.318A5.225,5.225,0,0,1,6.809.959h0a4.166,4.166,0,0,0-5.448.069,4.366,4.366,0,0,0-.409,5.9h0L10.35,20.1,19.816,6.854A4.416,4.416,0,0,0,19.339,1.1Z" transform="translate(2702.004 283.205)"/>
                    </svg>
                </div>

                <div class="m-detail-bar__icon  m-detail-bar__icon--comment" @click.stop="openMakeComment">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="2736.636 282 25.678 23.277">
                    <path id="Union_15" data-name="Union 15" class="cls-1" d="M4.028,13.662a9.6,9.6,0,1,1,3.278,3.861L0,20.306Z" transform="translate(2739 283)"/>
                    </svg>
                </div>

				<div class="m-detail-bar__make-comment">
					<app-make-comment @commentSubmited="refreshComments"></app-make-comment>
				</div>

				<router-link v-if="$route.name === 'homepage' || $route.name === 'photo'"
				:to="{ name: 'likes', params: { postId: newsFeedPost.id, typeId: 1 } }" tag="div" class="m-detail-bar__info-likes">
					<div class="m-detail-bar__info-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="2700.998 281.935 22.901 23.092">
                        <path id="Path_79" data-name="Path 79" class="cls-1" d="M19.339,1.1A4.1,4.1,0,0,0,13.823.959h0a5.493,5.493,0,0,1-3.337,1.318A5.225,5.225,0,0,1,6.809.959h0a4.166,4.166,0,0,0-5.448.069,4.366,4.366,0,0,0-.409,5.9h0L10.35,20.1,19.816,6.854A4.416,4.416,0,0,0,19.339,1.1Z" transform="translate(2702.004 283.205)"/>
                        </svg>
                    </div>

                    <p class="m-detail-bar__likes-count">{{ newsFeedPost.likes_count }}</p>
				</router-link>
				<router-link v-if="$route.name === 'user' || $route.name === 'photo-detail'"
				:to="{ name: 'likes-view', params: { postId: newsFeedPost.id, typeId: 1 } }" tag="div" class="m-detail-bar__info-likes">
					<div class="m-detail-bar__info-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="2700.998 281.935 22.901 23.092">
                        <path id="Path_79" data-name="Path 79" class="cls-1" d="M19.339,1.1A4.1,4.1,0,0,0,13.823.959h0a5.493,5.493,0,0,1-3.337,1.318A5.225,5.225,0,0,1,6.809.959h0a4.166,4.166,0,0,0-5.448.069,4.366,4.366,0,0,0-.409,5.9h0L10.35,20.1,19.816,6.854A4.416,4.416,0,0,0,19.339,1.1Z" transform="translate(2702.004 283.205)"/>
                        </svg>
                    </div>

                    <p class="m-detail-bar__likes-count">{{ newsFeedPost.likes_count }}</p>
				</router-link>
                
            </div>

            <div v-if="newsFeedPost.description" class="o-media-detail__media-descrpt  m-detail-media-descrpt">
				<router-link :to="{ name: 'user', params: { userId: newsFeedPost.user_id } }" tag="div" class="m-detail-media-descrpt__avatar">
					<img :src="storage + newsFeedPost.user_image.avatar" alt="this user avatar">
				</router-link>

                <p class="m-detail-media-descrpt__txt">{{ newsFeedPost.description }}</p>
            </div>

            <div class="o-media-detail__comments  m-detail-comments" v-if="newsFeedPost.comments_count >= 0">
                <div class="m-detail-comments__comment-block" v-for="(comment, index) in newsFeedPost.comments" v-if="index < 1" :key="comment.id">
					<router-link :to="{ name: 'user', params: { userId: comment.user_id } }" tag="div" class="m-detail-comments__avatar">
						<img :src="storage + comment.user_image.avatar" alt="user avatar that made this comment">
					</router-link>

                    <p class="m-detail-comments__txt">
						<router-link v-if="comment.reply_username" :to="{ name: 'user', params: { userId: comment.reply_user_id } }" tag="span">
							@{{ comment.reply_username }}
						</router-link>
						
						<template v-if="comment.reply_username">
							{{ (comment.body).replace( (comment.body).match( new RegExp('@' + comment.reply_username, 'i') ), '' ) }}
						</template>
						<template v-else>
							{{ (comment.body) }}
						</template>
					</p>
                </div>

                <!-- need route path once made -->
                <router-link v-if="$route.name === 'photo' && newsFeedPost.comments_count > 0"
					:to="{ name: 'comments' }" tag="span" class="m-detail-comments__view-all">view all comments</router-link>
				<router-link v-if="$route.name === 'photo-detail' && newsFeedPost.comments_count > 0"
					:to="{ name: 'comments-view' }" tag="span" class="m-detail-comments__view-all">view all comments</router-link>
            </div>

        </div>

    </div>

</template>

<script>
	import { store } from '../store/store';
	import { mixinStorage, basicVars } from '../mixins'
	import { posts } from '../axios-urls'
	import MakeComment from './MakeComment.vue'

    export default {
		mixins: [ mixinStorage, basicVars ],
        computed: {
			token() {
				return this.$store.getters['login/token'];
			},
			loggedUserId() {
				return this.$store.getters['login/idUser'];
            },
            newsFeedPostsAll() {
				return this.$store.getters['nfPosts/newsFeedPostsAll'];
			},
			newsFeedPost() {
				return this.$store.getters['nfPosts/newsFeedPost'];
			}
        },
        methods: {
			openList(e) {
				e.stopPropagation();
				const iconPostEdit = $(e.currentTarget);
				iconPostEdit.addClass('js-active').find('.m-detail-media__icon').slideToggle(300);
			},
			deletePost() {
				const postId = this.newsFeedPost.id;
                this.$store.dispatch('nfPosts/deletePost', postId)
                    .then(res => {
                        const allPosts = this.newsFeedPostsAll;
						const postIndex = allPosts.map(function(el) { return el.id; }).indexOf(postId);
						if (postIndex > -1) {
							allPosts.splice(postIndex, 1);
							this.$store.dispatch('nfPosts/changeNewsFeedPost', allPosts[postIndex]);
						}
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
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
				// update post in NewsFeedPostsAll array and NewsFeedPost
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
					this.$store.dispatch('nfPosts/changeNewsFeedPost', post);
					this.$store.dispatch('nfPosts/updateNewsFeedPostsAll', postObj);
                })
                .catch(error => {
                    console.log(error);
				});
            },
			unLikePost() {
                const postId = this.newsFeedPost.id;
                const likeId = this.newsFeedPost.auth_like_id;
                const data = {
                    type: 1,
                    id: postId,
                    likeId
				}
				this.$store.dispatch('nfPosts/unLike', data)
					.then(res => {
						// console.log(res);
						const data = res.data.data;
						const allPosts = this.newsFeedPostsAll;
						const likesNo = this.newsFeedPost.likes_count;
						const index = allPosts.map(function(el) { return el.id; }).indexOf(postId);
						let dataObj;
						
						if (data) {
							dataObj = {
								index: index,
								value: { auth_like_id: data.id, likes_count: likesNo + 1 }
							};
						} else {
							dataObj = {
								index: index,
								value: { auth_like_id: null, likes_count: likesNo - 1 }
							};
						}
						this.$store.dispatch('nfPosts/updateNewsFeedPostsAll', dataObj);
						this.$store.dispatch('nfPosts/changeNewsFeedPost', allPosts[index]);
					})
					.catch(error => {
						console.log(error);
					});
            },
			arrowClick(arrow) {
				const iconPostEdit = $('.m-detail-media__post-edit');
				if ( iconPostEdit.hasClass('js-active') ) {
					iconPostEdit.removeClass('js-active').find('.m-detail-media__icon').hide(0);
				}
				const iconComment = $('.m-detail-bar__icon--comment');
				if ( iconComment.hasClass('js-active') ) {
					iconComment.next().find('.m-make-comment__icon').removeClass('is-visible');
					iconComment.next().children().css({
						opacity: 0,
						bottom: '-.6rem'
					});
					iconComment.next().find('.m-make-comment__input').off( 'focus' );
					iconComment.next().hide(0);
					iconComment.removeClass('js-active');
					iconComment.removeClass('is-active');
				}
                const postId = this.newsFeedPost.id;
                const allPosts = this.newsFeedPostsAll;
                const postIndex = allPosts.map(function(el) { return el.id; }).indexOf(postId);

                if (arrow === 'left' && postIndex > 0) {
                    this.$store.dispatch('nfPosts/changeNewsFeedPost', allPosts[postIndex - 1]);
                } else if (arrow === 'right' && postIndex < allPosts.length - 1) {
                    this.$store.dispatch('nfPosts/changeNewsFeedPost', allPosts[postIndex + 1]);
                } else return false;
			}
		},
		components: {
            appMakeComment: MakeComment
		},
		beforeRouteEnter (to, from, next) {
			posts.get('' + to.params.postId, { headers: { Authorization: 'Bearer ' + store.getters['login/token'] } })
                .then(res => {
					const post = res.data.data;
					store.dispatch('nfPosts/changeNewsFeedPost', post);
					next();
                })
                .catch(error => {
                    console.log(error);
				});
        },
        created() {
            if (this.windowWidth > this.breakpoint) {
                this.$store.dispatch('headings/actSetHeading', 'photogram');
			} else this.$store.dispatch('headings/actSetHeading', 'Photo');
		}
	}
</script>

<style lang="scss" scoped>
	@import '../scss/settings';

	.o-media-detail {
        font-family: 'Roboto', sans-serif;
		width: 100%;
		height: 100%;
		background-color: $white;
        z-index: 9;
        
        @include breakpoint(desktop) {
            position: fixed;
            top: 0;
            left: 0;
            background-color: rgba($lightblack, .9);
        }

		&__wrapper {
			margin-top: -0.3rem;
			margin-bottom: 1.5rem;
            
            @include breakpoint(desktop) {
                position: absolute;
                width: 50rem;
				height: auto;
				margin-bottom: 0;
                top: 55%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
        }
        
        img {
			width: 100%;
			height: 100%;
		}
	}

	.m-detail-user {
		height: 6.5rem;

		&__link {
			cursor: pointer;
		}

		&__avatar {
			float: left;
			width: 4.4rem;
			height: 4.4rem;
			margin-top: 1.1rem;
			margin-left: 1.7rem;

			img {
				border-radius: 50%;
			}

			@include breakpoint(desktop) {
                margin-top: 0;
				margin-left: 0;
			}
		}

		&__username {
			@include fontSizeRem(14, 20);
			@include lineHeightRem(45, 24);
			color: $lightblack;
			display: inline-block;
			height: 4rem;
			margin-top: 1.1rem;
			margin-left: 1rem;

			@include breakpoint(desktop) {
                color: $white;
                margin-top: 0.8rem;
			    margin-left: 1rem;
			}
		}
	}

	.m-detail-media {
		position: relative;
        width: 100%;

		&__post-edit {
			@include breakpoint(desktop) {
				width: 3.5rem;
				height: 3.5rem;
			}
		}

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
        
        &__close {
            position: absolute;
            width: 4rem;
            height: 4rem;
            color: $white;
            top: -8%;
            right: -8%;
            cursor: pointer;

            svg {
                width: 100%;
                height: 100%;
            }
        }

        &__chevron {
            position: absolute;
            width: 5rem;
            height: 4rem;
            color: $white;
            top: 52%;
            transform: translateY(-50%);
            cursor: pointer;

            svg {
                width: 100%;
                height: 100%;
            }

            &--left {
                left: -15%;
            }
            
            &--right {
                right: -15%;
            }
        }
	}

	.m-detail-bar {
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
					stroke: $white;
					stroke-width: 0.2rem;
					fill: transparent;
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
            
            @include breakpoint(desktop) {
                width: 1.7rem;
                height: 1.7rem;
                margin-top: -0.4rem;
            }
		}

		&__likes-count {
			@include fontSizeRem(10, 16);
			@include lineHeightRem(12, 11);
			color: $lightblack;
			display: inline-block;
			vertical-align: top;
            opacity: 0.4;
            
            @include breakpoint(desktop) {
                color: $white;
                opacity: .6;
            }
		}
	}
		
	.m-detail-media-descrpt {
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
			cursor: pointer;

			@include breakpoint(desktop) {
				width: 3.2rem;
				height: 3.2rem;
            }
            
            img {
                border-radius: 50%;
            }
		}

		&__txt {
			@include fontSizeRem(10, 16);
			@include lineHeightRem(12, 19);
			width: 90%;
			color: $lightblack;
			display: inline-block;
			margin-top: .3rem;
			margin-left: 1rem;

			@include breakpoint(desktop) {
                width: 83%;
                color: $white;
				margin-top: .7rem;
				margin-left: .7rem;
			}
		}
	}

	.m-detail-comments {
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
			cursor: pointer;
            
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
			margin-top: .3rem;
			margin-left: 1rem;

			@include breakpoint(desktop) {
                width: 83%;
                color: $white;
				margin-top: .7rem;
				margin-left: .7rem;
			}

			span {
                font-family: 'Roboto-Bold', sans-serif;
                color: blue;
                cursor: pointer;

				@include breakpoint(desktop) {
					color: aqua;
				}
            }
		}

		&__view-all {
			@include fontSizeRem(10, 14);
			@include lineHeightRem(12, 17);
			color: $lightblack;
			opacity: 0.5;
			cursor: pointer;

			@include breakpoint(desktop) {
                color: $white;
				margin-left: 0.5rem;
			}
		}
	}

	.m-detail-bar__make-comment {
        @include breakpoint(desktop) {
            width: 95%;
        }
    }
</style>
