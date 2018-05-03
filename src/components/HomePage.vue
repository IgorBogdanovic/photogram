<template>
	<div class="o-homepage  u-clearfix">
		
		<div class="o-homepage__content" v-infinite-scroll="axiosGetPosts" infinite-scroll-disabled="infScrollDisable" :infinite-scroll-distance="windowHeight/3">

			<div v-if="(!postDetailView && !allCommentsView && !likesView) || windowWidth > breakpoint" class="o-homepage__posts-wrapper">
				<app-news-feed-post v-for="(post, index) in newsFeedPostsAll" :key="post.id + '-' + index" :post="post"></app-news-feed-post>
			</div>
			
			<!-- for mobile devices -->
			<transition mode="out-in" enter-active-class="animated fadeIn">
				<router-view v-if="postDetailView && windowWidth < breakpoint"></router-view>
			</transition>
			<router-view v-if="allCommentsView && windowWidth < breakpoint"></router-view>
			<router-view v-if="likesView && windowWidth < breakpoint"></router-view>
			
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

			<app-spinner v-if="loading"></app-spinner>

		</div>

	</div>
</template>

<script>
	import { posts } from '../axios-urls'
	import { basicVars } from '../mixins'
	import NewsFeedPost from './NewsFeedPost.vue'
	import Spinner from './Spinner.vue'
	import { mapState } from 'vuex'

	export default {
		mixins: [ basicVars ],
	  	data () {
		    return {
				followedUsersPosts: [],
				postDetailView: false,
				allCommentsView: false,
				likesView: false,
				loading: false,
				infScrollDisable: false,
				postAmount: 8,
				postPage: 1
		    }
		},
		computed:
			mapState({
				token: state => state.login.idToken,
				newsFeedPostsAll: state => state.nfPosts.newsFeedPostsAll
			}),
            // token() {
			// 	return this.$store.getters['login/token'];
			// },
			// newsFeedPostsAll() {
			// 	return this.$store.getters['nfPosts/newsFeedPostsAll'];
			// }
		watch: {
            '$route.name': function() {
				switch (this.$route.name) {
					case 'photo':
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
						this.postDetailView = !this.postDetailView;
						this.$store.dispatch('headings/actSetHeading', 'Photo');
						break;
					case 'comments':
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
						this.allCommentsView = !this.allCommentsView;
						this.$store.dispatch('headings/actSetHeading', 'Comments');
						break;
					case 'likes':
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
						this.likesView = !this.likesView;
						this.$store.dispatch('headings/actSetHeading', 'Likes');
						break;
					case 'homepage':
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
						}
						this.$store.dispatch('headings/actSetHeading', 'photogram');
				}
            }
        },
		methods: {
			axiosGetPosts() {
				this.loading = true;
				this.infScrollDisable = true;
				posts.get('', { headers: { Authorization: 'Bearer ' + this.token }, params: { amount: this.postAmount, page: this.postPage, news_feed: 1 } })
				.then(res => {
					if (res.data.data.length > 0) {
						for (let i = 0; i < res.data.data.length; i++) {
							this.followedUsersPosts.push(res.data.data[i]);
						}
						// console.log(this.followedUsersPosts);
						this.postPage++;
						this.$store.dispatch('nfPosts/pushNewsFeedPostsAll', this.followedUsersPosts);
						this.infScrollDisable = false;
						this.loading = false;
					} else {
                        this.loading = false;
                        console.log('empty array'); // should make some msg displays
                    }
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
			switch (this.$route.name) {
				case 'photo':
					if (this.windowWidth > this.breakpoint) {
						$('body').addClass('u-overflow-disabled');
						// this get is used so posts can be loaded when child component is reloaded (so user can see them in background)
						this.axiosGetPosts();
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
					this.postDetailView = !this.postDetailView;
					this.$store.dispatch('headings/actSetHeading', 'Photo');
					break;
				case 'comments':
					if (this.windowWidth > this.breakpoint) {
						$('body').addClass('u-overflow-disabled');
						// this get is used so posts can be loaded when child component is reloaded (so user can see them in background)
						this.axiosGetPosts();
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
					this.allCommentsView = !this.allCommentsView;
					this.$store.dispatch('headings/actSetHeading', 'Comments');
					break;
				case 'likes':
					if (this.windowWidth > this.breakpoint) {
						$('body').addClass('u-overflow-disabled');
						// this get is used so posts can be loaded when child component is reloaded (so user can see them in background)
						this.axiosGetPosts();
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
					this.likesView = !this.likesView;
					this.$store.dispatch('headings/actSetHeading', 'Likes');
					break;
				case 'homepage':
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
					}
					this.$store.dispatch('headings/actSetHeading', 'photogram');
			}
		},
		destroyed() {
			this.$store.dispatch('nfPosts/pushNewsFeedPostsAll', []);
		}
	}
</script>

<style lang="scss" scoped>
	@import '../scss/settings';

	.o-homepage {
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
				padding-top: 13.7rem;
			}
		}

		&__posts-wrapper {
			@include breakpoint(desktop) {
				display: -webkit-box;
				display: -moz-box;
				display: -ms-flexbox;
				display: -webkit-flex;
				display: flex;
				flex-wrap: wrap;
			}
		}
	}
</style>
