<template>
  	<div class="o-edit-profile">
		
		<div class="o-edit-profile__wrapper">
            <h3 class="o-edit-profile__small-heading  u-only-desktop">Edit Profile</h3>
            <form @submit.prevent="submitChanges">
                <div class="o-edit-profile__image-container">
                    <input type="file"
                        style="display: none"
                        @change="onFileSelected"
                        @blur="$v.selectedFile.$touch()"
                        ref="fileInput">
                    <img v-if="windowWidth > breakpoint" class="o-edit-profile__image" :src="storage + userProfile.large" alt="user profile image">
                    <img v-else class="o-edit-profile__image" :src="storage + userProfile.regular" alt="user profile image">
                </div>

                <div class="o-edit-profile__change-photo">
                    <button type="button" @click="$refs.fileInput.click()">Change Photo</button>
                </div>

                <div class="o-edit-profile__form-field  o-edit-profile__form-field--full-name">
                    <input type="text"
                        placeholder="Full Name"
                        v-model="fullname"
			            @blur="$v.fullname.$touch()"
                        class="c-form-input">
                </div>

                <div class="o-edit-profile__form-field  o-edit-profile__form-field--user-name">
                    <input type="text"
                        placeholder="User Name"
                        v-model="username"
			            @blur="$v.username.$touch()"
                        class="c-form-input">
                </div>

                <div class="o-edit-profile__form-field  o-edit-profile__form-field--about">
                    <input type="text"
                        placeholder="Something about you"
                        v-model="about"
                        class="c-form-input">
                </div>

                <div class="o-edit-profile__form-field  o-edit-profile__form-field--priv-info">
                    <span>Private Information</span>
                </div>

                <!-- <div class="o-edit-profile__form-field  o-edit-profile__form-field--email">
                    <input type="text"
                        placeholder="Email"
                        v-model="email"
			            @blur="$v.email.$touch()"
                        class="c-form-input">
                </div> -->

                <div class="o-edit-profile__form-field  o-edit-profile__form-field--phone">
                    <input type="text"
                        placeholder="Phone Number"
                        v-model="phone"
			            @blur="$v.phone.$touch()"
                        class="c-form-input">
                </div>

                <div class="o-edit-profile__form-field  o-edit-profile__form-field--full-name">
                    <select class="c-form-input"
                        v-model="gender"
			            @blur="$v.gender.$touch()">
                        <option value="1">Male</option>
                        <option value="2">Female</option>
                        <option value="3">Other</option>
                    </select>
                </div>

                <div class="o-edit-profile__save">
                    <button type="submit" :disabled="$v.$invalid || !isImg">Save</button>
                </div>
            </form>
		</div>

	</div>
</template>

