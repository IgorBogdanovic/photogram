<template>
    <div class="o-user">

        <div class="o-user__content" v-infinite-scroll="axiosGetPosts" infinite-scroll-disabled="infScrollDisable" :infinite-scroll-distance="windowHeight/3">

            <div v-if="(!postDetailView && !allCommentsView && !upload) || windowWidth > breakpoint" class="o-user__info  m-info">
                <div class="m-info__avatar">
                    <span v-if="windowWidth > breakpoint">{{ user.username }}</span>
                    <img :src="storage + user.image.profile" alt="user avatar">
                </div>

                <div class="m-info__list">
                    <ul>
                        <li><span>{{ user.posts_count }}</span> posts</li>
                        <li><span>{{ user.followers_count }}</span> followers</li>
                        <li><span>{{ user.following_count }}</span> following</li>
                    </ul>
                </div>

                <p class="m-info__about-me">{{ user.about }}</p>

                <router-link v-if="isLoggedUser" :to="{ name: 'edit-profile' }" tag="button" class="m-info__button  m-info__button--edit">Edit Profile</router-link>
                <button v-if="!isLoggedUser && userAuth_follow" class="m-info__button  m-info__button--unfollow" @click="unfollowUser">Unfollow</button>
                <button v-if="!isLoggedUser && !userAuth_follow" class="m-info__button  m-info__button--follow" @click="followUser">Follow</button>
            </div>

            <div v-if="(!postDetailView && !allCommentsView && !upload) || windowWidth > breakpoint" class="o-user__view  m-view">
                <div class="m-view__icon  m-view__icon--single" :class="{ 'is-active': singleViewActive }" @click.stop="activateSingleView">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="3119 923 17 17">
                        <path id="Path_101" data-name="Path 101" class="cls-1" d="M0,0H17V17H0Z" transform="translate(3119 923)"/>
                    </svg>
                </div>

                <div class="m-view__icon  m-view__icon--grid" :class="{ 'is-active': gridViewActive }" @click.stop="activateGridView">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="3142 111 17 17.111">
                        <g id="Group_305" data-name="Group 305" transform="translate(3094 -156)">
                            <path id="Path_102" data-name="Path 102" class="cls-1" d="M.5.5h16v16H.5Z" transform="translate(48 267)"/>
                            <path id="Path_103" data-name="Path 103" class="cls-1" d="M0,0V16" transform="translate(56.5 267.5)"/>
                            <line id="Line_145" data-name="Line 145" class="cls-1" x2="16" transform="translate(48.5 275.5)"/>
                        </g>
                    </svg>
                </div>
            </div>

            <div v-if="(!postDetailView && !allCommentsView && !upload) || windowWidth > breakpoint"
                class="o-user__posts-wrapper  u-clearfix" :class="{ 'grid-view': gridViewActive, 'single-view': singleViewActive }">
                <app-news-feed-post v-for="(post, index) in userPostsAll" :key="post.id + '-' + index" :post="post"></app-news-feed-post>
            </div>

            <!-- for mobile devices -->
			<router-view v-if="postDetailView && windowWidth < breakpoint"></router-view>
			<router-view v-if="allCommentsView && windowWidth < breakpoint"></router-view>
            <router-view v-if="likesView && windowWidth < breakpoint"></router-view>
            <router-view v-if="upload && windowWidth < breakpoint"></router-view>
			<!-- for all other devices -->
			<transition mode="out-in"
				enter-active-class="animated slideInLeft"
				leave-active-class="animated slideOutRight">
				<router-view v-if="postDetailView && windowWidth > breakpoint"></router-view>
			</transition>
			<transition mode="out-in"
				enter-active-class="animated slideInLeft"
				leave-active-class="animated slideOutRight">
				<router-view v-if="allCommentsView && windowWidth > breakpoint"></router-view>
			</transition>
            <transition mode="out-in"
				enter-active-class="animated slideInLeft"
				leave-active-class="animated slideOutRight">
				<router-view v-if="likesView && windowWidth > breakpoint"></router-view>
			</transition>
            <transition mode="out-in"
				enter-active-class="animated slideInLeft"
				leave-active-class="animated slideOutRight">
				<router-view v-if="upload && windowWidth > breakpoint"></router-view>
			</transition>

            <app-spinner v-if="loading"></app-spinner>

        </div>

    </div>
</template>

