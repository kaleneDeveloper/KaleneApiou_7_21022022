<template>
    <v-app id="inspire">
        <!-- MOBILE -->
        <v-main :key="componentKey">
            <v-navigation-drawer v-model="drawer" app>
                <div id="home">
                    <v-list nav dense>
                        <v-list-item-group
                            active-class="lighten-3--text text--accent-4"
                        >
                            <router-link to="/">
                                <v-list-item>
                                    <v-list-item-icon>
                                        <v-icon large>mdi-home</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-title>
                                        <span>Home</span>
                                    </v-list-item-title>
                                </v-list-item>
                            </router-link>

                            <router-link to="/about">
                                <v-list-item class="d-flex justify-center test">
                                    <v-list-item-icon>
                                        <v-icon large>mdi-account</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-title
                                        ><span>About</span></v-list-item-title
                                    >
                                </v-list-item>
                            </router-link>

                            <router-link
                                v-if="this.$store.state.user.userId !== 0"
                                to="/posts"
                            >
                                <v-list-item>
                                    <v-list-item-icon>
                                        <v-icon large>mdi-post</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-title
                                        ><span>Posts</span>
                                    </v-list-item-title>
                                </v-list-item>
                            </router-link>
                            <v-list-item
                                class="d-flex justify-center"
                                v-if="this.$store.state.user.userId !== 0"
                            >
                                <v-btn
                                    class="mt-4"
                                    normal
                                    @click="logout"
                                    depressed
                                    color="blue lighten-3"
                                >
                                    <span style="font-size: 14px">
                                        Deconnexion</span
                                    >
                                </v-btn>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </div>
            </v-navigation-drawer>
            <v-app-bar app id="nav-bar">
                <v-app-bar-nav-icon
                    @click="drawer = !drawer"
                ></v-app-bar-nav-icon>
                <v-toolbar-title>Groupamania</v-toolbar-title>
            </v-app-bar>
            <router-view />
        </v-main>
        <!-- DESKTOP -->
        <v-main> </v-main>
    </v-app>
</template>

<script>
import AutoLogout from "./services/AutoLogout";
export default {
    name: "App",
    components: {},
    data: () => ({
        drawer: null,
        componentKey: 0,
    }),
    methods: {
        logout: function () {
            this.$store.dispatch("logout");
            this.$router.push("/login");
            this.$router.go()
        },
    },
    mounted() {
        AutoLogout;
    },
};
</script>
<style>
@import url("./style/reset.css");
#nav-bar {
    margin-top: 2rem;
}
.v-application a {
    text-decoration: none;
}
span {
    font-size: 1rem;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100vh;
}
.v-btn.v-size--default {
    font-size: 2rem;
}
</style>
