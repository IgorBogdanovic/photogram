<template>
  	<div class="o-header">

        <a v-if="heading !== 'photogram'" href="javascript:history.go(-1)" class="o-header__prev-arrow  a-prev-arrow">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 240.823 240.823" style="enable-background:new 0 0 240.823 240.823;" xml:space="preserve">
            <g>
                <path id="Chevron_Right" d="M57.633,129.007L165.93,237.268c4.752,4.74,12.451,4.74,17.215,0c4.752-4.74,4.752-12.439,0-17.179
                    l-99.707-99.671l99.695-99.671c4.752-4.74,4.752-12.439,0-17.191c-4.752-4.74-12.463-4.74-17.215,0L57.621,111.816
                    C52.942,116.507,52.942,124.327,57.633,129.007z"/>
            </g>
            </svg>
        </a>

        <router-link v-if="heading === 'photogram'" :to="{ name: 'homepage' }" tag="div" class="o-header__home  a-home  u-only-desktop" :class="{ 'is-active': isHomeActive }">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="2700 1481 29 29">
            <g id="Group_132" data-name="Group 132" transform="translate(-267 487)">
                <ellipse id="Ellipse_18" data-name="Ellipse 18" class="cls-1" cx="14.5" cy="14.5" rx="14.5" ry="14.5" transform="translate(2967 994)"/>
                <rect id="Rectangle_119" data-name="Rectangle 119" class="cls-2" width="13" height="11" transform="translate(2975 1003)"/>
                <rect id="Rectangle_120" data-name="Rectangle 120" class="cls-1" width="3" height="5" transform="translate(2980 1010)"/>
            </g>
            </svg>
        </router-link>

        <router-link v-if="heading === 'photogram'" :to="{ name: 'user', params: { userId: loggedUserId } }" tag="div"
            class="o-header__avatar  a-avatar  u-only-desktop" @click.native="inUserDetail">
            <img :src="storage + userAvatar" alt="logged user avatar">
        </router-link>

        <router-link v-if="heading === 'photogram'" :to="{ name: 'upload', params: { userId: loggedUserId } }" tag="div"
		class="o-header__upload  a-upload  u-only-desktop" :class="{ 'is-active': isUploadActive }" @click.native="inUserUpload">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="2830.105 1480.158 29.843 29.842">
            <g id="Group_370" data-name="Group 370" transform="translate(2620.228 1461.233)">
                <g id="Ellipse_170" data-name="Ellipse 170" class="cls-1" transform="translate(209.876 18.925)">
                <ellipse class="cls-3" cx="14.921" cy="14.921" rx="14.921" ry="14.921"/>
                <ellipse class="cls-4" cx="14.921" cy="14.921" rx="13.921" ry="13.921"/>
                </g>
                <path id="Union_49" data-name="Union 49" class="cls-2" d="M6.353,13.573V8.086H.867a.866.866,0,1,1,0-1.732H6.353V.867a.866.866,0,1,1,1.732,0V6.353h5.487a.866.866,0,0,1,0,1.732H8.086v5.487a.866.866,0,0,1-1.732,0Z" transform="translate(217.764 26.359)"/>
            </g>
            </svg>
		</router-link>

        <div v-if="heading === 'photogram'" class="o-header__search  a-search">
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

        <div v-if="heading !== 'Terms and Conditions'" class="o-header__bulb  a-bulb">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 438.536 438.536" style="enable-background:new 0 0 438.536 438.536;"
                xml:space="preserve">
            <g>
                <g>
                    <path d="M352.733,75.226c-8.466-16.271-19.599-29.787-33.394-40.541c-13.801-10.752-29.413-19.223-46.821-25.41
                        C255.1,3.094,237.349,0,219.266,0s-35.832,3.09-53.247,9.276c-17.417,6.187-33.025,14.657-46.826,25.41
                        c-13.796,10.754-24.932,24.267-33.402,40.541c-8.47,16.274-12.703,33.83-12.703,52.677c0,29.502,9.805,55.006,29.409,76.516
                        c8.567,9.324,15.656,17.604,21.271,24.838c5.617,7.228,11.279,16.316,16.989,27.261c5.708,10.944,8.945,21.176,9.707,30.696
                        c-8.947,5.332-13.418,13.135-13.418,23.415c0,7.042,2.378,13.134,7.139,18.274c-4.76,5.14-7.139,11.231-7.139,18.273
                        c0,9.897,4.285,17.604,12.85,23.131c-2.478,4.373-3.715,8.847-3.715,13.415c0,8.754,2.996,15.516,8.992,20.27
                        c5.992,4.757,13.369,7.139,22.126,7.139c3.806,8.374,9.519,15.037,17.13,19.985s15.891,7.419,24.838,7.419
                        c8.949,0,17.227-2.471,24.838-7.419c7.614-4.948,13.329-11.611,17.135-19.985c8.754,0,16.132-2.382,22.124-7.139
                        c5.995-4.754,8.99-11.516,8.99-20.27c0-4.568-1.239-9.042-3.717-13.415c8.562-5.523,12.851-13.233,12.851-23.131
                        c0-7.042-2.382-13.134-7.139-18.273c4.757-5.141,7.139-11.232,7.139-18.274c0-10.28-4.474-18.083-13.422-23.415
                        c0.763-9.521,4-19.752,9.708-30.696c5.719-10.944,11.376-20.033,16.995-27.261c5.619-7.234,12.706-15.515,21.265-24.838
                        c19.605-21.51,29.414-47.014,29.414-76.516C365.447,109.056,361.211,91.5,352.733,75.226z M309.484,179.292
                        c-1.906,2.093-4.808,5.232-8.709,9.421c-3.898,4.187-6.8,7.324-8.703,9.419c-24.362,29.126-37.78,57.482-40.255,85.078h-65.1
                        c-2.474-27.596-15.891-55.952-40.256-85.078c-1.903-2.093-4.805-5.232-8.709-9.419c-3.899-4.189-6.805-7.325-8.708-9.421
                        c-12.941-15.037-19.414-32.168-19.414-51.389c0-13.706,3.284-26.458,9.851-38.262c6.571-11.801,15.136-21.458,25.697-28.979
                        c10.562-7.521,22.266-13.418,35.116-17.701c12.847-4.286,25.837-6.423,38.972-6.423s26.125,2.137,38.971,6.423
                        c12.847,4.283,24.551,10.181,35.115,17.701c10.561,7.52,19.13,17.181,25.693,28.979c6.563,11.803,9.853,24.556,9.853,38.262
                        C328.898,147.124,322.427,164.255,309.484,179.292z"/>
                    <path d="M247.674,86.795c-9.418-3.046-18.891-4.57-28.404-4.57c-2.474,0-4.615,0.9-6.423,2.712
                        c-1.809,1.809-2.712,3.949-2.712,6.423s0.904,4.615,2.712,6.423c1.809,1.805,3.949,2.712,6.423,2.712
                        c9.9,0,19.985,2.38,30.272,7.135c10.273,4.758,15.406,11.516,15.406,20.273c0,2.473,0.9,4.618,2.711,6.423
                        c1.813,1.804,3.949,2.708,6.42,2.708c2.478,0,4.616-0.901,6.427-2.708c1.811-1.809,2.71-3.951,2.71-6.423
                        c0-9.9-3.572-18.464-10.704-25.693C265.38,94.98,257.095,89.835,247.674,86.795z"/>
                </g>
            </g>
            </svg>
        </div>

        <h1 v-if="heading === 'photogram'" class="o-header__heading--main  a-heading--main">photo<span>gram</span></h1>
        <h1 v-else class="o-header__heading  a-heading">{{ heading }}</h1>
        <hr v-if="heading === 'Terms and Conditions'" class="o-header__hr  a-hr  a-hr--terms">
        <hr v-else class="o-header__hr  a-hr  a-hr--main">

  	</div>
