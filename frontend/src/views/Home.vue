<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png" />
        <HelloWorld msg="Welcome to Your Vue.js App" />
        <div>
            <h2>Welcome {{ username }}</h2>
            <h3>{{ username }}</h3>
            <h4>{{ email }}</h4>
            <a v-bind:href="imgUrl">Image de profile</a>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
// import axios from "axios";
export default {
    name: "Home",
    components: {
        HelloWorld,
    },
    data() {
        return {
            users: [],
        };
    },
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
        this.$store.dispatch("getUserToken");
        this.$store.dispatch("getUserInfos").then((response) => {
            this.users = response.data;
        });
    },
};
</script>
<style scoped>
h2 {
    font-size: 2rem;
    font-weight: bold;
}
</style>
