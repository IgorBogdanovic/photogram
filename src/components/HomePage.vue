<template>
	<div class="o-homepage  u-clearfix">
		
		<app-header></app-header>

		<div class="o-homepage__content" v-infinite-scroll="axiosGetPosts" infinite-scroll-disabled="infScrollDisable" :infinite-scroll-distance="windowHeight/3">

			<div v-if="(!postDetail && !allComments) || windowWidth > breakpoint" class="o-homepage__posts-wrapper">
				<app-news-feed-post v-for="post in newsFeedPostsAll" :key="post.id" :followedUserPost="post"></app-news-feed-post>
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
	import { posts } from '../axios-urls'
	import { basicVars } from '../mixins'
	import Header from './Header.vue'
	import Footer from './Footer.vue'
	import NewsFeedPost from './NewsFeedPost.vue'
	import Spinner from './Spinner.vue'

	export default {
		mixins: [ basicVars ],
	  	data () {
		    return {
				followedUsersPosts: [],
				loading: false,
				postAmount: 8,
				postPage: 1
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
			}
		},
		methods: {
			axiosGetPosts() {
				this.loading = true;
				this.$store.dispatch('nfPosts/changeInfScrollDisable');
				posts.get('', { headers: { Authorization: 'Bearer ' + this.token }, params: { amount: this.postAmount, page: this.postPage, news_feed: 1 } })
				.then(res => {
					if (res.data.data.length > 0) {
						for (let i = 0; i < res.data.data.length; i++) {
							this.followedUsersPosts.push(res.data.data[i]);
						}
						// console.log(this.followedUsersPosts);
						this.postPage++;
						this.$store.dispatch('nfPosts/pushNewsFeedPostsAll', this.followedUsersPosts);
						this.$store.dispatch('nfPosts/changeInfScrollDisable');
						this.loading = false;
					} else console.log('empty array'); // should make some msg displays
				});
			}
		},
        components: {
			appHeader: Header,
			appFooter: Footer,
			appNewsFeedPost: NewsFeedPost,
			appSpinner: Spinner
		},
		// created() {
        //     console.log(this.newsFeedPost);
        // }
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
