<template>
    <div class="o-user">

        <app-header></app-header>

        <div class="o-user__content" v-infinite-scroll="axiosGetPosts" infinite-scroll-disabled="infScrollDisable" :infinite-scroll-distance="windowHeight/3">

            <div v-if="(!postDetail && !allComments) || windowWidth > breakpoint" class="o-user__info  m-info">
                <div class="m-info__avatar">
                    <img :src="storage + profileImg" alt="user avatar">
                </div>

                <div class="m-info__list">
                    <ul>
                        <li><span>{{ postsNo }}</span> posts</li>
                        <li><span>{{ followersNo }}</span> followers</li>
                        <li><span>{{ followingNo }}</span> following</li>
                    </ul>
                </div>

                <p class="m-info__about-me">{{ about }}</p>

                <router-link v-if="isLoggedUser" to="/" tag="button" class="m-info__button  m-info__button--edit">Edit Profile</router-link>
                <button v-if="user.auth_follow" class="m-info__button  m-info__button--following">Following</button>
            </div>

            <div v-if="(!postDetail && !allComments) || windowWidth > breakpoint" class="o-user__view  m-view">
                <div class="m-view__icon  m-view__icon--single is-active" @click.stop="activateSingleView">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="3119 923 17 17">
                        <path id="Path_101" data-name="Path 101" class="cls-1" d="M0,0H17V17H0Z" transform="translate(3119 923)"/>
                    </svg>
                </div>

                <div class="m-view__icon  m-view__icon--grid" @click.stop="activateGridView">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="3142 111 17 17.111">
                        <g id="Group_305" data-name="Group 305" transform="translate(3094 -156)">
                            <path id="Path_102" data-name="Path 102" class="cls-1" d="M.5.5h16v16H.5Z" transform="translate(48 267)"/>
                            <path id="Path_103" data-name="Path 103" class="cls-1" d="M0,0V16" transform="translate(56.5 267.5)"/>
                            <line id="Line_145" data-name="Line 145" class="cls-1" x2="16" transform="translate(48.5 275.5)"/>
                        </g>
                    </svg>
                </div>
            </div>

            <div v-if="(!postDetail && !allComments) || windowWidth > breakpoint" class="o-user__posts-wrapper" :class="{ 'grid-view': gridViewActive, 'single-view': singleViewActive }">
                <app-news-feed-post v-for="(post, index) in userPostsAll" :key="post.id + '-' + index" :post="post"></app-news-feed-post>
            </div>

            <!-- for mobile devices -->
			<router-view v-if="postDetail && windowWidth < breakpoint"></router-view>
			<router-view v-if="allComments && windowWidth < breakpoint"></router-view>
			<!-- for all other devices -->
			<transition mode="out-in"
				enter-active-class="animated slideInDown"
				leave-active-class="animated slideOutUp">
				<router-view v-if="postDetail && windowWidth > breakpoint"></router-view>
			</transition>
			<transition mode="out-in"
				enter-active-class="animated slideInDown"
				leave-active-class="animated slideOutUp">
				<router-view v-if="allComments && windowWidth > breakpoint"></router-view>
			</transition>

            <app-spinner v-if="loading"></app-spinner>

        </div>

        <app-footer></app-footer>

    </div>
</template>

