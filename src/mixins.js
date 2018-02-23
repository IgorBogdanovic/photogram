export const basicVars = {
    data () {
        return {
            windowWidth: $(window).width(),
    		breakpoint: 767
        }
    }
}

export const mixinStorage = {
    computed: {
        storage() {
            return this.$store.getters.dbStorage;
        }
    }
}
