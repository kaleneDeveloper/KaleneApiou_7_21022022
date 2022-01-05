<template>
    <v-app id="inspire">
        <!-- MOBILE -->
        <v-main>
            <v-navigation-drawer v-model="drawer" app>
                <div id="home">
                    <v-list nav dense>
                        <v-list-item-group
                            active-class="deep-purple--text text--accent-4"
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

                            <router-link to="/posts">
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
                                v-if="this.$store.state.user.userId !== 0"
                            >
                                <button class="logout" @click="logout">
                                    Deconnexion
                                </button>
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
            <router-view :key="$route.fullPath"/>
        </v-main>
        <!-- DESKTOP -->
        <v-main> </v-main>
    </v-app>
</template>

<script>
import colors from 'vuetify/lib/util/colors'
export default {
    theme: {
        themes: {
            light: {
                primary: colors.purple,
                secondary: colors.grey.darken1,
                accent: colors.indigo.red,
                error: colors.red.accent3,
            
            },
        },
    },
    name: "App",
    data: () => ({
        drawer: null,
    }),
    methods: {
        logout: function () {
            this.$store.dispatch("logout");
            this.$router.push("/login");
        },
    },
};
</script>
<style>
@import url("./style/reset.css");
#nav-bar {
    margin-top: 2rem;
}
.v-icon.v-icon.mdi-home {
    text-decoration: none;
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
#nav {
    padding: 30px;
    display: grid;
    justify-content: center;
}
#nav a {
    font-weight: bold;
    color: #2c3e50;
}
#nav a.router-link-exact-active {
    color: #42b983;
}
#home {
    display: grid;
}
.logout {
    height: 2rem;
    border-radius: 5px;
    border: none;
    background-color: #00a8ff;
    color: white;
    font-weight: bold;
    font-size: 12px;
    cursor: pointer;
    margin: auto;
    padding: 0 1rem;
    max-width: 100px;
}

</style>
