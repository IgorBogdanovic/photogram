<template>
    <div class="o-edit-post">
        <div class="o-edit-post__wrapper--main">

            <a href="javascript:history.go(-1)" class="o-edit-post__close  u-only-desktop">
                <icon class="icon" name="close"></icon>
            </a>

            <div class="o-edit-post__wrapper--sub" v-infinite-scroll="axiosGetComments" infinite-scroll-disabled="infScrollDisable" :infinite-scroll-distance="windowHeight/3">
                <div class="o-edit-post__post-description">

                    <div class="o-edit-post__user-img">
                        <img :src="storage + newsFeedPost.user_image.avatar" alt="logged user avatar">
                    </div>

                    <div class="o-edit-post__content">
                        <span class="o-edit-post__username">{{ newsFeedPost.username }}</span>
                        <form @submit.prevent="submitDescription" class="o-edit-post__description-form">
                            <input type="text"
                                placeholder="Add Description"
                                :disabled="descriptionDisabled"
                                v-model="description"
                                class="o-edit-post__description-input">
                        </form>
                        <p class="o-edit-post__submit-notification">Description change successfull</p>
                    </div>

                    <div class="o-edit-post__icons">
                        <div class="o-edit-post__delete" @click="deleteDescription">
                            <icon class="icon" name="times-circle"></icon>
                        </div>

                        <div class="o-edit-post__submit" @click="submitDescription">
                            <icon class="icon" name="check-circle"></icon>
                        </div>

                        <div class="o-edit-post__edit" @click="enableDescriptionChange">
                            <icon class="icon" name="edit"></icon>
                        </div>
                    </div>

                </div>

                <app-comment v-for="(postComment, index) in postCommentsAll" :key="postComment.id + '-' + index" :postComment="postComment"
                    @commentDeleted="refreshComments" class="o-all-comments__comment"></app-comment>
                <app-spinner v-if="loading"></app-spinner>
            </div>

            <app-make-comment class="o-edit-post__make-comment" @commentSubmited="refreshComments"></app-make-comment>
        </div>

        <div class="o-edit-post__post u-only-desktop">
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
        </div>

    </div>
</template>

