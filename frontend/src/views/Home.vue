<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png" />
        <HelloWorld msg="Welcome to Your Vue.js App" />
        <div>
            <h2>Welcome {{ users.username }}</h2>
            <h3>{{ users.username }}</h3>
            <h4>{{ users.email }}</h4>
            <p>{{ users.profile[0].id }}</p>
            <!-- <a v-bind:href="imgUrl">Image de profile</a> -->
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
    mounted: function () {
        if (this.$store.state.user.userId === 0) {
            this.$router.push("/login");
            return;
        }
        this.$store.dispatch("getUserInfos").then((response) => {
            this.users = response.data;
            console.log(response.data);
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
