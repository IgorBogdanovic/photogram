<template>
    <div class="o-search">
        <div class="o-search__content">

            <nav class="o-search__nav">
                <ul class="o-search__nav-ul">
                    <li class="o-search__nav-li  js-people" :class="{ 'is-active': (activeWrapperItem === 'users') }" @click="activate($event)">People</li>
                    <li class="o-search__nav-li  js-email" :class="{ 'is-active': (activeWrapperItem === 'email') }" @click="activate($event)">Email</li>
                    <li class="o-search__nav-li  js-tags" :class="{ 'is-active': (activeWrapperItem === 'hashtags') }" @click="activate($event)">Tags</li>
                </ul>
            </nav>

            <div class="o-search__wrapper">

                <div v-if="activeWrapperItem === 'users'" class="o-search__wrapper-item  o-search__wrapper-item--people">
                    <form @submit.prevent="search($event)">
                        <div class="o-search__form-field">
                            <div class="o-search__form-field-icon  c-form-field-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                    viewBox="0 0 118.783 118.783" style="enable-background:new 0 0 118.783 118.783;" xml:space="preserve">
                                <g>
                                    <path d="M115.97,101.597L88.661,74.286c4.64-7.387,7.333-16.118,7.333-25.488c0-26.509-21.49-47.996-47.998-47.996
                                        S0,22.289,0,48.798c0,26.51,21.487,47.995,47.996,47.995c10.197,0,19.642-3.188,27.414-8.605l26.984,26.986
                                        c1.875,1.873,4.333,2.806,6.788,2.806c2.458,0,4.913-0.933,6.791-2.806C119.72,111.423,119.72,105.347,115.97,101.597z
                                        M47.996,81.243c-17.917,0-32.443-14.525-32.443-32.443s14.526-32.444,32.443-32.444c17.918,0,32.443,14.526,32.443,32.444
                                        S65.914,81.243,47.996,81.243z"/>
                                </g>
                                </svg>
                            </div>
                            <input type="text"
                                placeholder="Username"
                                v-model="searchQuery"
                                @keyup="search($event)"
                                class="c-form-input">
                        </div>
                    </form>
                    <app-search-res-item v-for="(searchResItem, index) in searchRes" :key="searchResItem.id + '-' + index" :searchResItem="searchResItem"
                    :activeWrapperItem="activeWrapperItem" class="o-search__res-item"></app-search-res-item>
                    <app-spinner v-if="loading"></app-spinner>
                </div>

                <div v-if="activeWrapperItem === 'email'" class="o-search__wrapper-item  o-search__wrapper-item--email">
                    <form @submit.prevent="search($event)">
                        <div class="o-search__form-field">
                            <div class="o-search__form-field-icon  c-form-field-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                    viewBox="0 0 118.783 118.783" style="enable-background:new 0 0 118.783 118.783;" xml:space="preserve">
                                <g>
                                    <path d="M115.97,101.597L88.661,74.286c4.64-7.387,7.333-16.118,7.333-25.488c0-26.509-21.49-47.996-47.998-47.996
                                        S0,22.289,0,48.798c0,26.51,21.487,47.995,47.996,47.995c10.197,0,19.642-3.188,27.414-8.605l26.984,26.986
                                        c1.875,1.873,4.333,2.806,6.788,2.806c2.458,0,4.913-0.933,6.791-2.806C119.72,111.423,119.72,105.347,115.97,101.597z
                                        M47.996,81.243c-17.917,0-32.443-14.525-32.443-32.443s14.526-32.444,32.443-32.444c17.918,0,32.443,14.526,32.443,32.444
                                        S65.914,81.243,47.996,81.243z"/>
                                </g>
                                </svg>
                            </div>
                            <input type="text"
                                placeholder="Email"
                                v-model="searchQuery"
                                @keyup="search($event)"
                                class="c-form-input">
                        </div>
                    </form>
                    <app-spinner v-if="loading"></app-spinner>
                </div>

                <div v-if="activeWrapperItem === 'hashtags'" class="o-search__wrapper-item  o-search__wrapper-item--tags">
                    <form @submit.prevent="search($event)">
                        <div class="o-search__form-field">
                            <div class="o-search__form-field-icon  c-form-field-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                    viewBox="0 0 118.783 118.783" style="enable-background:new 0 0 118.783 118.783;" xml:space="preserve">
                                <g>
                                    <path d="M115.97,101.597L88.661,74.286c4.64-7.387,7.333-16.118,7.333-25.488c0-26.509-21.49-47.996-47.998-47.996
                                        S0,22.289,0,48.798c0,26.51,21.487,47.995,47.996,47.995c10.197,0,19.642-3.188,27.414-8.605l26.984,26.986
                                        c1.875,1.873,4.333,2.806,6.788,2.806c2.458,0,4.913-0.933,6.791-2.806C119.72,111.423,119.72,105.347,115.97,101.597z
                                        M47.996,81.243c-17.917,0-32.443-14.525-32.443-32.443s14.526-32.444,32.443-32.444c17.918,0,32.443,14.526,32.443,32.444
                                        S65.914,81.243,47.996,81.243z"/>
                                </g>
                                </svg>
                            </div>
                            <input type="text"
                                placeholder="Hashtag"
                                v-model="searchQuery"
                                @keyup="search($event)"
                                class="c-form-input">
                        </div>
                    </form>
                    <app-search-res-item v-for="(searchResItem, index) in searchRes" :key="searchResItem.id + '-' + index" :searchResItem="searchResItem"
                    :activeWrapperItem="activeWrapperItem" class="o-search__res-item"></app-search-res-item>
                    <app-spinner v-if="loading"></app-spinner>
                </div>

            </div>

        </div>
    </div>
