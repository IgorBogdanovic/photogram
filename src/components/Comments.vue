<template>
    <div class="o-all-comments">
        <div class="o-all-comments__wrapper--main">
            <a href="javascript:history.go(-1)" class="o-all-comments__close  u-only-desktop" @click="closeAllComments">
                <icon class="icon" name="close"></icon>
            </a>

            <div class="o-all-comments__wrapper--sub" v-infinite-scroll="axiosGetComments" infinite-scroll-disabled="infScrollDisable" :infinite-scroll-distance="windowHeight/3">
                <app-comment v-for="(postComment, index) in postCommentsAll" :key="postComment.id + '-' + index" :postComment="postComment"
                    @commentEdited="refreshComments" class="o-all-comments__comment"></app-comment>
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
        props: ['postId'],
        mixins: [ basicVars ],
        data () {
		    return {
                comments: [],
                loading: false,
                infScrollDisable: false,
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
            postCommentsAll() {
				return this.$store.getters['nfPosts/postCommentsAll'];
			}
        },
        methods: {
			axiosGetComments() {
                this.loading = true;
                this.infScrollDisable = true;
				comments.get('', { headers: { Authorization: 'Bearer ' + this.token }, params: { post_id: this.postId, amount: this.commentAmount, page: this.commentPage } })
				.then(res => {
					if (res.data.data.length > 0) {
						for (let i = 0; i < res.data.data.length; i++) {
                            this.comments.push(res.data.data[i]);
                        }
                        this.commentPage++;
                        this.$store.dispatch('nfPosts/pushPostCommentsAll', this.comments);
                        this.loading = false;
                        this.infScrollDisable = false;
                    } else {
                        this.loading = false;
                        this.infScrollDisable = true;
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
                posts.get('' + this.postId, { headers: { Authorization: 'Bearer ' + this.token } })
                .then(res => {
                    const post = res.data.data;
                    const postId = post.id;
                    const allPosts = this.newsFeedPostsAll;
                    const postIndex = allPosts.map(function(el) { return el.id; }).indexOf(postId);
                    const postObj = {
                        index: postIndex,
                        value: post
                    };
                    this.$store.dispatch('nfPosts/updateNewsFeedPostsAll', postObj);
                    this.$store.dispatch('nfPosts/changeNewsFeedPost', postObj.value);
                })
                .catch(error => {
                    console.log(error);
                });
            },
            closeAllComments() {
                const vm = this;
                setTimeout(function(){
                    vm.$store.dispatch('nfPosts/pushPostCommentsAll', []);
                }, 300);
			}
        },
        components: {
            appComment: Comment,
            appMakeComment: MakeComment,
            appSpinner: Spinner
        },
        beforeCreate() {
            this.$store.dispatch('nfPosts/pushPostCommentsAll', []);
        },
		created() {
            // console.log(this.newsFeedPost.id);
            if (this.windowWidth > this.breakpoint) {
                this.$store.dispatch('headings/actSetHeading', 'photogram');
            } else this.$store.dispatch('headings/actSetHeading', 'Comments');
        },
        destroyed() {
            // clear MakeComment component input field
            $('.m-make-comment__input').val('');
            this.$store.dispatch('nfPosts/pushPostCommentsAll', []);
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
                    height: 74vh;
                    top: 55%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
            }

            &--sub {
                padding-bottom: 6rem;

                @include breakpoint(desktop) {
                    position: absolute;
                    width: 57rem;
                    height: 74vh;
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