</template>

<script>
    import { users } from '../axios-urls'
    import { mixinStorage, basicVars } from '../mixins'

    export default {
        mixins: [ mixinStorage, basicVars ],
        computed: {
            token() {
				return this.$store.getters['login/token'];
			},
            heading() {
				return this.$store.getters['headings/heading'];
            },
            isHomeActive() {
                return this.$route.name === 'homepage';
            },
            isUploadActive() {
                return this.$route.name === 'upload';
			},
			userAvatar() {
				return this.$store.getters['login/userAvatar'];
            },
            loggedUserId() {
				return this.$store.getters['login/idUser'];
            },
            user() {
				return this.$store.getters['nfPosts/user'];
			}
        },
        methods: {
            inUserDetail() {
				users.get('find?id=' + this.loggedUserId, { headers: { Authorization: 'Bearer ' + this.token } })
                .then(res => {
					// console.log(res);
					const user = res.data.data;
					this.$store.dispatch('nfPosts/changeUser', user);
                })
                .catch(error => {
                    console.log(error);
				});
            },
            inUserUpload() {
				users.get('find?id=' + this.loggedUserId, { headers: { Authorization: 'Bearer ' + this.token } })
                .then(res => {
					const user = res.data.data;
					this.$store.dispatch('nfPosts/changeUser', user);

					// if (this.windowWidth > this.breakpoint) {
					// 	$('.o-homepage').addClass('u-overflow-disabled');
					// 	$('.o-user').addClass('u-overflow-disabled');
					// }
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

    .o-header {
        z-index: 10;
        position: fixed;
        background-color: $white;
        width: 100vw;
        text-align: center;
        padding-top: 0.7rem;

        @include breakpoint(desktop) {
            text-align: initial;
            padding-top: 0;
        }
    }

    .a-prev-arrow {
        float: left;
        margin-top: 0.8rem;
        margin-left: 1rem;
        width: 2.3rem;
        height: 2.3rem;

        @include breakpoint(desktop) {
            display: none;
        }
    }

    .a-home {
        @include breakpoint(desktop) {
            float: left;
            width: 4rem;
            height: 4rem;
            margin-top: 1.8rem;
            margin-left: 5.9rem;
            cursor: pointer;
        }
		
		& .cls-1 {
			fill: $lightblack;
		}

		& .cls-2 {
			fill: $white;
		}

		&.is-active {
			& .cls-2 {
				fill: $lightgreen;
			}
		}
    }
    
    .a-avatar {
        cursor: pointer;

        @include breakpoint(desktop) {
            float: left;
            width: 4rem;
            height: 4rem;
            margin-top: 1.8rem;
            margin-left: 3.5rem;
        }

        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
    }
    
    .a-upload {
        cursor: pointer;
        
        @include breakpoint(desktop) {
            float: left;
            width: 4rem;
            height: 4rem;
            margin-top: 1.8rem;
            margin-left: 3.5rem;
        }
		
		& .cls-1, .cls-4 {
			fill: none;
		}

		& .cls-1 {
			stroke: $lightblack;
			stroke-width: 0.1rem;
		}

		& .cls-2 {
			fill: $lightblack;
		}

		& .cls-3 {
			stroke: none;
		}

		&.is-active {
			& .cls-2 {
				fill: $lightgreen;
			}
		}
	}

    .a-search {
        float: left;
        width: 3rem;
        height: 3rem;
        margin-top: 0.5rem;
        margin-left: 1.5rem;
        border-radius: 50%;
        background-color: $black;

        @include breakpoint(desktop) {
            float: right;
            width: 3.5rem;
            height: 3.5rem;
            margin-top: 2.5rem;
            margin-left: 0;
            margin-right: 13.7rem;
        }

        svg {
            display: block;
            margin: 0 auto;
            fill: $white;
            width: 1.5rem;
            height: 3rem;

            @include breakpoint(desktop) {
                width: 1.75rem;
                height: 3.5rem;
            }
        }
    }

    .a-bulb {
        float: right;
        width: 3rem;
        height: 3rem;
        margin-top: 0.5rem;
        margin-right: 1.5rem;
        border-radius: 50%;
        background-color: $black;

        @include breakpoint(desktop) {
            float: left;
            width: 3.75rem;
            height: 3.75rem;
            margin-top: 1.8rem;
            margin-right: 0;
            margin-left: 3.5rem;
        }

        svg {
            display: block;
            margin: 0 auto;
            fill: $white;
            width: 2rem;
            height: 3rem;

            @include breakpoint(desktop) {
                width: 2.25rem;
                height: 3.5rem;
            }
        }
    }

    .a-hr {
        display: block;
        height: 1px;
        border: 0;
        border-top: 1px solid rgba($darkgrey, .5);
        margin: 0.53rem 0 0 0;
        padding: 0;

        &--terms {
            @include breakpoint(desktop) {
                display: none;
            }
        }
    }
    
    .a-heading {
        font-family: 'HelveticaNeue-Thin', sans-serif;
        @include fontSizeRem(24, 40);
        @include lineHeightRem(29, 48);
        @include letterSpacingEm(15, 0);
        color: $lightblack;
        display: inline-block;
        margin-top: 0.7rem;
        
        @include breakpoint(desktop) {
            font-family: 'HelveticaNeue', sans-serif;
            margin-left: 0;
        }

        &--main {
            font-family: 'HelveticaNeue', sans-serif;
            @include fontSizeRem(26, 55);
            @include lineHeightRem(35, 66);
            @include letterSpacingEm(0, 0);
            text-align: center;
            color: $lightblack;
            display: block;
            padding-right: 4.5rem;

            span {
                font-family: 'HelveticaNeue-Thin', sans-serif;
            }
            
            @include breakpoint(desktop) {
                padding-top: 0.2rem;
                padding-right: 32rem;
                margin-bottom: 1rem;
            }
        }
    }
</style>
