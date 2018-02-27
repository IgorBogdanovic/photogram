<template>
  	
    <div class="o-media-detail">

        <div class="o-media-detail__wrapper">

            <div class="o-media-detail__user  m-detail-user">
                <div class="m-detail-user__avatar">
                    <img :src="storage + newsFeedPost.user_image.avatar" alt="avatar">
                </div>
                <p class="m-detail-user__username">{{ newsFeedPost.username }}</p>
            </div>

            <div class="o-media-detail__media  m-detail-media">
                <a href="javascript:history.go(-1)" class="m-detail-media__close  u-only-desktop" @click="outPostDetail">
                    <icon class="icon" name="close"></icon>
                </a>

                <template v-if="newsFeedPost.type_id == 1">
                    <img :src="storage + newsFeedPost.media.large" alt="news feed post image">
                </template>
                <template v-else>
                    <video controls>
                        <source :src="storage + newsFeedPost.media" type="video/mp4">
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

                <div class="m-detail-bar__icon  m-detail-bar__icon--like">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="2700.998 281.935 22.901 23.092">
                    <path id="Path_79" data-name="Path 79" class="cls-1" d="M19.339,1.1A4.1,4.1,0,0,0,13.823.959h0a5.493,5.493,0,0,1-3.337,1.318A5.225,5.225,0,0,1,6.809.959h0a4.166,4.166,0,0,0-5.448.069,4.366,4.366,0,0,0-.409,5.9h0L10.35,20.1,19.816,6.854A4.416,4.416,0,0,0,19.339,1.1Z" transform="translate(2702.004 283.205)"/>
                    </svg>
                </div>

                <div class="m-detail-bar__icon  m-detail-bar__icon--comment">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="2736.636 282 25.678 23.277">
                    <path id="Union_15" data-name="Union 15" class="cls-1" d="M4.028,13.662a9.6,9.6,0,1,1,3.278,3.861L0,20.306Z" transform="translate(2739 283)"/>
                    </svg>
                </div>

                <div class="m-detail-bar__info-likes">
                    <div class="m-detail-bar__info-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="2700.998 281.935 22.901 23.092">
                        <path id="Path_79" data-name="Path 79" class="cls-1" d="M19.339,1.1A4.1,4.1,0,0,0,13.823.959h0a5.493,5.493,0,0,1-3.337,1.318A5.225,5.225,0,0,1,6.809.959h0a4.166,4.166,0,0,0-5.448.069,4.366,4.366,0,0,0-.409,5.9h0L10.35,20.1,19.816,6.854A4.416,4.416,0,0,0,19.339,1.1Z" transform="translate(2702.004 283.205)"/>
                        </svg>
                    </div>

                    <p class="m-detail-bar__likes-count">{{ newsFeedPost.likes_count }}</p>
                </div>
                
            </div>

            <div class="o-media-detail__media-descrpt  m-detail-media-descrpt">
                <div class="m-detail-media-descrpt__avatar">
                    <img :src="storage + newsFeedPost.user_image.avatar" alt="this user avatar">
                </div>

                <p class="m-detail-media-descrpt__txt">{{ newsFeedPost.description }}</p>
            </div>

            <div class="o-media-detail__comments  m-detail-comments" v-if="newsFeedPost.comments_count > 1">
                <div class="m-detail-comments__comment-block" v-for="(comment, index) in newsFeedPost.comments" v-if="index < 1" :key="comment.id">
                    <div class="m-detail-comments__avatar">
                        <img :src="storage + comment.user_image.avatar" alt="user avatar that made this comment">
                    </div>

                    <p class="m-detail-comments__txt">{{ comment.body }}</p>
                </div>

                <!-- need route path once made -->
                <router-link :to="{ name: 'comments' }" tag="span" class="m-detail-comments__view-all" @click.native="viewAllComments">view all comments</router-link>
            </div>

            <div class="o-media-detail__comments  m-detail-comments" v-else>
                <div class="m-detail-comments__comment-block" v-for="comment in newsFeedPost.comments" :key="comment.id">
                    <div class="m-detail-comments__avatar">
                        <img :src="storage + comment.user_image.avatar" alt="user avatar that made this comment">
                    </div>

                    <p class="m-detail-comments__txt">{{ comment.body }}</p>
                </div>
            </div>

        </div>

    </div>

</template>

<script>
    import { mixinStorage, basicVars } from '../mixins'

    export default {
		mixins: [ mixinStorage, basicVars ],
        computed: {
            newsFeedPostsAll() {
				return this.$store.getters['nfPosts/newsFeedPostsAll'];
			},
			newsFeedPost() {
				return this.$store.getters['nfPosts/newsFeedPost'];
            }
        },
        methods: {
			viewAllComments() {
				const post = this.newsFeedPost;
				this.$store.dispatch('nfPosts/changeNewsFeedPost', post);
				this.$store.dispatch('nfPosts/changePostDetail');
				if (this.windowWidth > this.breakpoint) {
					const vm = this;
					setTimeout(function(){
						vm.$store.dispatch('nfPosts/changeAllComments');
					}, 800);
				} else this.$store.dispatch('nfPosts/changeAllComments');
				this.$store.dispatch('nfPosts/changeAllCommentsPostDetail');
			},
            outPostDetail() {
                this.$store.dispatch('nfPosts/changePostDetail');
                this.$store.dispatch('nfPosts/changeInfScrollDisable');
                if (this.windowWidth > this.breakpoint) {
					$('.o-homepage').removeClass('u-overflow-disabled');
				}
			},
			arrowClick(arrow) {
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
                top: 50%;
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
                    stroke: $white;
                    stroke-width: 0.2rem;
                    fill: transparent;
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
			margin-top: 0.3rem;
			margin-left: 1rem;

			@include breakpoint(desktop) {
                width: 83%;
                color: $white;
				margin-left: 0.7rem;
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
                color: $white;
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
                color: $white;
				margin-left: 0.5rem;
			}
		}
	}
</style>
