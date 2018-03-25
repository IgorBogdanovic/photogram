import { users } from './axios-urls'

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

export const inUserDetail = {
    methods: {
        inUserDetail(id) {
            return users.get('find?id=' + id, { headers: { Authorization: 'Bearer ' + this.token } })
            .then(res => {
                // console.log(res);
                const user = res.data.data;
                this.$store.dispatch('nfPosts/changeUser', user);
            })
            .catch(error => {
                console.log(error);
            });
        }
    }
}
