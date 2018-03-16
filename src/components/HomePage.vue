<template>
	<div class="o-homepage  u-clearfix">
		
		<div class="o-homepage__content" v-infinite-scroll="axiosGetPosts" infinite-scroll-disabled="infScrollDisable" :infinite-scroll-distance="windowHeight/3">

			<div v-if="(!postDetailView && !allCommentsView) || windowWidth > breakpoint" class="o-homepage__posts-wrapper">
				<app-news-feed-post v-for="(post, index) in newsFeedPostsAll" :key="post.id + '-' + index" :post="post"></app-news-feed-post>
			</div>
			
			<!-- for mobile devices -->
			<router-view v-if="postDetailView && windowWidth < breakpoint"></router-view>
			<router-view v-if="allCommentsView && windowWidth < breakpoint"></router-view>
			<!-- for all other devices -->
			<transition mode="out-in"
				enter-active-class="animated slideInDown"
				leave-active-class="animated slideOutUp">
				<router-view v-if="postDetailView && windowWidth > breakpoint"></router-view>
			</transition>
			<transition mode="out-in"
				enter-active-class="animated slideInDown"
				leave-active-class="animated slideOutUp">
				<router-view v-if="allCommentsView && windowWidth > breakpoint"></router-view>
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

	export default {
		mixins: [ basicVars ],
	  	data () {
		    return {
				followedUsersPosts: [],
				postDetailView: false,
				allCommentsView: false,
				loading: false,
				infScrollDisable: false,
				postAmount: 12,
				postPage: 1
		    }
		},
		computed: {
            token() {
				return this.$store.getters['login/token'];
			},
			// postDetail() {
			// 	return this.$store.getters['nfPosts/postDetail'];
			// },
			// allComments() {
			// 	return this.$store.getters['nfPosts/allComments'];
			// },
			// infScrollDisable() {
			// 	return this.$store.getters['nfPosts/infScrollDisable'];
			// },
			newsFeedPostsAll() {
				return this.$store.getters['nfPosts/newsFeedPostsAll'];
			}
		},
		watch: {
            '$route.name': function() {
				switch (this.$route.name) {
					case 'photo':
						if (!this.infScrollDisable) {
							this.infScrollDisable = !this.infScrollDisable;
						}
						if (this.allCommentsView) {
							this.allCommentsView = !this.allCommentsView;
						}
						this.postDetailView = !this.postDetailView;
						this.$store.dispatch('headings/actSetHeading', 'Photo');
						break;
					case 'comments':
						if (!this.infScrollDisable) {
							this.infScrollDisable = !this.infScrollDisable;
						}
						if (this.postDetailView) {
							this.postDetailView = !this.postDetailView;
						}
						this.allCommentsView = !this.allCommentsView;
						this.$store.dispatch('headings/actSetHeading', 'Comments');
						break;
					case 'homepage':
						if (this.infScrollDisable) {
							this.infScrollDisable = !this.infScrollDisable;
						}
						if (this.postDetailView) {
							this.postDetailView = !this.postDetailView;
						} else if (this.allCommentsView) {
							this.allCommentsView = !this.allCommentsView;
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
						console.log(this.followedUsersPosts);
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
			// better safe then sorry :) => empty NewsFeedPostsAll array
            this.$store.dispatch('nfPosts/pushNewsFeedPostsAll', []);
        },
		created() {
			this.$store.dispatch('headings/actSetHeading', 'photogram');
		},
		destroyed() {
			// console.log(0);
			// this.$store.dispatch('nfPosts/pushNewsFeedPostsAll', []);
			// if (this.infScrollDisable) {
			// 	this.$store.dispatch('nfPosts/changeInfScrollDisable');
			// }
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