<script>
    import { mixinStorage, basicVars } from '../mixins'
    import { posts } from '../axios-urls'
    import Header from './Header.vue'
    import Footer from './Footer.vue'
    import NewsFeedPost from './NewsFeedPost.vue'
	import Spinner from './Spinner.vue'

    export default {
        props: ['userId'],
        mixins: [ mixinStorage, basicVars ],
        data () {
		    return {
                isLoggedUser: false,
                userPostsAll: [],
                loading: false,
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
            postDetail() {
				return this.$store.getters['nfPosts/postDetail'];
			},
			allComments() {
				return this.$store.getters['nfPosts/allComments'];
			},
			infScrollDisable() {
				return this.$store.getters['nfPosts/infScrollDisable'];
			},
			newsFeedPostsAll() {
				return this.$store.getters['nfPosts/newsFeedPostsAll'];
			},
            user() {
				return this.$store.getters['nfPosts/user'];
			},
            loggedUserId() {
				return this.$store.getters['login/idUser'];
            },
			username() {
                if (this.isLoggedUser) {
                    return this.$store.getters['login/username'];
                } else return this.user.username;
            },
            profileImg() {
                if (this.isLoggedUser) {
                    return this.$store.getters['login/userProfile'];
                } else return this.user.image.profile;
            },
            about() {
                if (this.isLoggedUser) {
                    return this.$store.getters['login/userAbout'];
                } else return this.user.about;
            },
            postsNo() {
                if (this.isLoggedUser) {
                    return this.$store.getters['login/userPostsNo'];
                } else return this.user.posts_count;
            },
            followersNo() {
                if (this.isLoggedUser) {
                    return this.$store.getters['login/userFollowersNo'];
                } else return this.user.followers_count;
            },
            followingNo() {
                if (this.isLoggedUser) {
                    return this.$store.getters['login/userFollowingNo'];
                } else return this.user.following_count;
            }
        },
        methods: {
			axiosGetPosts() {
                this.loading = true;

				this.$store.dispatch('nfPosts/changeInfScrollDisable');
				posts.get('', { headers: { Authorization: 'Bearer ' + this.token }, params: { amount: this.postAmount, page: this.postPage, user_id: this.userId } })
				.then(res => {
					if (res.data.data.length > 0) {
						for (let i = 0; i < res.data.data.length; i++) {
							this.userPostsAll.push(res.data.data[i]);
						}
						// console.log(this.userPostsAll);
						this.postPage++;
                        this.$store.dispatch('nfPosts/pushNewsFeedPostsAll', this.userPostsAll);
                        this.$store.dispatch('nfPosts/changeInfScrollDisable');
						this.loading = false;
                    } else {
                        this.loading = false;
                        console.log('empty array'); // should make some msg displays
                    }
				});
			},
            activateSingleView(e) {
                let thisViewIcon = $(e.currentTarget);
                thisViewIcon.addClass('is-active').next().removeClass('is-active');
                this.singleViewActive = true;
                this.gridViewActive = false;
            },
            activateGridView(e) {
                let thisViewIcon = $(e.currentTarget);
                thisViewIcon.addClass('is-active').prev().removeClass('is-active');
                this.gridViewActive = true;
                this.singleViewActive = false;
            }
		},
        components: {
			appHeader: Header,
            appFooter: Footer,
            appNewsFeedPost: NewsFeedPost,
			appSpinner: Spinner
        },
        created() {
            if (this.loggedUserId === this.userId) {
                this.isLoggedUser = true;
            } else this.isLoggedUser = false;

            if (this.windowWidth > this.breakpoint) {
                this.$store.dispatch('headings/actSetHeading', 'photogram');
            } else this.$store.dispatch('headings/actSetHeading', this.username);
            // console.log(this.user);
        },
        destroyed() {
            this.$store.dispatch('nfPosts/pushNewsFeedPostsAll', []);
            if (this.infScrollDisable) {
				this.$store.dispatch('nfPosts/changeInfScrollDisable');
			}
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
        }

        &__posts-wrapper {
            &.grid-view {
                display: -webkit-box;
				display: -moz-box;
				display: -ms-flexbox;
				display: -webkit-flex;
				display: flex;
				flex-wrap: wrap;
            }
        }
    }

    .m-info {
        font-family: 'Roboto', sans-serif;
        @include fontSizeRem(14, 20);
        @include lineHeightRem(17, 24);
        border-bottom: 1px solid rgba($darkgrey, .5);

        &__avatar {
            float: left;
            width: 8.7rem;
            height: 8.7rem;
            margin-top: 2.1rem;
            margin-left: 4.8rem;

            img {
                width: 100%;
                border-radius: 50%;
            }
        }

        &__list {
            display: inline-block;
            margin-top: 2.9rem;
            margin-left: 3.4rem;

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
        }

        &__button {
            @include fontSizeRem(10, 20);
            @include lineHeightRem(12, 24);
            color: $white;
            display: block;
            padding: .5rem 2rem;
            margin: 2.2rem auto 2.1rem auto;
            border-radius: 30px;

            &--edit {
                background-color: $lightgray;
            }

            &--following {
                background-color: $lightblack;
            }
        }
    }

    .m-view {

        &__icon {
            display: inline-block;
            stroke: $lightblack;
            opacity: .5;
            cursor: pointer;
            width: 1.7rem;
            height: 1.7rem;
            margin-top: 1rem;
            margin-bottom: 1.1rem;

            &--single {
                margin-left: 1.7rem;

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