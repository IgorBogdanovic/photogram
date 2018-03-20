<template>
  	<div class="o-edit-profile">
		
		<div class="o-edit-profile__wrapper">
            <form>
                <div class="o-edit-profile__image-container">
                    <input type="file"
                        style="display: none"
                        ref="fileInput">
                    <img class="o-edit-profile__image" :src="storage + userProfile.regular" alt="user profile image">
                </div>

                <div class="o-edit-profile__change-photo">
                    <button type="button">Change Photo</button>
                </div>

                <div class="o-edit-profile__form-field  o-edit-profile__form-field--full-name">
                    <input type="text"
                        placeholder="Full Name"
                        class="c-form-input">
                </div>

                <div class="o-edit-profile__form-field  o-edit-profile__form-field--user-name">
                    <input type="text"
                        placeholder="User Name"
                        class="c-form-input">
                </div>

                <div class="o-edit-profile__form-field  o-edit-profile__form-field--about">
                    <input type="text"
                        placeholder="Something about you"
                        class="c-form-input">
                </div>

                <div class="o-edit-profile__form-field  o-edit-profile__form-field--priv-info">
                    <span>Private Information</span>
                </div>

                <div class="o-edit-profile__form-field  o-edit-profile__form-field--email">
                    <input type="text"
                        placeholder="Email"
                        class="c-form-input">
                </div>

                <div class="o-edit-profile__form-field  o-edit-profile__form-field--phone">
                    <input type="text"
                        placeholder="Phone Number"
                        class="c-form-input">
                </div>

                <div class="o-edit-profile__form-field  o-edit-profile__form-field--full-name">
                    <select class="c-form-input">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="" disabled selected>Gender</option>
                    </select>
                </div>

                <div class="o-edit-profile__save">
                    <button type="submit">Save</button>
                </div>
            </form>
		</div>

	</div>
</template>

<script>
    import { required } from 'vuelidate/lib/validators';
    import { mixinStorage } from '../mixins'
    
    export default {
        mixins: [ mixinStorage ],
        computed: {
			token() {
				return this.$store.getters['login/token'];
			},
			userProfile() {
				return this.$store.getters['login/userProfile'];
			}
		},
        created() {
            if (this.windowWidth > this.breakpoint) {
                this.$store.dispatch('headings/actSetHeading', 'photogram');
            } else this.$store.dispatch('headings/actSetHeading', 'Edit Profile');
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

        &__image-container {
            width: 8.7rem;
            height: 8.7rem;
            margin: 2.1rem auto;
        }

        &__change-photo {
            text-align: center;
            margin-bottom: 4.1rem;
        }

        &__form-field {
            border-bottom: .1rem solid $lightblack;
            width: 65%;
            padding-bottom: .5rem;
            margin: auto auto;

            &:not(:nth-last-child(2)) {
                margin-bottom: 4.75rem;
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
        }
    }
</style>
