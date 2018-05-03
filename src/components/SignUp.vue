<template>
  	<div class="o-signup">

	  	<div class="o-signup__wrapper">
	  		<h1 class="o-signup__heading  c-heading-start">photo<span>gram</span></h1>

		    <div class="o-signup__form">
		      	<form @submit.prevent="signupSubmit">
			        <div class="o-signup__form-field" :class="{ 'is-invalid': $v.email.$error }">
			        	<div class="o-signup__form-field-icon  c-form-field-icon">
			        		<icon class="icon" name="envelope-o"></icon>
			        	</div>
			            <input type="text"
			                placeholder="Email"
			                v-model="email"
			                @blur="$v.email.$touch()"
							class="c-form-input">
			        </div>
			        <div class="o-signup__msg  c-form-msg">
			        	<p v-if="$v.email.$error">Please, enter a valid email</p>
			        	<p v-if="serverError">{{ serverError }}</p>
			        </div>
			        <div class="o-signup__form-field" :class="{ 'is-invalid': $v.password.$error }">
			        	<div class="o-signup__form-field-icon  c-form-field-icon">
			        		<icon class="icon" name="lock"></icon>
			        	</div>
			            <input type="password"
			                placeholder="Password"
			                v-model="password"
			                @blur="$v.password.$touch()"
							class="c-form-input">
			        </div>
		        	<div class="o-signup__msg  c-form-msg">
			        	<p v-if="$v.password.$error">Password must contain minimim six characters</p>
			        </div>
		        	<div class="o-signup__form-field" :class="{ 'is-invalid': $v.confirmPassword.$error }">
			        	<div class="o-signup__form-field-icon  c-form-field-icon">
			        		<icon class="icon" name="lock"></icon>
			        	</div>
			            <input type="password"
			                placeholder="Confirm Password"
			                v-model="confirmPassword"
			                @blur="$v.confirmPassword.$touch()"
							class="c-form-input">
			        </div>
		        	<div class="o-signup__msg  c-form-msg">
			        	<p v-if="$v.confirmPassword.$error">This doesn't match with your password</p>
			        </div>
			        <div class="o-signup__form-field  o-signup__form-field--full-name  u-only-desktop" :class="{ 'is-invalid': $v.fullname.$error }">
			        	<div class="o-signup__form-field-icon  c-form-field-icon">
			        		<icon class="icon" name="user-o"></icon>
			        	</div>
			            <input type="text"
			                placeholder="Fullname"
			                v-model="fullname"
			                @blur="$v.fullname.$touch()"
							class="c-form-input">
			        </div>
		        	<div class="o-signup__form-field" :class="{ 'is-invalid': $v.username.$error }">
			        	<div class="o-signup__form-field-icon  c-form-field-icon">
			        		<icon class="icon" name="user-o"></icon>
			        	</div>
			            <input type="text"
			                placeholder="Username"
			                v-model="username"
			                @blur="$v.username.$touch()"
							class="c-form-input">
			        </div>
			        <div class="o-signup__msg  c-form-msg">
			        	<p v-if="$v.username.$invalid && $v.username.$error && $v.username.unique">Username must contain minimim three characters</p>
			        	<p v-if="$v.username.$error && !$v.username.unique">This username already exists</p>
			        </div>
			        <p class="o-signup__policy">I accept to the <router-link :to="{ name: 'terms' }" tag="span">Terms & Privacy Policy</router-link></p>
			        <div class="o-signup__msg  o-signup__msg--check-all  c-form-msg">
			        	<p v-show="$v.email.$error || $v.password.$error || $v.confirmPassword.$error || $v.username.$error">
			        	Please, fill all fields before submit Please, fill all fields before submit</p>
						<p v-show="serverSuccess">{{ serverSuccess }}</p>
			        </div>
			        <div class="o-signup__submit">
		       			<button type="submit" :disabled="$v.$invalid" class="c-form-btn">Sign Up</button>
		        	</div>
		        	<p class="o-signup__login-link">Already have account? <router-link :to="{ name: 'login' }" tag="span">Log In</router-link></p>
		        	<div class="o-signup__checkbox">
		        		<input type="checkbox"
		        			v-model="robotCheck"
		        			@change="$v.robotCheck.$touch()"><span>I'm not a robot</span>
		        	</div>
		        </form>
		  	</div>
	  	</div>

  	</div>
</template>

