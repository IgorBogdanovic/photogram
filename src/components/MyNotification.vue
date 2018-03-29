<template>
    <div class="o-my-notification">
        <div class="o-my-notification__content">

            <nav class="o-my-notification__nav">
                <ul class="o-my-notification__nav-ul">
                    <li class="o-my-notification__nav-li  js-notifications" :class="{ 'is-active': (activeWrapperItem === 'notifications') }" @click="activate($event)">My Notification</li>
                    <li class="o-my-notification__nav-li  js-followers" :class="{ 'is-active': (activeWrapperItem === 'followers') }" @click="activate($event)">My Followers</li>
                    <li class="o-my-notification__nav-li  js-followings" :class="{ 'is-active': (activeWrapperItem === 'followings') }" @click="activate($event)">My Followings</li>
                </ul>
            </nav>

            <div class="o-my-notification__wrapper">

                <div v-if="activeWrapperItem === 'notifications'" class="o-my-notification__wrapper-item  o-my-notification__wrapper-item--notifications">
                    <p>Not available yet...</p>
                </div>

                <div v-if="activeWrapperItem === 'followers'" class="o-my-notification__wrapper-item  o-my-notification__wrapper-item--followers"
                v-infinite-scroll="axiosGetFollowers" infinite-scroll-disabled="infScrollDisable" :infinite-scroll-distance="windowHeight/3">
                    <app-notification v-for="(follower, index) in followArray" :key="'follower.id' + '-' + index" :follower="follower"
                        class="o-notification__item"></app-notification>
                    <app-spinner v-if="loading"></app-spinner>
                </div>

                <div v-if="activeWrapperItem === 'followings'" class="o-my-notification__wrapper-item  o-my-notification__wrapper-item--followings"
                v-infinite-scroll="axiosGetFollowings" infinite-scroll-disabled="infScrollDisable" :infinite-scroll-distance="windowHeight/3">
                    <app-spinner v-if="loading"></app-spinner>
                </div>

            </div>

        </div>
    </div>
</template>

<script>
    import { followers, followings } from '../axios-urls'
    import { mixinStorage, basicVars } from '../mixins'
    import Spinner from './Spinner.vue'

    export default {
        mixins: [ mixinStorage, basicVars ],
        data () {
		    return {
                activeWrapperItem: 'notifications',
                followArray: [],
                loading: false,
                infScrollDisable: false,
                followAmount: 15,
                followPage: 1
		    }
        },
        computed: {
            token() {
				return this.$store.getters['login/token'];
            }
        },
        methods: {
            axiosGetFollowers() {
                this.loading = true;
                this.infScrollDisable = true;
                followers.get('', { headers: { Authorization: 'Bearer ' + this.token },
                params: { amount: this.followAmount, page: this.followPage } })
                    .then(res => {
                        console.log(res);
                        if (res.data.length > 0) {
                            for (let i = 0; i < res.data.length; i++) {
                                this.followArray.push(res.data[i]);
                            }
                            this.followPage++;
                            this.loading = false;
                            this.infScrollDisable = false;
                        } else {
                            this.loading = false;
                            this.infScrollDisable = true;
                            console.log('empty array'); // should make some msg displays
                        }
                    });
            },
            axiosGetFollowings() {
                this.loading = true;
                this.infScrollDisable = true;
                followings.get('', { headers: { Authorization: 'Bearer ' + this.token },
                params: { amount: this.followAmount, page: this.followPage } })
                    .then(res => {
                        console.log(res);
                        if (res.data.length > 0) {
                            for (let i = 0; i < res.data.length; i++) {
                                this.followArray.push(res.data[i]);
                            }
                            this.followPage++;
                            this.loading = false;
                            this.infScrollDisable = false;
                        } else {
                            this.loading = false;
                            this.infScrollDisable = true;
                            console.log('empty array'); // should make some msg displays
                        }
                    });
            },
            activate(e) {
                const activeNavLi = $(e.target);
                this.followArray = [];
                this.followPage = 1;

                if ( activeNavLi.hasClass('js-notifications') ) {
                    this.activeWrapperItem = 'notifications';
                } else if ( activeNavLi.hasClass('js-followers') ) {
                    this.activeWrapperItem = 'followers';
                    this.axiosGetFollowers();
                } else if ( activeNavLi.hasClass('js-followings') ) {
                    this.activeWrapperItem = 'followings';
                    this.axiosGetFollowings();
                }
            }
        },
        components: {
            appSpinner: Spinner
        },
        created() {
            if (this.windowWidth > this.breakpoint) {
                this.$store.dispatch('headings/actSetHeading', 'photogram');
            } else this.$store.dispatch('headings/actSetHeading', 'My Notification');
        }
        // destroyed() {
        //     console.log(this.comments);
        // }
	}
</script>

<style lang="scss" scoped>
	@import '../scss/settings';

    .o-my-notification {
        width: 100%;
		height: 100vh;
		background-color: $white;

		&__content {
            font-family: 'Roboto', sans-serif;
			overflow: hidden;
			padding-top: 4.76rem;
			padding-bottom: 4.2rem;

			@include breakpoint(desktop) {
				width: 148rem;
				margin: 0 auto;
				padding-top: 13.7rem;
			}
		}

        &__nav {
            width: 100%;
            padding-top: 1.5rem;
            padding-left: 3.7rem;

            &-ul {
                overflow-x: auto;
                white-space: nowrap;
                padding-bottom: 1.4rem;
            }

            &-li {
                @include fontSizeRem(14, 20);
                @include lineHeightRem(17, 24);
                display: inline;
                color: $lightblack;
                text-transform: uppercase;
                margin-right: 1.2rem;
                cursor: pointer;

                &.is-active {
                    color: $lightgreen;
                }
            }
        }

        &__wrapper {
            &-item {
                &--notifications {
                    text-align: center;
                    padding-top: 5rem;

                    p {
                        @include fontSizeRem(14, 20);
                        @include lineHeightRem(17, 24);
                        color: $lightblack;
                    }
                }

                &--followers {
                    background-color: green;
                }

                &--followings {
                    background-color: red;
                }
            }
        }
    }
</style>