</template>

<script>
    import { photogramApi } from '../axios-urls';
    import { mixinStorage, basicVars } from '../mixins';
    import SearchResItem from './SearchResItem.vue';
    import Spinner from './Spinner.vue';

    export default {
        mixins: [ mixinStorage, basicVars ],
        data () {
		    return {
                activeWrapperItem: 'users',
                loading: false,
                searchRes: [],
                searchQuery: '',
                // delay func for search method
                delay: (function(){
                    var timer = 0;
                    return function(callback, ms){
                        clearTimeout (timer);
                        timer = setTimeout(callback, ms);
                    };
                })()
		    }
        },
        computed: {
            token() {
				return this.$store.getters['login/token'];
            }
        },
        methods: {
            search(e) {
                const vm = this;
                vm.delay (function() {
                    vm.searchRes = [];
                    const searchVal = $(e.target).val().length;

                    if (e.type === 'keyup' && searchVal < 3) {
                        return false;
                    } else if (e.keyCode !== 13) {
                        vm.loading = true;
                        photogramApi.get('search/' + vm.activeWrapperItem + '/?q=' + encodeURIComponent(vm.searchQuery), { headers: { Authorization: 'Bearer ' + vm.token } })
                        .then(res => {
                            console.log(res);
                            if (res.data.data.length > 0) {
                                for (let i = 0; i < res.data.data.length; i++) {
                                    vm.searchRes.push(res.data.data[i]);
                                }
                                vm.loading = false;
                            } else {
                                vm.loading = false;
                                console.log('empty array'); // should make some msg displays
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
                    }
                }, 300);
            },
            activate(e) {
                const activeNavLi = $(e.target);
                this.searchRes = [];
                this.searchQuery = '';
                this.loading = false;

                if ( activeNavLi.hasClass('js-people') ) {
                    this.activeWrapperItem = 'users';
                } else if ( activeNavLi.hasClass('js-email') ) {
                    this.activeWrapperItem = 'email';
                } else if ( activeNavLi.hasClass('js-tags') ) {
                    this.activeWrapperItem = 'hashtags';
                }
                const inputField = $('.c-form-input');
                setTimeout ( function() { inputField.focus(); }, 100 );
            }
        },
        components: {
            appSpinner: Spinner,
            appSearchResItem: SearchResItem
        },
        created() {
            if (this.windowWidth > this.breakpoint) {
                this.$store.dispatch('headings/actSetHeading', 'photogram');
                $('body').removeClass('u-overflow-disabled');
            } else this.$store.dispatch('headings/actSetHeading', 'Search');
        },
        mounted() {
            const inputField = $('.c-form-input');
            setTimeout ( function() { inputField.focus(); }, 100 );
        }
        // destroyed() {
        //     console.log(this.comments);
        // }
    }
</script>

<style lang="scss" scoped>
	@import '../scss/settings';

    .o-search {
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
            padding-left: 6rem;

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
                margin-right: 2rem;
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
                padding-top: 10rem;
                margin: 0 auto;
            }
        }

        &__form-field {
            border-top: 1px solid rgba($darkgrey, .5);
            border-bottom: 1px solid rgba($darkgrey, .5);
            padding: .5rem 2rem;

            @include breakpoint(desktop) {
                border-top: none;
                padding: 2rem 2rem;
            }
        }
    }
</style>