<script>
    import { users } from '../axios-urls';
    import { required, minLength, numeric } from 'vuelidate/lib/validators';
    import { mixinStorage, basicVars } from '../mixins';
    import { store } from '../store/store';
    import { mapState } from 'vuex';

    // used in username validation exception
    const userName = store.state.nfPosts.username;
    
    export default {
        mixins: [ mixinStorage, basicVars ],
        data () {
		    return {
                selectedFile: null,
                isImg: true,
                fullname: '',
                username: '',
                about: '',
                // email: '',
                phone: '',
                gender: 0
		    }
        },
        validations: {
			selectedFile: {
                required
            },
            fullname: {
		    	required
            },
            username: {
                required,
                minLen: minLength(3),
				unique: val => {
					if(val === userName || val === '') return true;
					return users.get('exists?username=' + val + '')
						.then(res => {
							return !res.data.data.exists;
						});
				}
            },
            phone: {
		    	numeric
            },
            gender: {
		    	required
		    }
        },
        computed:
            mapState({
                token: state => state.login.idToken,
                loggedUserId: state => state.login.idUser,
                userProfile: state => state.login.userProfile,
                user: state => state.nfPosts.user
			}),
        watch: {
            selectedFile: function(file) {
                if (file.type) {
                    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
                    if ($.inArray(file.type, validImageTypes) < 0) {
                        return this.isImg = false;
                    } else return this.isImg = true;
                }
            }
        },
        methods: {
			onFileSelected(e) {
                const input = e.target;
                this.selectedFile = e.target.files[0];

                if (input.files && input.files[0]) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        $('.o-edit-profile__image').attr('src', e.target.result);
                    };
                    reader.readAsDataURL(input.files[0]);
                }
            },
            submitChanges() {
                users.patch('auth/update', {
                    name: this.fullname,
                    username: this.username,
                    about: this.about,
                    phone: this.phone,
                    gender_id: this.gender
                }, { headers: { Authorization: 'Bearer ' + this.token } })
                    .then(res => {
                        // console.log(res);
                        const user = res.data.data;
                        this.$store.dispatch('nfPosts/changeUser', user);
                        
                        if (this.selectedFile.type) {
                            const postData = new FormData();
                            postData.append('image', this.selectedFile);
                            users.post('auth/image', postData, { headers: { Authorization: 'Bearer ' + this.token } })
                                .then(res => {
                                    // console.log(res);
                                    const data = {
                                        avatar: res.data.data.image.avatar,
                                        profile: {
                                            regular: res.data.data.image.profile,
                                            large: res.data.data.image.profile_large
                                        }
                                    }
                                    this.$store.dispatch('login/editUser', data);
                                    this.$router.push({ name: 'user', params: { userId: this.loggedUserId } });
                                })
                                .catch(error => {
                                    console.log(error);
                                });
                        } else this.$router.push({ name: 'user', params: { userId: this.loggedUserId } });
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },
        created() {
            // console.log(this.user);
            if (this.windowWidth > this.breakpoint) {
                this.$store.dispatch('headings/actSetHeading', 'photogram');
            } else this.$store.dispatch('headings/actSetHeading', 'Edit Profile');
            this.selectedFile = this.userProfile.large;
            this.fullname = this.user.name;
            this.username = this.user.username;
            this.about = this.user.about;
            this.email = this.user.email;
            this.phone = this.user.phone;
            this.gender = this.user.gender_id;
        }
	}
</script>

<style lang="scss" scoped>
	@import '../scss/settings';

    .o-edit-profile {

        &__wrapper {
            overflow: hidden;
            padding-top: 4.76rem;
            padding-bottom: 4.2rem;

            @include breakpoint(desktop) {
				width: 148rem;
				margin: 0 auto;
				padding-top: 10.2rem;
			}

            button {
                background-color: $lightblack;
                font-family: 'Roboto', sans-serif;
                @include fontSizeRem(10, 20);
                @include lineHeightRem(12, 24);
                color: $white;
                padding: .5rem .9rem;
                border-radius: 30px;
                cursor: pointer;
            }
        }

        &__small-heading {
            font-family: 'HelveticaNeue-Thin', sans-serif;
            @include fontSizeRem(0, 26);
            @include lineHeightRem(0, 32);
            text-align: center;
            color: $lightblack;
        }

        &__image-container {
            width: 8.7rem;
            height: 8.7rem;
            margin: 2.1rem auto;

            @include breakpoint(desktop) {
                width: 22rem;
                height: 22rem;
            }
        }

        &__image {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            object-fit: cover;
        }

        &__change-photo {
            text-align: center;
            margin-bottom: 4.1rem;

            @include breakpoint(desktop) {
				margin-bottom: 7.2rem;
			}
        }

        &__form-field {
            border-bottom: .1rem solid $lightblack;
            width: 65%;
            padding-bottom: .5rem;
            margin: auto auto;

            @include breakpoint(desktop) {
				width: 40%;
			}

            &:not(:nth-last-child(2)) {
                margin-bottom: 4.75rem;

                @include breakpoint(desktop) {
                    margin-bottom: 4.3rem;
                }
            }

            .c-form-input {
                width: 100%;
            }

            &--priv-info {
                span {
                    font-family: 'Roboto-Bold', sans-serif;
                    @include fontSizeRem(14, 20);
                    @include lineHeightRem(17, 24);
                }
            }
        }

        &__save {
            text-align: center;
            margin-top: 4rem;
            margin-bottom: 2rem;

            button {
                &[disabled],
                &[disabled]:hover,
                &[disabled]:active {
                    cursor: not-allowed;
                    background-color: $gray;
                }
            }
        }
    }
</style>
