<template>
    <div class="o-my-notifications">
        <div class="o-my-notifications__content">

            <nav class="o-my-notifications__nav">
                <ul class="o-my-notifications__nav-ul">
                    <li class="o-my-notifications__nav-li  js-notifications" :class="{ 'is-active': (activeWrapperItem === 'notifications') }" @click="activate($event)">My Notifications</li>
                    <li class="o-my-notifications__nav-li  js-followers" :class="{ 'is-active': (activeWrapperItem === 'followers') }" @click="activate($event)">My Followers</li>
                    <li class="o-my-notifications__nav-li  js-followings" :class="{ 'is-active': (activeWrapperItem === 'followings') }" @click="activate($event)">My Followings</li>
                </ul>
            </nav>

            <div class="o-my-notifications__wrapper" v-infinite-scroll="axiosGetFollow" infinite-scroll-disabled="infScrollDisable" :infinite-scroll-distance="windowHeight/3">

                <div v-if="activeWrapperItem === 'notifications'" class="o-my-notifications__wrapper-item  o-my-notifications__wrapper-item--notifications">
                    <p>Not available yet...</p>
                </div>

                <div v-if="activeWrapperItem === 'followers'" class="o-my-notifications__wrapper-item  o-my-notifications__wrapper-item--followers">
                    <app-notification-item v-for="(notifItem, index) in notifArray" :key="notifItem.id + '-' + index" :notifItem="notifItem"
                    :activeWrapperItem="activeWrapperItem" class="o-my-notifications__item"></app-notification-item>
                    <app-spinner v-if="loading"></app-spinner>
                </div>

                <div v-if="activeWrapperItem === 'followings'" class="o-my-notifications__wrapper-item  o-my-notifications__wrapper-item--followings">
                    <app-notification-item v-for="(notifItem, index) in notifArray" :key="notifItem.id + '-' + index" :notifItem="notifItem"
                    :activeWrapperItem="activeWrapperItem" class="o-my-notifications__item"></app-notification-item>
                    <app-spinner v-if="loading"></app-spinner>
                </div>

            </div>

        </div>
    </div>
</template>

<script>
    import { photogramApi } from '../axios-urls'
    import { mixinStorage, basicVars } from '../mixins'
    import NotificationItem from './NotificationItem.vue'
    import Spinner from './Spinner.vue'

    export default {
        mixins: [ mixinStorage, basicVars ],
        data () {
		    return {
                activeWrapperItem: 'notifications',
                notifArray: [],
                loading: false,
                infScrollDisable: false,
                notifAmount: 15,
                notifPage: 1
		    }
        },
        computed: {
            token() {
				return this.$store.getters['login/token'];
            }
        },
        methods: {
            axiosGetFollow() {
                if (this.activeWrapperItem === 'notifications') {
                    return false;
                }
                this.loading = true;
                this.infScrollDisable = true;
                photogramApi.get(this.activeWrapperItem + '/', { headers: { Authorization: 'Bearer ' + this.token },
                params: { amount: this.notifAmount, page: this.notifPage } })
                    .then(res => {
                        if (res.data.data.length > 0) {
                            for (let i = 0; i < res.data.data.length; i++) {
                                this.notifArray.push(res.data.data[i]);
                            }
                            this.notifPage++;
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
                this.notifArray = [];
                this.notifPage = 1;
                this.loading = false;
                this.infScrollDisable = false;

                if ( activeNavLi.hasClass('js-notifications') ) {
                    this.activeWrapperItem = 'notifications';
                } else if ( activeNavLi.hasClass('js-followers') ) {
                    this.activeWrapperItem = 'followers';
                    this.axiosGetFollow();
                } else if ( activeNavLi.hasClass('js-followings') ) {
                    this.activeWrapperItem = 'followings';
                    this.axiosGetFollow();
                }
            }
        },
        components: {
            appNotificationItem: NotificationItem,
            appSpinner: Spinner
        },
        created() {
            if (this.windowWidth > this.breakpoint) {
                this.$store.dispatch('headings/actSetHeading', 'photogram');
            } else this.$store.dispatch('headings/actSetHeading', 'My Notifications');
        }
        // destroyed() {
        //     console.log(this.comments);
        // }
	}
</script>

<style lang="scss" scoped>
	@import '../scss/settings';

    .o-my-notifications {
        width: 100%;
		height: 100vh;
		background-color: $white;

		&__content {
            font-family: 'Roboto', sans-serif;
			overflow: hidden;
			padding-top: 4.76rem;
			padding-bottom: 4.2rem;

			@include breakpoint(desktop) {
				width: 65rem;
				margin: 0 auto;
				padding-top: 7.8rem;
			}
		}

        &__nav {
            width: 100%;
            padding-top: 1.5rem;
            padding-left: 3.7rem;

            @include breakpoint(desktop) {
				position: fixed;
                background-color: $white;
                width: 65rem;
                padding-top: 6.5rem;
                padding-left: 0;
                border-bottom: 1px solid rgba($darkgrey, .5);
			}

            &-ul {
                overflow-x: auto;
                white-space: nowrap;
                padding-bottom: 1.4rem;

                @include breakpoint(desktop) {
                    width: 100%;
                    display: flex;
                    justify-content: space-evenly;
                }
            }

            &-li {
                @include fontSizeRem(14, 20);
                @include lineHeightRem(17, 24);
                display: inline;
                color: $lightblack;
                text-transform: uppercase;
                margin-right: 1.2rem;
                cursor: pointer;

                @include breakpoint(desktop) {
                    margin-right: 0;
                }

                &.is-active {
                    color: $lightgreen;
                }
            }
        }

        &__wrapper {
            @include breakpoint(desktop) {
                width: 95%;
                padding-top: 10rem;
                margin: 0 auto;
            }

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
            }
        }
    }
</style>
