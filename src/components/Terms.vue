<template>
  	<div class="o-terms">

	  	<div class="o-terms__wrapper">
            <app-header></app-header>

		    <div class="o-terms__content">
                <p>
                    But why are Terms and Conditions agreements important? These agreements may not seem important for your store, as most regular (offline) stores don’t hand them out to customers as they walk through the door!

                    Nonetheless, having this agreement for your e-commerce store is crucial for a number of reasons:

                    They protect you from liability and clarify the purchasing process
                    They can be used to cancel accounts that do not comply with your terms
                    They protect your store’s intellectual property and set out rules as to how it can be used
                    They set out the way in which any disputes will be handled
                    They also allow you to use payment gateways with credit card operators (who require you to have this agreement and a Privacy Policy before they will let you use their services)
                    Contents of the Terms and Conditions

                    The most important sections for an ecommerce store to cover in its Terms and Conditions agreement are:

                    The limitation of liability clauses relating to your products
                    Intellectual property terms relating to your store brand
                    Clear information about your products, any warranties that you provide, payment terms, and conditions and timelines for delivery of goods.
                    One of the most important things to make sure you do with your Terms and Conditions is to make them fair and clear.

                    Limit your liability

                    It’s particularly important to highlight any indemnity terms or terms where you exclude or limit your liability. Take particular care making sure that those terms are not ambiguous in any way.

                    In the United Kingdom, the 2014 Tayside Contracts case looked at some clauses that excluded and limited liability.

                    Tayside Contracts was doing business with D Geddes (Contractors) Limited for some stone chippings used to build roads, on D Geddes’ terms. Several months after the stone chippings were used, the roads started breaking. In their terms, D Geddes had one section limiting their liability to the value of the materials they supplied, but in the next section, they tried to exclude their liability completely.

                    The Court noted that “clauses that seek to exclude liability are subjected to close scrutiny“, and that they must be “clear and unambiguous“. The Court concluded that it was unclear whether D Geddes were excluding liability completely, or were limiting liability to the value of the materials.

                    As a result, the Court held that the sections were too vague, and could not be relied upon. D Geddes was then liable for all of the losses suffered by Tayside Contracts.

                    Here’s an example from the terms of Apple iTunes showing their limitation of liability clause:
                </p>
		  	</div>
            
            <router-link :to="{ name: 'signup' }" tag="span" class="u-only-desktop">back</router-link>
	  	</div>

  	</div>
</template>

<script>
    import Header from './Header.vue'

	export default {
        components: {
            appHeader: Header
        },
        beforeCreate() {
            this.$store.dispatch('headings/actSetHeading', 'Terms and Conditions');
        }
	}
</script>

<style lang="scss" scoped>
	@import '../scss/settings';

	.o-terms {
        background-color: $white;
		width: 100%;
        height: 100vh;

        &__wrapper {
            @include breakpoint(desktop) {
                width: 62rem;
                margin: 0 auto;
                padding-top: 5.8vh;
            }
        }

        &__content {
            font-family: 'HelveticaNeue', sans-serif;
			@include fontSizeRem(14, 20);
            @include lineHeightRem(17, 24);
            @include letterSpacingEm(10, 0);
            color: $lightblack;
            width: 80%;
            margin: 0 auto;
            padding-top: 6.2rem;

            @include breakpoint(desktop) {
                overflow: auto;
                width: 100%;
                height: 75.5vh;
                margin-top: 8.7vh;
                padding-top: 0;
			}
        }

        & span {
            font-family: 'HelveticaNeue', sans-serif;
			@include fontSizeRem(0, 20);
            @include lineHeightRem(0, 24);
            color: $lightblack;
            display: inline-block;
            margin-top: 4vh;
            cursor: pointer;
        }
	}
</style>