<script>
	import { users } from '../axios-urls';
	import { required, email, minLength, sameAs } from 'vuelidate/lib/validators';
	import { mapState } from 'vuex';

	export default {
	  	data () {
		    return {
		    	email: '',
	        	password: '',
	        	confirmPassword: '',
	        	fullname: '',
	        	username: '',
				robotCheck: ''
		    }
		},
		validations: {
			email: {
				required,
				email
			},
			password: {
				required,
				minLen: minLength(6)
			},
			confirmPassword: {
		        sameAs: sameAs('password')
		    },
		    fullname: {
		    	required
		    },
		    username: {
				required,
				minLen: minLength(3),
				unique: val => {
					if(val === '') return true;
					return users.get('exists?username=' + val + '')
						.then(res => {
							return !res.data.data.exists;
						});
				}
			},
			robotCheck: {
				required
			}
		},
		computed:
			mapState({
                serverError: state => state.signup.error,
				serverSuccess(state) {
					const serverMsg = state.signup.success;
					if (serverMsg === "Resource created") {
						return 'Please, verify your account via mail that is sent on your email address.';
					} else return false;
				}
			}),
		methods: {
		    signupSubmit() {
		        const signupData = {
					email: this.email,
					password: this.password,
					password_confirmation: this.confirmPassword,
					name: this.fullname,
					username: this.username
		        };
		        this.$store.dispatch('signup/signup', signupData);
		    }
		},
		beforeCreate() {
            this.$store.dispatch('headings/actSetHeading', 'photogram');
        }
	}
</script>

<style lang="scss" scoped>
	@import '../scss/settings';

	.o-signup {
		background-color: $white;
		position: relative;
		width: 100%;
		height: 100vh;

		&__wrapper {
			position: absolute;
			width: 20.7rem;
			top: 53%;
			left: 50%;
			transform: translate(-50%, -50%);

			@include breakpoint(desktop) {
				top: 51.5vh;
				width: 38.4rem;
			}
		}

		&__heading {
			color: $lightblack;
		}

		&__form {
			font-family: 'Roboto', sans-serif;
		    margin-top: 5.2vh;

		    @include breakpoint(desktop) {
				width: 93%;
				margin: 0 auto;
				margin-top: 11vh;
			}

			&-field {
				border-bottom: 1px solid $lightblack;
				padding-bottom: 0.5rem;

				&--full-name {
					margin-bottom: 2rem;
				}

				&.is-invalid {
				    border-bottom: 1px solid $red;
				    background-color: #ff9074;

				    svg {
				    	fill: $red;
				    }
				}

				&-icon {
					display: inline-block;
				    width: 1.7rem;
				    height: 1.7rem;
				    margin-right: 1rem;

				    @include breakpoint(desktop) {
						width: 2.3rem;
					    height: 2.5rem;
					    margin-right: 1.5rem;
					}

				    svg {
				    	fill: $black;
						width: 100%;
						height: 100%;
				    }
				}
			}

			& .c-form-input {
    			color: $lightblack;

    			&[type="checkbox"] {
					width: auto;
    				vertical-align: baseline;
    			}
			}

			::placeholder {
			    color: $lightblack;
			    opacity: 1;
			}

			:-ms-input-placeholder {
			   color: $lightblack;
			}

			::-ms-input-placeholder {
			   color: $lightblack;
			}
		}

		&__msg {
			margin-top: 0.8rem;
			margin-bottom: 2.6rem;

			@include breakpoint(desktop) {
				margin-top: 0.8rem;
				margin-bottom: 3.7vh;
			}

			&--check-all {
				margin-top: 1rem;
				margin-bottom: 2.5rem;
				margin-left: 0.3rem;
				
				& p:last-child {
					color: $green;
				}

				@include breakpoint(desktop) {
					margin-top: 5.7vh;
				}
			}
		}

		&__policy {
			@include fontSizeRem(10, 16);
			@include lineHeightRem(12, 19);
			color: $lightblack;
			display: block;
			margin-top: 1.1rem;
			margin-left: 0.3rem;

			@include breakpoint(desktop) {
				margin-top: 3.1rem;
			}

			span {
				color: $lightgreen;
				cursor: pointer;
			}
		}

		&__submit {
			text-align: center;
			margin-top: 0.5rem;

			@include breakpoint(desktop) {
				margin-top: 1rem;
			}

			& .c-form-btn {
				&[disabled],
				&[disabled]:hover,
				&[disabled]:active {
					background-color: $gray;
					cursor: not-allowed;
				}
			}
		}

		&__login-link {
			@include fontSizeRem(10, 20);
			@include lineHeightRem(12, 24);
			color: $lightblack;
			text-align: center;
			margin-top: 1.6rem;

			@include breakpoint(desktop) {
				margin-top: 3vh;
			}

			span {
				color: $lightgreen;
				text-transform: uppercase;
				cursor: pointer;
			}
		}

		&__checkbox {
			text-align: center;
			margin-top: 0.7rem;

			@include breakpoint(desktop) {
				margin-top: 2.5vh;
				margin-bottom: 0.7rem;
			}

			input {
				cursor: pointer;
			}

			span {
				@include fontSizeRem(10, 16);
				@include lineHeightRem(12, 19);
				color: $lightblack;
				vertical-align: super;

				@include breakpoint(desktop) {
					vertical-align: text-bottom;
				}
			}
		}
	}
</style>