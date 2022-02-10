<template>
    <v-app v-if="forceRerender" id="inspire">
        <v-main class="pl-0">
            <div class="d-flex justify-center">
                <div class="text-center">
                    <h2>Welcome {{ username }}</h2>
                    <h4>{{ email }}</h4>
                    <h4>{{ users.createdAt }}</h4>
                    <v-avatar color="primary" size="40" class="mr-5">
                        <img v-if="imgUrl" :src="imgUrl" />
                        <v-icon v-else color="black">
                            {{ subString }}
                        </v-icon>
                    </v-avatar>
                    <!-- <v-row justify="center mt-10">
                        <v-dialog v-model="dialog" persistent max-width="600px">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                    color="primary"
                                    dark
                                    v-bind="attrs"
                                    v-on="on"
                                >
                                    modifier mon profil
                                </v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                    <span class="text-h5"
                                        >Profil utilisateur</span
                                    >
                                </v-card-title>
                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field
                                                    label="Prénom"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field
                                                    label="Nom"
                                                    hint="example of helper text only on focus"
                                                ></v-text-field>
                                            </v-col>

                                            <v-col cols="12">
                                                <v-text-field
                                                    label="Email"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col cols="12">
                                                <v-text-field
                                                    label="Mot de pass"
                                                    type="password"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6">
                                                <v-text-field
                                                    v-model="numberValue"
                                                    label="Age"
                                                    hide-details
                                                    single-line
                                                    type="number"
                                                />
                                            </v-col>
                                            <v-col cols="12" sm="6"> </v-col>
                                        </v-row>
                                    </v-container>
                                    <v-container> </v-container>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        color="blue darken-1"
                                        text
                                        @click="dialog = false"
                                    >
                                        Close
                                    </v-btn>
                                    <v-btn
                                        color="blue darken-1"
                                        text
                                        @click="dialog = false"
                                    >
                                        Save
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-row> -->
                </div>
            </div>
            <v-container v-for="postUser in postsUser" v-bind:key="postUser.id">
                <div>
                    {{ postUser.title }}
                </div>
                <div
                    v-for="comment in postUser.comments"
                    v-bind:key="comment.id"
                >
                    {{ comment.content }}
                </div>
            </v-container>
        </v-main>
    </v-app>
</template>
<script>
import getPosts from "../services/posts";
export default {
    data: () => ({
        renderComponent: true,
        componentKey: 0,
        users: [],
        drawer: null,
        posts: [],
        postsUser: [],
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
    created: function () {
        this.fetchPostsUsers();
    },
    methods: {
        fetchPostsUsers() {
            getPosts
                .getPostUser(this.$store.state.userToken.uuid)
                .then((response) => {
                    this.postsUser = response.data.posts;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        forceRerender() {
            this.renderComponent = false;
            this.$nextTick(() => {
                this.renderComponent = true;
            });
        },
    },
    mounted: function () {
        if (
            this.$store.state.user.userId === 0 ||
            this.$store.state.user.userId === null ||
            this.$store.state.user.userId === undefined ||
            localStorage.getItem("user") === null ||
            localStorage.getItem("user") === undefined ||
            localStorage.getItem("user") === ""
        ) {
            this.$store.dispatch("logout");
            this.$router.push("/login");
            return;
        }
        this.$store.dispatch("getUserInfos").then((response) => {
            this.users = response.data;
            this.fetchPostsUsers();
        });
    },
};
</script>
<style lang="postcss" scoped></style>
