<template>
    <div class="m-search-item">

        <router-link v-if="activeWrapperItem === 'users'" :to="{ name: 'user', params: { userId: searchedItem.id } }" tag="div" class="m-search-item__user-img">
            <img :src="storage + searchedItem.image.avatar" alt="searched user avatar">
        </router-link>

        <div class="m-search-item__content">
            <router-link v-if="activeWrapperItem === 'users'" :to="{ name: 'user', params: { userId: searchedItem.id } }" tag="span" class="m-search-item__username">
                {{ searchedItem.username }}
            </router-link>
            <p class="m-search-item__txt" :class="{ 'is-hashtag': activeWrapperItem === 'hashtags' }">
                <template v-if="activeWrapperItem === 'users'">is found</template>
                <template v-if="activeWrapperItem === 'hashtags'">{{ searchedItem }}</template>
            </p>
        </div>

        <div v-if="activeWrapperItem === 'users'" class="m-search-item__button">
            <button v-if="!searchedItem.auth_follow && searchedItem.id != loggedUserId" class="m-search-item__btn  m-search-item__btn--follow" type="button" @click="followUser">Follow</button>
            <button v-if="searchedItem.auth_follow" class="m-search-item__btn  m-search-item__btn--unfollow" type="button" @click="unfollowUser">Unfollow</button>
        </div>

    </div>
</template>

<script>
    import { mixinStorage } from '../mixins';
    import { mapState } from 'vuex';

    export default {
        mixins: [ mixinStorage ],
        props: ['searchResItem', 'activeWrapperItem'],
        data () {
		    return {
                searchedItem: this.searchResItem
		    }
        },
        computed:
            mapState({
                token: state => state.login.idToken,
                loggedUserId: state => state.login.idUser
			}),
        methods: {
            followUser() {
                const userId = this.searchedItem.id;
                this.$store.dispatch('nfPosts/followUser', userId)
                    .then(res => {
                        // console.log(res);
                        this.searchedItem.auth_follow = true;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            unfollowUser() {
                const userId = this.searchedItem.id;
                this.$store.dispatch('nfPosts/unfollowUser', userId)
                    .then(res => {
                        // console.log(res);
                        this.searchedItem.auth_follow = false;
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

    .m-search-item {
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

            &.is-hashtag {
                padding: 0 1.5rem;
            }
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
