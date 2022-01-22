<template>
    <v-app v-if="renderComponent" id="inspire">
        <v-main class="pl-0">
            <div class="d-flex justify-center">
                <div class="text-center">
                    <h2>Welcome {{ username }}</h2>
                    <h3>{{ username }}</h3>
                    <h4>{{ email }}</h4>
                    <v-avatar color="primary" size="40" class="mr-5">
                        <img v-if="imgUrl" :src="imgUrl" />
                        <v-icon v-else color="black">
                            {{ subString }}
                        </v-icon>
                    </v-avatar>
                </div>
            </div>
        </v-main>
    </v-app>
</template>
<script>
export default {
    data: () => ({
        renderComponent: true,
        users: [],
        drawer: null,
        posts: [],
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
        subString() {
            return this.users.profile && this.users.profile.length > 0
                ? this.users.profile[0].username.substring(0, 1).toUpperCase()
                : "";
        },
        email() {
            return this.users.profile && this.users.profile.length > 0
                ? this.users.profile[0].email
                : "";
        },
    },
    methods: {
        async forceRerender() {
            await this.$store.dispatch("getUserInfos").then((response) => {
                this.users = response.data;
            });
            this.renderComponent = false;
            this.$nextTick(() => {
                this.renderComponent = true;
            });
        },
    },
    mounted: async function () {
        if (this.$store.state.user.userId === 0) {
            this.$router.push("/login");
            return;
        }
        await this.$store.dispatch("getUserInfos").then((response) => {
            this.users = response.data;
        });
        this.forceRerender();
    },
};
</script>
<style lang="postcss" scoped></style>
