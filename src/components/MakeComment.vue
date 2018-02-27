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

    export default {
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
        computed: {
            newsFeedPost() {
				return this.$store.getters['nfPosts/newsFeedPost'];
            }
        },
        methods: {
		    submitComment() {
		        const commentData = {
					post_id: this.newsFeedPost.id,
					body: this.comment
		        };
                this.$store.dispatch('nfPosts/postComment', commentData);
                this.$emit('commentSubmited');
                this.comment = '';
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
            stroke-width: 0.1rem;
            fill: $white;

            @include breakpoint(desktop) {
                stroke-width: 0.2rem;
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
            bottom: 0.8rem;
            width: 68%;
            margin-left: .2rem;
            border: none;

            @include breakpoint(desktop) {
                width: 73%;
                bottom: 1.2rem;
                margin-left: .7rem;
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
                margin-left: 0.4rem;
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
</style>
