<template>
    <div class="o-my-notification">
        <div class="o-my-notification__content">

            <nav class="o-my-notification__nav">
                <ul class="o-my-notification__nav-ul">
                    <li class="o-my-notification__nav-li">My Notification</li>
                    <li class="o-my-notification__nav-li">My Followers</li>
                    <li class="o-my-notification__nav-li">My Followings</li>
                </ul>
            </nav>

        </div>
    </div>
</template>

<script>
    import { mixinStorage, basicVars } from '../mixins'

    export default {
        mixins: [ mixinStorage, basicVars ],
        created() {
            if (this.windowWidth > this.breakpoint) {
                this.$store.dispatch('headings/actSetHeading', 'photogram');
            } else this.$store.dispatch('headings/actSetHeading', 'My Notification');
        }
        // destroyed() {
        //     console.log(this.comments);
        // }
	}
</script>

<style lang="scss" scoped>
	@import '../scss/settings';

    .o-my-notification {
        width: 100%;
		height: 100vh;
		background-color: $white;

		&__content {
            font-family: 'Roboto', sans-serif;
			overflow: hidden;
			padding-top: 4.76rem;
			padding-bottom: 4.2rem;

			@include breakpoint(desktop) {
				width: 148rem;
				margin: 0 auto;
				padding-top: 13.7rem;
			}
		}

        &__nav {
            width: 100%;
            padding-top: 1.5rem;
            padding-left: 3.7rem;

            &-ul {
                overflow-x: auto;
                white-space: nowrap;
                padding-bottom: 1.4rem;
            }

            &-li {
                @include fontSizeRem(14, 20);
                @include lineHeightRem(17, 24);
                display: inline;
                color: $lightblack;
                text-transform: uppercase;
                margin-right: 1.2rem;
            }
        }
    }
</style>