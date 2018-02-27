<template>
    <div class="o-all-comments">
        <div class="o-all-comments__wrapper--main">
            <a href="javascript:history.go(-1)" class="o-all-comments__close  u-only-desktop" @click="closeAllComments">
                <icon class="icon" name="close"></icon>
            </a>

            <div class="o-all-comments__wrapper--sub" v-infinite-scroll="axiosGetComments" infinite-scroll-disabled="infScrollDisabled" :infinite-scroll-distance="windowHeight/3">
                <app-comment v-for="(comment, index) in postCommentsAll" :key="comment.id + '-' + index" :comment="comment" class="o-all-comments__comment"></app-comment>
                <app-spinner v-if="loading"></app-spinner>
            </div>

            <app-make-comment class="o-all-comments__make-comment" @commentSubmited="refreshComments"></app-make-comment>
        </div>
    </div>
</template>

<script>
    import { comments, posts } from '../axios-urls'
    import { basicVars } from '../mixins'
    import Comment from './Comment.vue'
    import MakeComment from './MakeComment.vue'
    import Spinner from './Spinner.vue'

    export default {
        mixins: [ basicVars ],
        data () {
		    return {
                comments: [],
                loading: false,
                infScrollDisabled: false,
                commentAmount: 12,
				commentPage: 1
		    }
        },
        computed: {
            token() {
				return this.$store.getters['login/token'];
            },
            newsFeedPostsAll() {
				return this.$store.getters['nfPosts/newsFeedPostsAll'];
			},
            newsFeedPost() {
				return this.$store.getters['nfPosts/newsFeedPost'];
            },
            postCommentsAll() {
				return this.$store.getters['nfPosts/postCommentsAll'];
			},
            allCommentsPostDetail() {
				return this.$store.getters['nfPosts/allCommentsPostDetail'];
            }
        },
        methods: {
			axiosGetComments() {
                this.loading = true;
                this.infScrollDisabled = true;
				comments.get('', { headers: { Authorization: 'Bearer ' + this.token }, params: { post_id: this.newsFeedPost.id, amount: this.commentAmount, page: this.commentPage } })
				.then(res => {
					if (res.data.data.length > 0) {
						for (let i = 0; i < res.data.data.length; i++) {
                            this.comments.push(res.data.data[i]);
                        }
                        // console.log(this.comments);
                        this.commentPage++;
                        this.$store.dispatch('nfPosts/pushPostCommentsAll', this.comments);
                        this.loading = false;
                        this.infScrollDisabled = false;
                    } else {
                        this.loading = false;
                        this.infScrollDisabled = true;
                        console.log('empty array'); // should make some msg displays
                    }
                });
            },
            refreshComments() {
                this.comments.length = 0;
                this.commentPage = 1;
                this.loading = true;
                const vm = this;
                setTimeout(function(){
                    vm.axiosGetComments();
                }, 300);
                // update post in NewsFeedPostsAll array
                posts.get('', { headers: { Authorization: 'Bearer ' + this.token }, params: { amount: 1, page: 1, news_feed: 1 } })
                .then(res => {
                    const post = res.data.data[0];
                    const postId = post.id;
                    const allPosts = this.newsFeedPostsAll;
                    const postIndex = allPosts.map(function(el) { return el.id; }).indexOf(postId);
                    const postObj = {
                        index: postIndex,
                        post: post
                    };
                    this.$store.dispatch('nfPosts/updateNewsFeedPostsAll', postObj);
                })
                .catch(error => {
                    console.log(error);
                });
            },
            closeAllComments() {
                this.$store.dispatch('nfPosts/changeAllComments');
                if (this.allCommentsPostDetail) {
                    if (this.windowWidth > this.breakpoint) {
                        const vm = this;
                        setTimeout(function(){
                            vm.$store.dispatch('nfPosts/changePostDetail');
                        }, 800);
                    } else this.$store.dispatch('nfPosts/changePostDetail');
                    this.$store.dispatch('nfPosts/changeAllCommentsPostDetail');
                } else {
                    if (this.windowWidth > this.breakpoint) {
                        this.$store.dispatch('nfPosts/changeInfScrollDisable');
                        $('.o-homepage').removeClass('u-overflow-disabled');
                    }
                }
			}
        },
        components: {
            appComment: Comment,
            appMakeComment: MakeComment,
            appSpinner: Spinner
		},
		created() {
            if (this.windowWidth > this.breakpoint) {
                this.$store.dispatch('headings/actSetHeading', 'photogram');
            } else this.$store.dispatch('headings/actSetHeading', 'Comments');
            // posts.get('{ 501 }', { headers: { Authorization: 'Bearer ' + this.token } })
            // .then(res => {
            //     console.log(res);
            // })
            // .catch(error => {
            //     console.log(error);
            // });

            // posts.get('', { headers: { Authorization: 'Bearer ' + this.token }, params: { amount: 1, page: 1, news_feed: 1 } })
            // .then(res => {
            //     const post = res.data.data[0];
            //     const postId = post.id;
            //     const allPosts = this.newsFeedPostsAll;
            //     const postIndex = allPosts.map(function(el) { return el.id; }).indexOf(postId);
            //     const postObj = {
            //         index: postIndex,
            //         post: post
            //     };
            //     // console.log(postObj);
            //     this.$store.dispatch('nfPosts/updateNewsFeedPostsAll', postObj);
            // })
            // .catch(error => {
            //     console.log(error);
            // });
        }
	}
</script>

<style lang="scss" scoped>
	@import '../scss/settings';

    .o-all-comments {
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
            &--main {
                background-color: $white;

                @include breakpoint(desktop) {
                    position: absolute;
                    width: 57rem;
                    height: 80rem;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
            }

            &--sub {
                padding-bottom: 6rem;

                @include breakpoint(desktop) {
                    position: absolute;
                    width: 57rem;
                    height: 80rem;
                    padding-bottom: 8rem;
                    overflow-y: auto;
                }
            }
        }

        &__close {
            position: absolute;
            width: 4rem;
            height: 4rem;
            color: $white;
            top: -5%;
            right: -7%;
            cursor: pointer;

            svg {
                width: 100%;
                height: 100%;
            }
        }
    }
</style>
