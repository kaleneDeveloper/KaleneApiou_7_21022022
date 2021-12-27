<template>
    <v-app id="inspire">
        <v-main class="">
            <div class="d-flex justify-center">
                <div class="text-center">
                    <h2>Welcome {{ username }}</h2>
                    <h3>{{ username }}</h3>
                    <h4>{{ email }}</h4>
                    <v-img
                        class="ma-auto"
                        contain
                        :lazy-src="imgUrl"
                        max-height="150"
                        max-width="150"
                        :src="imgUrl"
                    ></v-img>
                </div>
            </div>
        </v-main>
    </v-app>
</template>

<script>
export default {
    data: () => ({
        users: [],
        drawer: null,
    }),
    computed: {
        imgUrl() {
            return this.users.profile && this.users.profile.length > 0
                ? this.users.profile[0].imageUrl
                : "";
        },
        username() {
            return this.users.profile && this.users.profile.length > 0
                ? this.users.profile[0].username
                : "";
        },
        email() {
            return this.users.profile && this.users.profile.length > 0
                ? this.users.profile[0].email
                : "";
        },
    },
    mounted: function () {
        if (this.$store.state.user.userId === 0) {
            this.$router.push("/login");
            return;
        }
        this.$store.dispatch("getUserInfos").then((response) => {
            this.users = response.data;
        });
    },
};
</script>
<style lang="postcss" scoped>

</style>
