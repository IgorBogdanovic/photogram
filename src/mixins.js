export const basicVars = {
    data () {
        return {
            windowWidth: $(window).width(),
            windowHeight: $(window).height(),
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
