<template>
    <div class="m-comment">

        <div class="m-comment__user-img">
            <img :src="storage + comment.user_image.avatar" alt="user avatar that made this comment">
        </div>

        <div class="m-comment__content">
            <span class="m-comment__username">{{ comment.username }}</span>
            <p class="m-comment__body">{{ comment.body }}</p>
            <span class="m-comment__reply">reply</span>
        </div>

        <div class="m-comment__like" :class="{ 'is-active': comment.auth_like_id }">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="2700.998 281.935 22.901 23.092">
            <path id="Path_79" data-name="Path 79" class="cls-1" d="M19.339,1.1A4.1,4.1,0,0,0,13.823.959h0a5.493,5.493,0,0,1-3.337,1.318A5.225,5.225,0,0,1,6.809.959h0a4.166,4.166,0,0,0-5.448.069,4.366,4.366,0,0,0-.409,5.9h0L10.35,20.1,19.816,6.854A4.416,4.416,0,0,0,19.339,1.1Z" transform="translate(2702.004 283.205)"/>
            </svg>
        </div>

    </div>
</template>

<script>
    import { mixinStorage } from '../mixins'

    export default {
        mixins: [ mixinStorage ],
        props: ['comment']
	}
</script>

<style lang="scss" scoped>
	@import '../scss/settings';

    .m-comment {
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
        
        &__user-img {
            display: inline-block;
            width: 4.1rem;
            height: 4.1rem;
            margin-top: 0.9rem;
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
            display: inline-block;
            width: 60%;
            margin-top: 2.2rem;
            margin-left: 0.6rem;
            vertical-align: top;

            @include breakpoint(desktop) {
                width: 68%;
                margin-top: 5.6rem;
            }
        }

        &__username {
            font-family: 'Roboto-Bold', sans-serif;
            margin-right: 0.5rem;
        }

        &__body {
            display: inline;
        }

        &__reply {
            @include fontSizeRem(10, 16);
            @include lineHeightRem(12, 19);
            display: block;
            color: $lightblack;
            opacity: .5;
            text-align: right;
        }

        &__like {
            display: inline-block;
            width: 2.5rem;
            height: 2.5rem;
            margin-top: 2.6rem;
            margin-left: 1.7rem;

            @include breakpoint(desktop) {
                width: 2.7rem;
                height: 2.7rem;
                position: relative;
                top: -0.4rem;
            }
            
            &.is-active {
                svg {
                    stroke: $lightgreen;
                    stroke-width: 0.1rem;
                    fill: $lightgreen;

                    @include breakpoint(desktop) {
                        stroke-width: 0.2rem;
                    }
                }
            }
        }
    }
</style>