<script>
    import { mixinStorage, basicVars } from '../mixins'
    import { users, posts } from '../axios-urls'
    import NewsFeedPost from './NewsFeedPost.vue'
	import Spinner from './Spinner.vue'

    export default {
        props: ['userId'],
        mixins: [ mixinStorage, basicVars ],
        data () {
		    return {
                userPostsAll: [],
                userAuth_follow: null,
                postDetailView: false,
                allCommentsView: false,
                likesView: false,
                upload: false,
				loading: false,
				infScrollDisable: false,
				postAmount: 12,
				postPage: 1,
                gridViewActive: false,
                singleViewActive: true
		    }
		},
        computed: {
			token() {
				return this.$store.getters['login/token'];
            },
			newsFeedPostsAll() {
				return this.$store.getters['nfPosts/newsFeedPostsAll'];
            },
            loggedUserId() {
				return this.$store.getters['login/idUser'];
            },
            user() {
				return this.$store.getters['nfPosts/user'];
            },
            isLoggedUser() {
                return this.loggedUserId == this.userId;
            }
        },
        watch: {
            '$route.name': function() {
				switch (this.$route.name) {
                    case 'photo-detail':
                        if (this.windowWidth > this.breakpoint) {
							$('body').addClass('u-overflow-disabled');
						}
						if (!this.infScrollDisable) {
							this.infScrollDisable = !this.infScrollDisable;
						}
						if (this.allCommentsView) {
							this.allCommentsView = !this.allCommentsView;
                        }
                        if (this.likesView) {
							this.likesView = !this.likesView;
                        }
                        if (this.upload) {
							this.upload = !this.upload;
						}
                        this.postDetailView = !this.postDetailView;
                        if (this.windowWidth > this.breakpoint) {
                            this.$store.dispatch('headings/actSetHeading', 'photogram');
                        } else this.$store.dispatch('headings/actSetHeading', 'Photo');
						break;
                    case 'comments-view':
                        if (this.windowWidth > this.breakpoint) {
							$('body').addClass('u-overflow-disabled');
						}
						if (!this.infScrollDisable) {
							this.infScrollDisable = !this.infScrollDisable;
						}
						if (this.postDetailView) {
							this.postDetailView = !this.postDetailView;
                        }
                        if (this.likesView) {
							this.likesView = !this.likesView;
                        }
                        if (this.upload) {
							this.upload = !this.upload;
						}
                        this.allCommentsView = !this.allCommentsView;
                        if (this.windowWidth > this.breakpoint) {
                            this.$store.dispatch('headings/actSetHeading', 'photogram');
                        } else this.$store.dispatch('headings/actSetHeading', 'Comments');
                        break;
                    case 'likes-view':
                        if (this.windowWidth > this.breakpoint) {
							$('body').addClass('u-overflow-disabled');
						}
						if (!this.infScrollDisable) {
							this.infScrollDisable = !this.infScrollDisable;
						}
						if (this.postDetailView) {
							this.postDetailView = !this.postDetailView;
                        }
                        if (this.allCommentsView) {
							this.allCommentsView = !this.allCommentsView;
                        }
                        if (this.upload) {
							this.upload = !this.upload;
						}
                        this.likesView = !this.likesView;
                        if (this.windowWidth > this.breakpoint) {
                            this.$store.dispatch('headings/actSetHeading', 'photogram');
                        } else this.$store.dispatch('headings/actSetHeading', 'Likes');
                        break;
                    case 'upload':
                        if (this.windowWidth > this.breakpoint) {
							$('body').addClass('u-overflow-disabled');
						}
						if (!this.infScrollDisable) {
							this.infScrollDisable = !this.infScrollDisable;
						}
						if (this.postDetailView) {
							this.postDetailView = !this.postDetailView;
                        }
                        if (this.allCommentsView) {
							this.allCommentsView = !this.allCommentsView;
                        }
                        if (this.likesView) {
							this.likesView = !this.likesView;
                        }
						this.upload = !this.upload;
						if (this.windowWidth > this.breakpoint) {
                            this.$store.dispatch('headings/actSetHeading', 'photogram');
                        } else this.$store.dispatch('headings/actSetHeading', 'Upload');
						break;
                    case 'user':
                        if (this.windowWidth > this.breakpoint) {
                            $('body').removeClass('u-overflow-disabled');
                        }
                        // this check is in case user posted new post so it can refresh all posts
                        if (this.newsFeedPostsAll.length !== this.userPostsAll.length) {
                            this.userPostsAll.length = 0;
                            this.postPage = 1;
                        }
						if (this.infScrollDisable) {
							this.infScrollDisable = !this.infScrollDisable;
						}
						if (this.postDetailView) {
							this.postDetailView = !this.postDetailView;
						} else if (this.allCommentsView) {
							this.allCommentsView = !this.allCommentsView;
                        } else if (this.likesView) {
							this.likesView = !this.likesView;
                        } else if (this.upload) {
							this.upload = !this.upload;
                        }
                        if (this.windowWidth > this.breakpoint) {
                            this.$store.dispatch('headings/actSetHeading', 'photogram');
                        } else this.$store.dispatch('headings/actSetHeading', this.user.username);
				}
            },
            '$route.params.userId': function(userId) {
                if (this.user.id != userId) {
                    switch (this.$route.name) {
                        case 'user':
                            this.userPostsAll.length = 0;
                            this.postPage = 1;
                            users.get('find?id=' + userId, { headers: { Authorization: 'Bearer ' + this.token } })
                            .then(res => {
                                const user = res.data.data;
                                this.$store.dispatch('nfPosts/changeUser', user);
                                
                                if (this.windowWidth > this.breakpoint) {
                                    this.$store.dispatch('headings/actSetHeading', 'photogram');
                                } else this.$store.dispatch('headings/actSetHeading', user.username);

                                // needed to put this cause for some reason inf-scroll do not work if you are coming from same route (diff. user)
                                // i guess it's plugin bug
                                if (!this.userPostsAll.length) {
                                    this.axiosGetPosts();
                                }
                            })
                            .catch(error => {
                                console.log(error);
                            });
                    }
                }
            }
        },
        methods: {
			axiosGetPosts() {
                this.loading = true;
				this.infScrollDisable = true;
				posts.get('', { headers: { Authorization: 'Bearer ' + this.token }, params: { amount: this.postAmount, page: this.postPage, user_id: this.userId } })
				.then(res => {
					if (res.data.data.length > 0) {
						for (let i = 0; i < res.data.data.length; i++) {
							this.userPostsAll.push(res.data.data[i]);
						}
						// console.log(this.postDetail, this.allComments, this.upload);
						this.postPage++;
                        this.$store.dispatch('nfPosts/pushNewsFeedPostsAll', this.userPostsAll);
                        this.infScrollDisable = false;
						this.loading = false;
                    } else {
                        this.loading = false;
                        console.log('empty array'); // should make some msg displays
                    }
				});
			},
            activateSingleView(e) {
                let thisViewIcon = $(e.currentTarget);
                this.singleViewActive = true;
                this.gridViewActive = false;
            },
            activateGridView(e) {
                let thisViewIcon = $(e.currentTarget);
                this.gridViewActive = true;
                this.singleViewActive = false;
            },
            followUser() {
                this.$store.dispatch('nfPosts/followUser', this.userId)
                    .then(res => {
                        // console.log(res);
                        this.userAuth_follow = true;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            unfollowUser() {
                this.$store.dispatch('nfPosts/unfollowUser', this.userId)
                    .then(res => {
                        // console.log(res);
                        this.userAuth_follow = false;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
		},
        components: {
			appNewsFeedPost: NewsFeedPost,
			appSpinner: Spinner
        },
        beforeCreate() {
            this.$store.dispatch('nfPosts/pushNewsFeedPostsAll', []);
        },
        created() {
            // watch only works when in route and then to watch for changes
            // that's why this check is needed in created (because of possible direct access to upload from link in footer)
            switch (this.$route.name) {
                case 'upload':
                    if (this.windowWidth > this.breakpoint) {
                        $('body').addClass('u-overflow-disabled');
                    }
                    if (!this.infScrollDisable) {
                        this.infScrollDisable = !this.infScrollDisable;
                    }
                    if (this.postDetailView) {
                        this.postDetailView = !this.postDetailView;
                    }
                    if (this.allCommentsView) {
                        this.allCommentsView = !this.allCommentsView;
                    }
                    if (this.likesView) {
                        this.likesView = !this.likesView;
                    }
                    this.upload = !this.upload;
                    if (this.windowWidth > this.breakpoint) {
                        this.$store.dispatch('headings/actSetHeading', 'photogram');
                    } else this.$store.dispatch('headings/actSetHeading', 'Upload');
                    break;
                case 'user':
                    this.userAuth_follow = this.user.auth_follow;
                    if (this.windowWidth > this.breakpoint) {
                        $('body').removeClass('u-overflow-disabled');
                    }
                    if (this.infScrollDisable) {
                        this.infScrollDisable = !this.infScrollDisable;
                    }
                    if (this.postDetailView) {
                        this.postDetailView = !this.postDetailView;
                    } else if (this.allCommentsView) {
                        this.allCommentsView = !this.allCommentsView;
                    } else if (this.likesView) {
                        this.likesView = !this.likesView;
                    } else if (this.upload) {
                        this.upload = !this.upload;
                    }
                    if (this.windowWidth > this.breakpoint) {
                        this.$store.dispatch('headings/actSetHeading', 'photogram');
                    } else this.$store.dispatch('headings/actSetHeading', this.user.username);
            }
        },
        destroyed() {
            this.$store.dispatch('nfPosts/pushNewsFeedPostsAll', []);
		}
	}
</script>

<style lang="scss" scoped>
    @import '../scss/settings';
    
    .o-user {
        width: 100%;
        height: 100vh;
        background-color: $white;

        &__content {
            overflow: hidden;
            padding-top: 4.76rem;
            padding-bottom: 4.2rem;

            @include breakpoint(desktop) {
				width: 148rem;
				margin: 0 auto;
				padding-top: 8.7rem;
			}
        }

        &__posts-wrapper {
            &.grid-view {
                display: -webkit-box;
				display: -moz-box;
				display: -ms-flexbox;
				display: -webkit-flex;
				display: flex;
                flex-wrap: wrap;
                
                @include breakpoint(desktop) {
                    margin-top: 5.8rem;
                }
            }

            @include breakpoint(desktop) {
				&.single-view {
                    width: 21.7%;
                    margin: 5.8rem auto 0 auto;

                    .o-news-feed-post {
                        width: 100%;
                    }
                }
			}
        }
    }

    .m-info {
        font-family: 'Roboto', sans-serif;
        @include fontSizeRem(14, 20);
        @include lineHeightRem(17, 24);
        border-bottom: 1px solid rgba($darkgrey, .5);

        @include breakpoint(desktop) {
            width: 40%;
            margin: auto;
            border-bottom: none;
        }

        &__avatar {
            float: left;
            width: 8.7rem;
            height: 8.7rem;
            margin-top: 2.1rem;
            margin-left: 4.8rem;

            @include breakpoint(desktop) {
                width: 13.5rem;
                height: 13.5rem;
                margin-top: 1.8rem;
                margin-left: 14rem;
                text-align: center;
            }

            span {
                display: block;
                margin-bottom: 1rem;
            }

            img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }
        }

        &__list {
            display: inline-block;
            margin-top: 2.9rem;
            margin-left: 3.4rem;

            @include breakpoint(desktop) {
                margin-top: 7.7rem;
            }

            li {
                margin-bottom: 1.3rem;

                span {
                    color: $lightgreen;
                    margin-right: .4rem;
                }
            }
        }

        &__about-me {
            width: 82%;
            margin: 1rem auto 0 auto;
            text-align: center;

            @include breakpoint(desktop) {
                width: 100%;
                margin: 4rem auto 0 auto;
                padding-right: 7rem;
                padding-left: 7rem;
            }
        }

        &__button {
            @include fontSizeRem(10, 20);
            @include lineHeightRem(12, 24);
            color: $white;
            display: block;
            padding: .5rem 2rem;
            margin: 2.2rem auto 2.1rem auto;
            border-radius: 30px;

            @include breakpoint(desktop) {
                margin-top: 4.3rem;
            }

            &--edit {
                background-color: $lightgray;
            }

            &--unfollow {
                background-color: $darkgrey;
            }

            &--follow {
                background-color: $lightblack;
            }
        }
    }

    .m-view {
        @include breakpoint(desktop) {
            text-align: center;
        }

        &__icon {
            display: inline-block;
            stroke: $lightblack;
            opacity: .5;
            cursor: pointer;
            width: 1.7rem;
            height: 1.7rem;
            margin-top: 1rem;
            margin-bottom: 1.1rem;

            @include breakpoint(desktop) {
                width: 2.4rem;
                height: 2.4rem;
            }

            &--single {
                margin-left: 1.7rem;

                @include breakpoint(desktop) {
                    margin-left: 0;
                }

                .cls-1 {
                    fill: $lightblack;
                }
            }

            &--grid {
                margin-left: .3rem;

                .cls-1 {
                    fill: transparent;
                }
            }

            &.is-active {
                opacity: 1;
            }
        }
    }
</style>
