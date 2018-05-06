<template>
    <div class="m-comment">

        <router-link :to="{ name: 'user', params: { userId: comment.user_id } }" tag="div" class="m-comment__user-img">
            <img :src="storage + comment.user_image.avatar" alt="user avatar that made this comment">
        </router-link>

        <div class="m-comment__content">
            <router-link :to="{ name: 'user', params: { userId: comment.user_id } }" tag="span" class="m-comment__username">
                {{ comment.username }}
            </router-link>
            <form v-if="idUser === comment.user_id || $route.name === 'edit-post'" @submit.prevent="submitComment($event)" class="m-comment__form">
                <input type="text"
                    placeholder="Comment"
                    v-model="commentBody"
                    class="m-comment__body--input">
            </form>
            <p v-if="idUser === comment.user_id || $route.name === 'edit-post'" class="m-comment__submit-notification">Comment change successfull</p>
            <p class="m-comment__body--txt">
                <router-link v-if="comment.reply_username" :to="{ name: 'user', params: { userId: comment.reply_user_id } }" tag="span">
                    @{{ comment.reply_username }}
                </router-link>
                
                <template v-if="comment.reply_username">
                    {{ commentBody.replace( commentBody.match( new RegExp('@' + comment.reply_username, 'i') ), '' ) }}
                </template>
                <template v-else>
                    {{ commentBody }}
                </template>
            </p>
            <div class="m-comment__links  u-clearfix">
                <span class="m-comment__reply-link" @click="commentReply">reply</span>
                <span v-if="idUser === comment.user_id" class="m-comment__edit-link" @click="commentEdit($event)">edit</span>
            </div>
        </div>

        <div class="m-comment__icons">
            <div v-if="idUser === comment.user_id || $route.name === 'edit-post'" class="m-comment__delete" @click="deleteComment">
                <icon class="icon" name="times-circle"></icon>
            </div>

            <div class="m-comment__like" :class="{ 'is-active': comment.auth_like_id }" @click="unLikeComment">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="2700.998 281.935 22.901 23.092">
                <path id="Path_79" data-name="Path 79" class="cls-1" d="M19.339,1.1A4.1,4.1,0,0,0,13.823.959h0a5.493,5.493,0,0,1-3.337,1.318A5.225,5.225,0,0,1,6.809.959h0a4.166,4.166,0,0,0-5.448.069,4.366,4.366,0,0,0-.409,5.9h0L10.35,20.1,19.816,6.854A4.416,4.416,0,0,0,19.339,1.1Z" transform="translate(2702.004 283.205)"/>
                </svg>
            </div>
        </div>

    </div>
</template>