<script>
    import { store } from '../store/store';
    import { comments, posts } from '../axios-urls';
    import { mixinStorage, basicVars } from '../mixins';
    import Comment from './Comment.vue';
    import MakeComment from './MakeComment.vue';
    import Spinner from './Spinner.vue';

    export default {
        props: ['postId'],
        mixins: [ mixinStorage, basicVars ],
        data () {
		    return {
                description: '',
                descriptionDisabled: true,
                comments: [],
                loading: false,
                infScrollDisable: false,
                commentAmount: 8,
                commentPage: 1
		    }
        },
        computed: {
            token() {
				return this.$store.getters['login/token'];
            },
            loggedUserId() {
				return this.$store.getters['login/idUser'];
            },
            newsFeedPost() {
				return this.$store.getters['nfPosts/newsFeedPost'];
			},
            newsFeedPostsAll() {
				return this.$store.getters['nfPosts/newsFeedPostsAll'];
			},
            postCommentsAll() {
				return this.$store.getters['nfPosts/postCommentsAll'];
			}
        },
        methods: {
            enableDescriptionChange(e) {
                const iconDescEdit = $(e.currentTarget);
                const iconDescDelete = $('.o-edit-post__delete');
                const iconDescSubmit = $('.o-edit-post__submit');
                if (iconDescEdit.hasClass('is-active')) {
                    iconDescEdit.removeClass('is-active');
                    this.descriptionDisabled = true;
                    $('.o-edit-post__description-input').off('focus');
                    iconDescDelete.show(0);
                    iconDescSubmit.hide(0);
                    return;
                }
                iconDescEdit.addClass('is-active');
                this.descriptionDisabled = false;
                setTimeout(function(){
                    $('.o-edit-post__description-input').focus();
                    iconDescDelete.hide(0);
                    iconDescSubmit.show(0);
                }, 100);
            },
            deleteDescription(e) {
                const iconDescDelete = $(e.currentTarget);
                const iconDescSubmit = $('.o-edit-post__submit');
                this.description = '';
                iconDescDelete.hide(0);
                iconDescSubmit.show(0);
            },
            submitDescription() {
                posts.patch('' + this.postId, { description: this.description }, { headers: { Authorization: 'Bearer ' + this.token } })
                    .then(res => {
                        const iconDescEdit = $('.o-edit-post__edit');
                        const iconDescDelete = $('.o-edit-post__delete');
                        const iconDescSubmit = $('.o-edit-post__submit');
                        iconDescEdit.removeClass('is-active');
                        iconDescSubmit.addClass('is-active');
                        this.descriptionDisabled = true;
                        $('.o-edit-post__description-input').off('focus');
                        $('.o-edit-post__submit-notification').show(0).animate({
                            opacity: 1,
                            top: '-2rem'
                        }, 1500, function() {
                            iconDescSubmit.removeClass('is-active').hide(0);
                            iconDescDelete.show(0);
                            $('.o-edit-post__submit-notification').hide(0).css({
                                opacity: 0,
                                top: '2rem'
                            });
                        });
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
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
                }, 500);
                // update post in NewsFeedPostsAll array
                posts.get('' + this.postId, { headers: { Authorization: 'Bearer ' + this.token } })
                    .then(res => {
                        // console.log(res);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },
        components: {
            appComment: Comment,
            appMakeComment: MakeComment,
            appSpinner: Spinner
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
            this.description = this.newsFeedPost.description;
            if (this.windowWidth > this.breakpoint) {
                this.$store.dispatch('headings/actSetHeading', 'photogram');
            } else this.$store.dispatch('headings/actSetHeading', 'Edit Post');
        },
        destroyed() {
            this.$store.dispatch('nfPosts/pushPostCommentsAll', []);
        }
	}
</script>

<style lang="scss" scoped>
	@import '../scss/settings';

    .o-edit-post {
        font-family: 'Roboto', sans-serif;
		width: 100%;
        height: 100vh;
        background-color: $white;
        z-index: 9;
        padding-top: 4.76rem;
        padding-bottom: 4.2rem;

        @include breakpoint(desktop) {
            position: relative;
            top: 0;
            left: 0;
            background-color: rgba($lightblack, .9);
            padding-top: 0;
            padding-bottom: 0;
        }

        &__wrapper {
            &--main {
                background-color: $white;

                @include breakpoint(desktop) {
                    position: absolute;
                    width: 57rem;
                    height: 74vh;
                    top: 55%;
                    left: 40%;
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

        &__post-description {
            border-bottom: 1px solid rgba($darkgrey, .5);
            padding-top: .4rem;
            padding-bottom: 1.2rem;
            margin-bottom: 1.2rem;
        }

        &__user-img {
            display: inline-block;
            width: 4.1rem;
            height: 4.1rem;
            margin-top: .9rem;
            margin-left: 1.5rem;

            @include breakpoint(desktop) {
                width: 4.6rem;
                height: 4.6rem;
                margin-top: 4.8rem;
                margin-left: 3.5rem;
            }

            img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }
        }

        &__content {
            @include fontSizeRem(14, 16);
            @include lineHeightRem(17, 19);
            position: relative;
            display: inline-block;
            width: 55%;
            margin-top: 2.2rem;
            margin-left: .6rem;
            vertical-align: top;

            @include breakpoint(desktop) {
                width: 65%;
                margin-top: 5.6rem;
            }
        }

        &__username {
            font-family: 'Roboto-Bold', sans-serif;
            margin-right: .5rem;
        }

        &__description {
            &-form {
                display: inline;
            }

            &-input {
                @include fontSizeRem(14, 16);
                @include lineHeightRem(17, 19);
                width: 80%;
                border: none;
                outline: none;

                &:disabled {
                    background-color: $white;
                }
            }
        }

        &__icons {
            display: inline-block;
            margin-left: .5rem;
            margin-bottom: .3rem;
            width: 6.2rem;

            @include breakpoint(desktop) {
                position: relative;
                top: -1.5rem;
                width: 6.6rem;
            }

            svg {
                width: 100%;
                height: 100%;
            }
        }

        &__delete, &__submit, &__edit {
            float: right;
            width: 2.7rem;
            height: 2.7rem;
            cursor: pointer;

            @include breakpoint(desktop) {
                width: 2.9rem;
                height: 2.9rem;
            }
        }

        &__submit {
            display: none;

            &.is-active {
                svg {
                    fill: $lightgreen;
                }
            }
        }

        &__edit {
            margin-right: .5rem;

            svg {
                fill: $lightblack;
            }

            &.is-active {
                svg {
                    fill: $lightgreen;
                }
            }
        }

        &__submit-notification {
            display: none;
            position: absolute;
            top: 2rem;
            width: 75vw;
            opacity: 0;
            color: $lightgreen;
        }

        &__close {
            position: absolute;
            width: 4rem;
            height: 4rem;
            color: $white;
            top: -5.5%;
            right: -7%;
            cursor: pointer;

            svg {
                width: 100%;
                height: 100%;
            }
        }

        &__post {
            position: absolute;
            width: 50rem;
            height: 50rem;
            top: 18%;
            right: 17%;
            border: 1px solid $darkgrey;

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
    }
</style>
