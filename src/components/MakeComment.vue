<template>
    <div class="o-all-comments__make-comment  m-make-comment">
        <form @submit.prevent="submitComment">
            <div class="m-make-comment__icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="2736.636 282 25.678 23.277">
                <path id="Union_15" data-name="Union 15" class="cls-1" d="M4.028,13.662a9.6,9.6,0,1,1,3.278,3.861L0,20.306Z" transform="translate(2739 283)"/>
                </svg>
            </div>

            <input type="text"
                placeholder="Comment"
                v-model="comment"
			    @blur="$v.comment.$touch()"
                class="m-make-comment__input">

            <button type="submit" :disabled="$v.$invalid" class="m-make-comment__submit">
                <icon class="icon" name="check-circle"></icon>
            </button>
        </form>
    </div>
</template>

<script>
    import { required } from 'vuelidate/lib/validators';
    import { mapState } from 'vuex';

    export default {
        props: ['postId'],
        data () {
		    return {
		    	comment: ''
		    }
		},
		validations: {
			comment: {
				required
			}
        },
        computed:
            mapState({
                newsFeedPost: state => state.nfPosts.newsFeedPost
			}),
        methods: {
		    submitComment() {
                var txtSplited = this.comment.split(' ');

                for (let i = 0; txtSplited.length > i; i++) {
                    if (txtSplited[i].indexOf('@') > -1) {
                        var username = txtSplited[i].replace('@', '');
                    }
                }
                var txtJoined = txtSplited.join(' ');
                var postId;

                if (this.newsFeedPost.id) {
                    // when is loaded in NewsFeedPost comp
                    postId = this.newsFeedPost.id;
                // when is loaded in Comments comp
                } else postId = this.postId;
                
                const commentData = {
                    post_id: postId,
                    reply_username: username,
					body: txtJoined
                };
                // console.log(commentData);
                this.$store.dispatch('nfPosts/postComment', commentData)
                    .then(res => {
                        this.$emit('commentSubmited');
                        this.comment = '';
                    })
                    .catch(error => {
                        console.log(error);
                    });
		    }
        },
        // created() {
        //     console.log(this.newsFeedPost);
        // },
        // destroyed() {
        //     console.log(this.comments);
        // }
	}
</script>

<style lang="scss" scoped>
	@import '../scss/settings';

    .m-make-comment {
        position: fixed;
        bottom: 4.1rem;
        left: 0;
        width: 100%;
        padding-top: .1rem;
        background-color: $white;
        border-top: 1px solid rgba($darkgrey, .5);

        @include breakpoint(desktop) {
            position: absolute;
            bottom: 0;
            padding-top: .5rem;
            padding-bottom: .2rem;
        }

        svg {
            width: 100%;
            height: 100%;
            stroke: $lightblack;
            stroke-width: .1rem;
            fill: $white;

            @include breakpoint(desktop) {
                stroke-width: .2rem;
            }
        }

        ::placeholder {
            color: $lightblack;
            opacity: .5;
        }

        :-ms-input-placeholder {
            color: $lightblack;
            opacity: .5;
        }

        ::-ms-input-placeholder {
            color: $lightblack;
            opacity: .5;
        }

        &__icon {
            display: inline-block;
            width: 3.2rem;
            height: 3.2rem;
            margin-bottom: .5rem;
            margin-left: 1.4rem;

            @include breakpoint(desktop) {
                width: 3.6rem;
                height: 3.6rem;
                margin-bottom: .8rem;
                margin-left: 3.1rem;
            }
        }

        &__input {
            @include fontSizeRem(16, 16);
            @include lineHeightRem(19, 19);
            color: $lightblack;
            position: relative;
            bottom: .8rem;
            width: 68%;
            margin-left: .2rem;
            border: none;
            border-radius: 5px;

            @include breakpoint(desktop) {
                width: 73%;
                bottom: 1.2rem;
                margin-left: .7rem;
            }

            &:focus {
                background-color: $lightgray;
            }
        }

        &__submit {
            position: relative;
            top: .2rem;
            width: 3.5rem;
            height: 3.5rem;
            background-color: transparent;
            cursor: pointer;

            @include breakpoint(desktop) {
                width: 3.8rem;
                height: 3.8rem;
                margin-left: .4rem;
            }

            svg {
                stroke: $white;
                fill: $lightblack;
            }

            &[disabled],
            &[disabled]:hover,
            &[disabled]:active {
                cursor: not-allowed;
                
                svg {
                    fill: $gray;
                }
            }
        }
    }

    // corrections when loaded in NewsFeedPost component
    .m-bar__make-comment, .m-detail-bar__make-comment {
        .m-make-comment {
            opacity: 0;
            position: absolute;
            bottom: -.6rem;
            border-top: none;
            border-bottom: 1px solid rgba($darkgrey, .5);

            &__icon {
                @include breakpoint(mobile) {
                    transform: scale(.78);
                    transition: transform .5s ease-in-out;

                    &.is-visible {
                        transform: scale(1);
                    }
                }

                @include breakpoint(desktop) {
                    width: 2.5rem;
                    height: 2.5rem;
                    margin-left: 1rem;
                    margin-bottom: .5rem;
                }
            }

            &__input {
                @include breakpoint(desktop) {
                    width: 71%;
                    bottom: .5rem;
                }
            }

            &__submit {
                @include breakpoint(desktop) {
                    width: 2.5rem;
                    height: 2.5rem;
                }
            }
        }
    }

    .m-detail-bar__make-comment {
        .m-make-comment__input {
            @include breakpoint(desktop) {
                width: 82%;
            }
        }
    }
</style>
