<template>
    <div class="m-notification-item">

        <router-link :to="{ name: 'user', params: { userId: notification.id } }" tag="div" class="m-notification-item__user-img">
            <img :src="storage + notification.image.avatar" alt="notification user avatar">
        </router-link>

        <div class="m-notification-item__content">
            <router-link :to="{ name: 'user', params: { userId: notification.id } }" tag="span" class="m-notification-item__username">
                {{ notification.username }}
            </router-link>
            <p class="m-notification-item__txt">
                <template v-if="activeWrapperItem === 'followers'">is your follower</template>
                <template v-if="activeWrapperItem === 'followings'">is your following</template>
            </p>
        </div>

        <div class="m-notification-item__button">
            <button v-if="!notification.auth_follow && notification.id != loggedUserId" class="m-notification-item__btn  m-notification-item__btn--follow" type="button" @click="followUser">Follow</button>
            <button v-if="notification.auth_follow" class="m-notification-item__btn  m-notification-item__btn--unfollow" type="button" @click="unfollowUser">Unfollow</button>
        </div>

    </div>
</template>

<script>
    import { mixinStorage } from '../mixins'

    export default {
        mixins: [ mixinStorage ],
        props: ['notifItem', 'activeWrapperItem'],
        data () {
		    return {
                notification: this.notifItem
		    }
        },
        computed: {
            token() {
				return this.$store.getters['login/token'];
			},
            loggedUserId() {
				return this.$store.getters['login/idUser'];
            }
        },
        methods: {
            followUser() {
                const userId = this.notification.id;
                this.$store.dispatch('nfPosts/followUser', userId)
                    .then(res => {
                        // console.log(res);
                        this.notification.auth_follow = true;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            unfollowUser() {
                const userId = this.notification.id;
                this.$store.dispatch('nfPosts/unfollowUser', userId)
                    .then(res => {
                        // console.log(res);
                        this.notification.auth_follow = false;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        }
	}
</script>

<style lang="scss" scoped>
	@import '../scss/settings';

    .m-notification-item {
        &:last-child {
            margin-bottom: 1rem;
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
            display: inline-block;
            width: 55%;
            margin-top: 2.2rem;
            margin-left: .6rem;
            vertical-align: top;

            @include breakpoint(desktop) {
                width: 60%;
                margin-top: 6rem;
            }
        }

        &__username {
            font-family: 'Roboto-Bold', sans-serif;
            cursor: pointer;
        }

        &__txt {
            display: inline;
        }

        &__button {
            float: right;
            padding-top: 1.7rem;
            padding-right: 1rem;

            @include breakpoint(desktop) {
                padding-top: 5.1rem;
                padding-right: 2rem;
            }
        }

        &__btn {
            font-family: 'Roboto', sans-serif;
            @include fontSizeRem(10, 20);
            @include lineHeightRem(12, 24);
            color: $white;
            border-radius: 30px;
            cursor: pointer;

            &--follow {
                background-color: $lightblack;
                padding: .5rem 1.4rem;

                @include breakpoint(desktop) {
                    padding: .5rem 2rem;
                }
            }

            &--unfollow {
                background-color: $darkgrey;
                padding: .5rem .9rem;
            }
        }
    }
</style>
