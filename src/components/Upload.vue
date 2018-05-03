<template>
  	<div class="o-upload">
		
		<div class="o-upload__wrapper">
            <h3 class="o-upload__small-heading  u-only-desktop">Upload Photo or Video</h3>
            <form @submit.prevent="submitPost">
                <div class="o-upload__media-container" @dragover.prevent @drop.stop.prevent="onFileSelected($event)">
                    <input type="file"
                        style="display: none"
                        @change="onFileSelected"
                        @blur="$v.selectedFile.$touch()"
                        ref="fileInput">
                    <div class="o-upload__icon">
                        <icon class="icon" name="cloud-upload"></icon>
                        <span class="u-only-desktop">drag and drop</span>
                    </div>
                    <img class="o-upload__image" src="#" alt="image to upload">
                    <video class="o-upload__video" controls></video>
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
    import { basicVars } from '../mixins';
    import { mapState } from 'vuex';
    
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
		computed:
            mapState({
                token: state => state.login.idToken,
                loggedUserId: state => state.login.idUser
			}),
		methods: {
			onFileSelected(e) {
                if (e.type === 'change') {
                    var input = e.target;
                    this.selectedFile = e.target.files[0];
                } else if (e.type === 'drop') {
                    var input = e.dataTransfer;
                    this.selectedFile = e.dataTransfer.files['0'];
                }

                if ( input.files && (input.files[0] || input.files['0']) ) {
                    const reader = new FileReader();
                    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
                    const validVideoTypes = ['video/mp4', 'video/flv', 'video/wmv', 'video/avi', 'video/mpeg', 'video/qt'];

                    if ($.inArray(this.selectedFile.type, validImageTypes) >= 0) {
                        reader.onload = function(e) {
                            $('.o-upload__icon').hide(0);
                            $('.o-upload__video').hide(0);
                            $('.o-upload__image')
                                .attr('src', e.target.result)
                                .show(0);
                        };
                    } else if ($.inArray(this.selectedFile.type, validVideoTypes) >= 0) {
                        reader.onload = function(e) {
                            $('.o-upload__icon').hide(0);
                            $('.o-upload__image').hide(0);
                            $('.o-upload__video')
                                .attr('src', e.target.result)
                                .show(0);
                        };
                    }
                    reader.readAsDataURL(input.files[0]);
                } else {
                    $('.o-upload__video').hide(0);
                    $('.o-upload__image').hide(0);
                    $('.o-upload__icon').show(0);
                }
            },
            submitPost() {
                const postData = new FormData();
                const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
                const validVideoTypes = ['video/mp4', 'video/flv', 'video/wmv', 'video/avi', 'video/mpeg', 'video/qt'];
                if ($.inArray(this.selectedFile.type, validImageTypes) >= 0) {
                    postData.append('image', this.selectedFile);
                } else if ($.inArray(this.selectedFile.type, validVideoTypes) >= 0) {
                    postData.append('video', this.selectedFile);
                }
                postData.append('description', this.description);
                this.$store.dispatch('nfPosts/postPost', postData)
                    .then(res => {
                        this.description = '';
                        this.$store.dispatch('nfPosts/pushNewsFeedPostsAll', []);
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
        height: 100%;
        
        @include breakpoint(desktop) {
            z-index: 9;
            position: fixed;
            top: 0;
            left: 0;
            background-color: rgba($lightblack, .9);
        }

        &__small-heading {
            font-family: 'HelveticaNeue-Thin', sans-serif;
            @include fontSizeRem(0, 26);
            @include lineHeightRem(0, 32);
            text-align: center;
            color: $white;
        }

		&__wrapper {
            @include breakpoint(desktop) {
                position: absolute;
                width: 50rem;
				height: auto;
				margin-bottom: 0;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
        }
        
        &__media-container {
            position: relative;
            background-color: $lightblack;
            width: 100%;
            height: 32rem;
            margin-top: 3.3rem;

            @include breakpoint(desktop) {
                background-color: $white;
                height: 50rem;
                margin-top: 5vh;
            }
        }

        &__image {
            display: none;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        &__video {
            display: none;
            width: 100%;
            height: 100%;
            object-fit: fill;
        }

        &__icon {
            background: none;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 4.4rem;
            height: 4.4rem;

            @include breakpoint(desktop) {
                width: 6.4rem;
                height: 6.4rem;
            }

            svg {
                fill: $white;
                width: 100%;
                height: 100%;

                @include breakpoint(desktop) {
                    fill: $lightblack;
                }
            }

            span {
                font-family: 'HelveticaNeue-Thin', sans-serif;
                @include fontSizeRem(0, 16);
                @include lineHeightRem(0, 18);
                text-align: center;
                color: $lightblack;
                opacity: .5;
                position: absolute;
                display: block;
                width: 50rem;
                left: 50%;
                transform: translateX(-50%);
            }
        }

        &__upload-button {
            text-align: center;
            margin-top: 1.7rem;
            margin-bottom: 9.5rem;

            @include breakpoint(desktop) {
                margin-top: 1.7vh;
                margin-bottom: 8.8vh;
            }

            button {
                background-color: $lightblack;
                font-family: 'Roboto', sans-serif;
                @include fontSizeRem(10, 20);
                @include lineHeightRem(12, 24);
                color: $white;
                padding: .5rem 1.4rem;
                border-radius: 30px;
                cursor: pointer;

                @include breakpoint(desktop) {
                    background-color: $white;
                    color: $lightblack;
                }
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

            @include breakpoint(desktop) {
                bottom: 2vh;
            }
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
