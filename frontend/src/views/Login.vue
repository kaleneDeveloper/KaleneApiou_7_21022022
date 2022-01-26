<template>
    <div class="login">
        <h2 v-if="mode === 'login'">Login</h2>
        <h2 v-if="mode === 'signup'">Signup</h2>
        <p v-if="mode === 'login'">
            Tu n'as pas encore de compte ?
            <span @click="switchToSignup()">Créer un compte</span>
        </p>
        <p v-if="mode === 'signup'">
            Tu as deja un compte ?
            <span @click="switchToLogin()">connexion</span>
        </p>
        <div class="login-form">
            <div class="form">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input
                        v-model="email"
                        type="email"
                        class="form-control"
                        id="email"
                        placeholder="Enter email"
                    />
                </div>
                <div class="form-group" v-if="mode === 'signup'">
                    <label for="username">Name</label>
                    <input
                        v-model="username"
                        type="text"
                        class="form-control"
                        id="username"
                        placeholder="Enter name"
                    />
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input
                        v-model="password"
                        type="password"
                        class="form-control"
                        id="password"
                        placeholder="Enter password"
                    />
                </div>
                <div
                    class="form-group"
                    v-if="mode === 'login' && status === 'error'"
                >
                    Adresse email ou mot de passe incorrect
                </div>
                <div
                    class="form-group"
                    v-if="mode === 'signup' && status === 'error'"
                >
                    Adresse email ou Nom déjà utilisé
                </div>
                <button
                    @click="createAccount"
                    class="button"
                    :class="{ 'button--disabled': !validatedFields }"
                    v-if="mode === 'signup'"
                >
                    Create account
                </button>
                <button
                    @click="login"
                    class="button"
                    :class="{ 'button--disabled': !validatedFields }"
                    v-if="mode === 'login'"
                >
                    <span v-if="status === 'loading'"
                        >Connexion en cours...</span
                    >
                    <span v-else-if="status === 'error'"
                        >Connexion impossible</span
                    >
                    <span v-else>Login</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    name: "Login",
    data: function () {
        return {
            mode: "login",
            email: "",
            username: "",
            password: "",
        };
    },
    computed: {
        validatedFields: function () {
            if (this.mode === "signup") {
                if (
                    this.email != "" &&
                    this.username != "" &&
                    this.password != ""
                ) {
                    return true;
                } else {
                    return false;
                }
            } else if (this.mode === "login") {
                if (this.email != "" && this.password != "") {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        },
        ...mapState(["status"]),
    },
    methods: {
        switchToSignup: function () {
            this.mode = "signup";
        },
        switchToLogin: function () {
            this.mode = "login";
        },
        login: function () {
            if (this.email != "" && this.password != "") {
                this.$store
                    .dispatch("login", {
                        email: this.email,
                        password: this.password,
                    })
                    .then(() => {
                        this.$router.push("/");
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                return false;
            }
        },
        createAccount: function () {
            this.$store
                .dispatch("createAccount", {
                    email: this.email,
                    username: this.username,
                    password: this.password,
                })
                .then(
                    () => {
                        this.login();
                    },
                    (err) => {
                        console.log(err);
                    }
                );
        },
    },
    mounted: function () {
        if (this.$store.state.user.userId !== 0) {
            this.$router.push("/");
        }
    },
};
</script>

<style scoped>
@import url("../style/style.css");
</style>
