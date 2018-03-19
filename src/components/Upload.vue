<template>
  	<div class="o-upload">
		
		<div class="o-upload__wrapper">
            <form @submit.prevent="submitPost">
                <div class="o-upload__image-container">
                    <input type="file"
                        style="display: none"
                        @change="onFileSelected"
                        @blur="$v.selectedFile.$touch()"
                        ref="fileInput">
                    <div class="o-upload__icon">
                        <icon class="icon" name="cloud-upload"></icon>
                    </div>
                    <img class="o-upload__image" src="#" alt="image to upload">
                </div>

                <div class="o-upload__upload-button">
                    <button type="button" @click="$refs.fileInput.click()">Upload</button>
                </div>

                <div class="o-upload__description">
                    <input type="text"
                        placeholder="Add Description"
                        v-model="description"
                        class="o-upload__description-input">

                    <button type="submit" :disabled="$v.$invalid" class="o-upload__submit">
                        <icon class="icon" name="check-circle"></icon>
                    </button>
                </div>
            </form>
		</div>

	</div>
</template>

<script>
    import { required } from 'vuelidate/lib/validators';
    import { basicVars } from '../mixins'
    
    export default {
        mixins: [ basicVars ],
	  	data () {
		    return {
                selectedFile: null,
                description: ''
		    }
        },
        validations: {
			selectedFile: {
				required
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
			onFileSelected(e) {
                const input = e.target;
                this.selectedFile = e.target.files[0];
                if (input.files && input.files[0]) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        $('.o-upload__image')
                            .attr('src', e.target.result)
                            .show(0);
                        $('.o-upload__icon').hide(0);
                    };
                    reader.readAsDataURL(input.files[0]);
                } else {
                    $('.o-upload__image').hide(0);
                    $('.o-upload__icon').show(0);
                }
            },
            submitPost() {
                const postData = new FormData();
                postData.append('image', this.selectedFile);
                postData.append('description', this.description);
                this.$store.dispatch('nfPosts/postPost', postData)
                    .then(res => {
                        this.description = '';
                        this.$router.push({ name: 'user', params: { userId: this.loggedUserId } });
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },
        created() {
            if (this.windowWidth > this.breakpoint) {
                this.$store.dispatch('headings/actSetHeading', 'photogram');
			} else this.$store.dispatch('headings/actSetHeading', 'Upload');
        }
	}
</script>

<style lang="scss" scoped>
	@import '../scss/settings';

    .o-upload {
		width: 100%;

		// &__wrapper {
		// 	padding-top: 4.76rem;
		// 	padding-bottom: 4.2rem;

		// 	@include breakpoint(desktop) {
		// 		width: 148rem;
		// 		margin: 0 auto;
		// 		padding-top: 13.7rem;
		// 	}
        // }
        
        &__image-container {
            position: relative;
            background-color: $lightblack;
            width: 100%;
            height: 32rem;
            margin-top: 3.3rem;
        }

        &__image {
            display: none;
            width: 100%;
            height: 100%;
        }

        &__icon {
            background: none;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 4.4rem;
            height: 4.4rem;

            svg {
                fill: $white;
                width: 100%;
                height: 100%;
            }
        }

        &__upload-button {
            text-align: center;
            margin-top: 1.7rem;
            margin-bottom: 9.5rem;

            button {
                background-color: $lightblack;
                font-family: 'Roboto', sans-serif;
                @include fontSizeRem(10, 20);
                @include lineHeightRem(12, 24);
                color: $white;
                padding: .5rem 1.4rem;
                border-radius: 30px;
                cursor: pointer;
            }
        }

        &__description {
            position: fixed;
            bottom: 4.1rem;
            left: 0;
            width: 100%;
            padding: 1rem;
            background-color: $white;
            border-top: 1px solid rgba($darkgrey, .5);
        }

        &__description-input {
            font-family: 'Roboto', sans-serif;
            @include fontSizeRem(16, 16);
            @include lineHeightRem(19, 19);
            width: 85%;
            border: none;
        }

        &__submit {
            position: absolute;
            top: 50%;
            right: 1rem;
            transform: translateY(-50%);
            width: 3.5rem;
            height: 3.5rem;
            background-color: transparent;
            cursor: pointer;

            svg {
                width: 100%;
                height: 100%;
            }

            &[disabled],
            &[disabled]:hover,
            &[disabled]:active {
                cursor: not-allowed;
                
                svg {
                    fill: $gray;
                }
            }
        }
	}
</style>
