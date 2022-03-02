export default (router) => {
    if (router.app.$store.state.user.userId !== 0) {
        console.log("router", router);
    }
    if (router.currentRoute.meta.requiresAuth === true) {
        this.$store.dispatch("logout");
        this.$router.push("/login");
    }
};
