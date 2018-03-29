<template>
    <div class="o-likes">
        <div class="o-likes__wrapper--main">
            <a href="javascript:history.go(-1)" class="o-likes__close  u-only-desktop" @click="closeLikes">
                <icon class="icon" name="close"></icon>
            </a>

            <div class="o-likes__wrapper--sub" v-infinite-scroll="axiosGetLikes" infinite-scroll-disabled="infScrollDisable" :infinite-scroll-distance="windowHeight/3">
                <app-like v-for="(likeObj, index) in likesAll" :key="likeObj.id + '-' + index" :likeObj="likeObj"
                    class="o-likes__like"></app-like>
                <app-spinner v-if="loading"></app-spinner>
            </div>
        </div>
    </div>
</template>

<script>
    import { likes } from '../axios-urls'
    import { basicVars } from '../mixins'
    import Like from './Like.vue'
    import Spinner from './Spinner.vue'

    export default {
        props: ['postId', 'typeId'],
        mixins: [ basicVars ],
        data () {
		    return {
                likes: [],
                loading: false,
                infScrollDisable: false,
                likesAmount: 15,
                likesPage: 1
		    }
        },
        computed: {
            token() {
				return this.$store.getters['login/token'];
            },
            newsFeedPost() {
				return this.$store.getters['nfPosts/newsFeedPost'];
            },
            likesAll() {
				return this.$store.getters['nfPosts/likesAll'];
			}
        },
        methods: {
			axiosGetLikes() {
                this.loading = true;
                this.infScrollDisable = true;
                likes.get('', { headers: { Authorization: 'Bearer ' + this.token },
                params: { likable_id: this.postId, likable_type: this.typeId, amount: this.likesAmount, page: this.likesPage } })
                    .then(res => {
                        if (res.data.data.length > 0) {
                            for (let i = 0; i < res.data.data.length; i++) {
                                this.likes.push(res.data.data[i]);
                            }
                            this.likesPage++;
                            this.$store.dispatch('nfPosts/pushLikes', this.likes);
                            this.loading = false;
                            this.infScrollDisable = false;
                        } else {
                            this.loading = false;
                            this.infScrollDisable = true;
                            console.log('empty array'); // should make some msg displays
                        }
                    });
            },
            closeLikes() {
                const vm = this;
                setTimeout(function(){
                    vm.$store.dispatch('nfPosts/pushLikes', []);
                }, 500);
			}
        },
        components: {
            appLike: Like,
            appSpinner: Spinner
        },
		created() {
            if (this.windowWidth > this.breakpoint) {
                this.$store.dispatch('headings/actSetHeading', 'photogram');
            } else this.$store.dispatch('headings/actSetHeading', 'Likes');
        },
        destroyed() {
            this.$store.dispatch('nfPosts/pushLikes', []);
        }
	}
</script>

<style lang="scss" scoped>
	@import '../scss/settings';

    .o-likes {
        font-family: 'Roboto', sans-serif;
		width: 100%;
        height: 100%;
        background-color: $red;
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
                padding-bottom: 1rem;

                @include breakpoint(desktop) {
                    position: absolute;
                    width: 57rem;
                    height: 74vh;
                    padding-bottom: 4rem;
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
