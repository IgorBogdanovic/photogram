<template>
  	<div class="o-footer  u-only-mobile">
		
		<router-link :to="{ name: 'homepage' }" tag="div" class="o-footer__home  a-home" :class="{ 'is-active': isHomeActive }" @click.native="goHome">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="2700 1481 29 29">
			<g id="Group_132" data-name="Group 132" transform="translate(-267 487)">
				<ellipse id="Ellipse_18" data-name="Ellipse 18" class="cls-1" cx="14.5" cy="14.5" rx="14.5" ry="14.5" transform="translate(2967 994)"/>
				<rect id="Rectangle_119" data-name="Rectangle 119" class="cls-2" width="13" height="11" transform="translate(2975 1003)"/>
				<rect id="Rectangle_120" data-name="Rectangle 120" class="cls-1" width="3" height="5" transform="translate(2980 1010)"/>
			</g>
			</svg>
		</router-link>

		<router-link :to="{ name: 'user', params: { userId: loggedUserId } }" tag="div"
			class="o-footer__avatar  a-avatar" @click.native="inUserDetail">
			<img :src="storage + userAvatar" alt="logged user avatar">
		</router-link>

		<router-link :to="{ name: 'upload', params: { userId: loggedUserId } }" tag="div"
		class="o-footer__upload  a-upload" :class="{ 'is-active': isUploadActive }"  @click.native="inUserUpload">
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
                return this.heading === 'photogram' && this.$route.name === 'homepage';
			},
			isUploadActive() {
                return this.$route.name === 'upload';
			},
			user() {
				return this.$store.getters['nfPosts/user'];
			},
			userAvatar() {
				return this.$store.getters['login/userAvatar'];
			},
			loggedUserId() {
				return this.$store.getters['login/idUser'];
			},
			postDetail() {
				return this.$store.getters['nfPosts/postDetail'];
			},
			allComments() {
				return this.$store.getters['nfPosts/allComments'];
            },
            allCommentsPostDetail() {
				return this.$store.getters['nfPosts/allCommentsPostDetail'];
            },
            upload() {
				return this.$store.getters['nfPosts/upload'];
			},
			infScrollDisable() {
				return this.$store.getters['nfPosts/infScrollDisable'];
			},
			newsFeedPostsAll() {
				return this.$store.getters['nfPosts/newsFeedPostsAll'];
			}
		},
		methods: {
			goHome() {
                if (this.postDetail && !this.allComments) {
                    this.$store.dispatch('nfPosts/changePostDetail');
                } else if (this.allComments) {
                    this.$store.dispatch('nfPosts/pushPostCommentsAll', []);
                    this.$store.dispatch('nfPosts/changeAllComments');
                    if (this.allCommentsPostDetail) {
                        this.$store.dispatch('nfPosts/changePostDetail');
                        this.$store.dispatch('nfPosts/changeAllCommentsPostDetail');
                        this.$store.dispatch('nfPosts/changeInfScrollDisable'); // to false so it can be again true on dispatch after
                    }
                } else if (this.upload) {
                    this.$store.dispatch('nfPosts/changeUpload');
                }

                this.$store.dispatch('nfPosts/changeInfScrollDisable');
                this.$store.dispatch('headings/actSetHeading', 'photogram');
                if (this.windowWidth > this.breakpoint) {
                    $('.o-homepage').removeClass('u-overflow-disabled');
                    $('.o-user').removeClass('u-overflow-disabled');
				}
            },
            inUserDetail() {
				users.get('find?id=' + this.loggedUserId, { headers: { Authorization: 'Bearer ' + this.token } })
                .then(res => {
					// console.log(res);
					const user = res.data.data;
					this.$store.dispatch('nfPosts/changeUser', user);

					if (this.postDetail && !this.allComments) {
						this.$store.dispatch('nfPosts/changePostDetail');
					} else if (this.allComments) {
						this.$store.dispatch('nfPosts/pushPostCommentsAll', []);
						this.$store.dispatch('nfPosts/changeAllComments');
						if (this.allCommentsPostDetail) {
							this.$store.dispatch('nfPosts/changePostDetail');
							this.$store.dispatch('nfPosts/changeAllCommentsPostDetail');
						}
					} else if (this.upload) {
						this.$store.dispatch('nfPosts/changeUpload');
					}

					if (this.windowWidth > this.breakpoint) {
						this.$store.dispatch('headings/actSetHeading', 'photogram');
					} else this.$store.dispatch('headings/actSetHeading', this.user.username);

					// console.log(this.newsFeedPostsAll);
                })
                .catch(error => {
                    console.log(error);
				});
			},
			inUserUpload() {
				this.$store.dispatch('nfPosts/changeUpload');
				if (this.windowWidth > this.breakpoint) {
					$('.o-homepage').addClass('u-overflow-disabled');
					$('.o-user').addClass('u-overflow-disabled');
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../scss/settings';

    .o-footer {
        z-index: 10;
		position: fixed;
		bottom: 0;
        background-color: $white;
		width: 100vw;
		padding-bottom: 0.6rem;
		border-top: 1px solid rgba($darkgrey, .5);
	}

	.a-home {
		float: left;
		width: 2.9rem;
		height: 2.9rem;
		margin-top: 0.6rem;
		margin-left: 1.5rem;
		
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

	.a-upload {
		width: 2.9rem;
		height: 2.9rem;
		margin: 0.6rem auto auto auto;
		cursor: pointer;
		
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

	.a-avatar {
		float: right;
		width: 2.9rem;
		height: 2.9rem;
		background-color: burlywood;
		border-radius: 50%;
		margin-top: 0.6rem;
		margin-right: 1.5rem;
		cursor: pointer;
		
		img {
			width: 100%;
		}
	}
</style>
