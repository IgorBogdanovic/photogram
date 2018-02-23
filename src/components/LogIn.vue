<template>
  	<div class="o-login">

	  	<div class="o-login__wrapper">
	  		<h1 class="o-login__heading  c-heading-start">photo<span>gram</span></h1>

		    <div class="o-login__form">
		      	<form @submit.prevent="loginSubmit">
			        <div class="o-login__form-field">
			        	<div class="o-login__form-field-icon  c-form-field-icon">
			        		<icon class="icon" name="user-o"></icon>
			        	</div>
			            <input type="text"
			            	v-model="user"
			                placeholder="Email/Username"
							class="c-form-input">
			        </div>
			        <div class="o-login__form-field">
			        	<div class="o-login__form-field-icon  c-form-field-icon">
			        		<icon class="icon" name="lock"></icon>
			        	</div>
			            <input type="password"
			            	v-model="password"
			                placeholder="Password"
							class="c-form-input">
			        </div>
			        <div class="o-login__msg  c-form-msg">
			        	<p v-if="error">Invalid username/email or password</p>
			        </div>
					<!-- need route path once made -->
		        	<router-link to="/" tag="span" class="o-login__forgot-password">Forgot Password?</router-link>
			        <div class="o-login__submit">
		       			<button type="submit" class="c-form-btn">Log In</button>
		        	</div>
		        	<p class="o-login__signup-link">Don't have account? <router-link :to="{ name: 'signup' }" tag="span">Sign Up</router-link></p>
		        </form>
		  	</div>
	  	</div>

  	</div>
</template>

<script>
	export default {
	  	data () {
		    return {
		    	user: 'igor',
	        	password: '1'
		    }
		},
	  	computed: {
	  		error() {
	  			return this.$store.getters['login/error'];
			}
        },
	  	methods: {
		    loginSubmit() {
		        const loginData = {
					email: this.user,
					password: this.password,
		        };
		        this.$store.dispatch('login/login', loginData);
		    }
		},
		beforeCreate() {
            this.$store.dispatch('headings/actSetHeading', 'photogram');
        }
	}
</script>

<style lang="scss" scoped>
	@import '../scss/settings';

	.o-login {
		background: linear-gradient(to bottom, rgba($black, 0.4), rgba($black, 0.2)), url('../assets/img/background.jpg') no-repeat center center fixed;
		-webkit-background-size: cover;
		-moz-background-size: cover;
		-o-background-size: cover;
		background-size: cover;
		position: relative;
		width: 100%;
		height: 100vh;

		&__wrapper {
			position: absolute;
			width: 20.7rem;
			top: 51.5%;
			left: 50%;
			transform: translate(-50%, -50%);

			@include breakpoint(desktop) {
				width: 38.4rem;
				top: 50.5vh;
			}
		}

		&__heading {
			color: $white-sec;
		}

		&__form {
			font-family: 'Roboto', sans-serif;
		    margin-top: 17.4vh;

		    @include breakpoint(desktop) {
				width: 93%;
				margin: 0 auto;
				margin-top: 23vh;
			}

			&-field {
				border-bottom: 1px solid lightgray;
				padding-bottom: 0.5rem;

				&:first-child {
					margin-bottom: 4.8rem;

					@include breakpoint(desktop) {
						margin-bottom: 7rem;
					}
				}

				& .c-form-input {
					color: $white;
				}

				::placeholder {
					color: lightgray;
					opacity: 1;
				}

				:-ms-input-placeholder {
					color: lightgray;
				}

				::-ms-input-placeholder {
					color: lightgray;
				}

				&-icon {
					svg {
				    	fill: $white;
				    }
				}
			}
		}

		&__msg {
			margin-top: 0.6rem;
			margin-bottom: 0.8rem;

			@include breakpoint(desktop) {
				margin-top: 0.8rem;
				margin-bottom: 3.2rem;
			}
		}

		&__forgot-password {
			@include fontSizeRem(10, 16);
			@include lineHeightRem(12, 18);
			color: $white;
			display: block;
			margin-top: 1.2rem;
			margin-left: 0.3rem;
		}

		&__submit {
			margin-top: 18.2vh;
			text-align: center;

			@include breakpoint(desktop) {
				margin-top: 20.3vh;
			}
		}

		&__signup-link {
			@include fontSizeRem(10, 20);
			@include lineHeightRem(12, 24);
			color: $white;
			text-align: center;
			margin-top: 3.4vh;

			@include breakpoint(desktop) {
				margin-top: 3vh;
				margin-bottom: 0.7rem;
			}

			span {
				color: $lightgreen;
				text-transform: uppercase;
				cursor: pointer;
			}
		}
	}
</style>
