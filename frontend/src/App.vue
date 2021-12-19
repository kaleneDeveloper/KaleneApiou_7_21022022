<template>
    <div id="app">
        <div id="home">
            <div id="nav">
                <router-link to="/">Home</router-link> |
                <router-link to="/about">About</router-link> |
                <router-link to="/posts">Posts</router-link>
            </div>
            <button @click="logout">Deconnexion</button>
        </div>
        <router-view />
    </div>
</template>

<script>
export default {
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
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%);
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}
#home {
    display: flex;
    justify-content: end;
    align-items: center;
    margin: 1rem;
}
button {
    height: 2rem;
    border-radius: 5px;
    border: none;
    background-color: #00a8ff;
    color: white;
    font-weight: bold;
    font-size: 12px;
    cursor: pointer;
    margin-left: 0.5rem;
}
</style>
