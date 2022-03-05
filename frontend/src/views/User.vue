<template>
    <v-container>
        <v-col md="6" offset-md="3">
            <v-avatar color="primary" size="40" class="mr-5">
                <img v-if="profile.imageUrl" :src="profile.imageUrl" />
                <v-icon v-else color="black">
                    {{ subString }}
                </v-icon>
            </v-avatar>
            <h1>{{ user.email }}</h1>
            <h1>{{ user.username }}</h1>
        </v-col>
    </v-container>
</template>
<script>
// import getProfile from "../services/users";
export default {
    name: "User",
    data() {
        return {
            user: [],
        };
    },
    created() {
        this.fetchUser();
    },
    computed: {
        profile() {
            return this.user.profile && this.user.profile.length > 0
                ? this.user.profile[0]
                : "";
        },
        subString() {
            return this.user.profile[0].username.substring(0, 1).toUpperCase();
        },
    },
    methods: {
        // fetchUser() {
        //     getProfile.getProfile(this.$route.params.id).then((response) => {
        //         this.user = response.data;
        //     });
        // },
    },
};
</script>