<script>
    import { comments } from '../axios-urls';
    import { mixinStorage } from '../mixins';
    import { mapState } from 'vuex';

    export default {
        mixins: [ mixinStorage ],
        props: ['postComment'],
        data () {
		    return {
                comment: this.postComment,
                commentBody: this.postComment.body
		    }
        },
        computed:
            mapState({
                token: state => state.login.idToken,
                idUser: state => state.login.idUser,
				postCommentsAll: state => state.nfPosts.postCommentsAll
			}),
        methods: {
            deleteComment() {
                const commentId = this.comment.id;
                this.$store.dispatch('nfPosts/deleteComment', commentId)
                    .then(res => {
                        this.$emit('commentEdited');
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            unLikeComment() {
                const commentId = this.comment.id;
                const likeId = this.comment.auth_like_id;
                const data = {
                    type: 2,
                    id: commentId,
                    likeId
                }
                this.$store.dispatch('nfPosts/unLike', data)
                    .then(res => {
						const data = res.data.data;
                        const allComments = this.postCommentsAll;
						const index = allComments.map(function(el) { return el.id; }).indexOf(commentId);
						let dataObj;
						
						if (data) {
							dataObj = {
								index: index,
								value: { auth_like_id: data.id }
							};
						} else {
							dataObj = {
								index: index,
								value: { auth_like_id: null }
							};
						}
                        this.$store.dispatch('nfPosts/updatePostCommentsAll', dataObj);
                        this.comment = allComments[index];
					})
					.catch(error => {
						console.log(error);
					});
            },
            submitComment(e) {
                const vm = this;
                const form = $(e.target);
                comments.patch('' + this.comment.id, { body: this.commentBody }, { headers: { Authorization: 'Bearer ' + this.token } })
                    .then(res => {
                        form.find('.m-comment__body--input').off('focus');
                        form.siblings('.m-comment__submit-notification').show(0).animate({
                            opacity: 1,
                            top: '-2rem'
                        }, 1500, function() {
                            form.siblings('.m-comment__submit-notification').hide(0).css({
                                opacity: 0,
                                top: '2rem'
                            });
                            form.find('.m-comment__body--input').hide(0);
                            form.siblings('.m-comment__body--txt').show(0);
                        });
                        setTimeout(function() { vm.$emit('commentEdited'); }, 1600);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            commentEdit(e) {
                const editLink = $(e.target);
                if ( editLink.hasClass('js-active') ) {
                    editLink.removeClass('js-active');
                    editLink.parents('.m-comment__content').find('.m-comment__form').find('.m-comment__body--input').hide(0).off('focus');
                    editLink.parents('.m-comment__content').find('.m-comment__body--txt').show(0);
                } else {
                    editLink.addClass('js-active');
                    editLink.parents('.m-comment__content').find('.m-comment__body--txt').hide(0);
                    editLink.parents('.m-comment__content').find('.m-comment__form').find('.m-comment__body--input').show(0).focus();
                }
            },
            commentReply() {
                $('.m-make-comment__input').focus().val('@' + this.comment.username + ' ');
            }
        },
        // created() {
        //     console.log(this.postComment);
        // }
	}
</script>

<style lang="scss" scoped>
	@import '../scss/settings';

    .m-comment {
        &:last-child {
            margin-bottom: 6rem;

            @include breakpoint(desktop) {
                margin-bottom: 8rem;
            }
        }

        &__user-img {
            display: inline-block;
            width: 4.1rem;
            height: 4.1rem;
            margin-top: .9rem;
            margin-left: 1.5rem;
            cursor: pointer;

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
            cursor: pointer;
        }

        &__form {
            display: inline;
        }

        &__body--input {
            @include fontSizeRem(14, 16);
            @include lineHeightRem(17, 19);
            display: none;
            width: 80%;
            outline: none;
            background-color: $white;
            border-radius: 5px;

            @include breakpoint(desktop) {
                width: 85%;
            }

            &:focus {
                background-color: $lightgray;
            }
        }

        &__body--txt {
            display: inline;

            span {
                font-family: 'Roboto-Bold', sans-serif;
                color: blue;
                cursor: pointer;
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

        &__links {
            span {
                @include fontSizeRem(10, 16);
                @include lineHeightRem(12, 19);
                color: $lightblack;
                opacity: .5;
                float: right;
                margin-top: 1rem;
                margin-right: 1rem;
                cursor: pointer;
            }
        }

        &__icons {
            display: inline-block;
            margin-right: .5rem;
            margin-bottom: .3rem;
            width: 6.2rem;

            @include breakpoint(desktop) {
                position: relative;
                top: -1.5rem;
                width: 8.6rem;
            }

            svg {
                width: 100%;
                height: 100%;
            }
        }

        &__delete, &__edit {
            float: right;
            width: 2.7rem;
            height: 2.7rem;
            cursor: pointer;

            @include breakpoint(desktop) {
                width: 2.9rem;
                height: 2.9rem;
            }
        }

        &__like {
            float: right;
            width: 2.5rem;
            height: 2.5rem;
            margin-right: .5rem;
            cursor: pointer;

            @include breakpoint(desktop) {
                width: 2.7rem;
                height: 2.7rem;
            }

            svg {
                stroke: $lightblack;
                stroke-width: .1rem;
                fill: $white;

                @include breakpoint(desktop) {
                    stroke-width: .2rem;
                }
            }
            
            &.is-active {
                svg {
                    stroke: $lightgreen;
                    stroke-width: .1rem;
                    fill: $lightgreen;

                    @include breakpoint(desktop) {
                        stroke-width: .2rem;
                    }
                }
            }
        }
    }
</style>
