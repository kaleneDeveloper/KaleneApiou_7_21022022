<template>
    <v-app id="inspire">
        <v-main :key="componentKey" class="pl-0">
            <div class="d-flex justify-center">
                <div class="text-center">
                    <h2>Welcome {{ username }}</h2>
                    <h4>{{ email }}</h4>
                    <h4>{{ users.createdAt }}</h4>
                    <v-avatar color="primary" size="40" class="mr-5">
                        <img v-if="imgUrl" :src="imgUrl" alt="Profile" />
                        <v-icon v-else color="black">
                            {{ subString }}
                        </v-icon>
                    </v-avatar>
                </div>
            </div>
            <update-profile
                :parentForceRender="forceRerender"
                :parentData="data()"
            ></update-profile>
            <v-container v-for="postUser in postsUser" v-bind:key="postUser.id">
                <div>
                    {{ postUser.title }}
                    {{ postUser.content }}
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
// import user from "../services/users";
import UpdateProfile from "../components/updateProfile";

export default {
    components: {
        UpdateProfile,
    },
    data: () => ({
        componentKey: 0,
        users: [],
        drawer: null,
        posts: [],
        postsUser: [],
        profile: [],
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
        data() {
            return {
                users: this.users,
            };
        },
        // fetchProfile() {
        //     user.getProfile(this.$store.state.userToken.uuid)
        //         .then((response) => {
        //             this.profile = response.data;
        //         })
        //         .catch((error) => {
        //             console.log(error);
        //         });
        // },
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
            this.componentKey += 1;
        },
    },
    mounted() {
        if (
            this.$store.state.user.userId === 0 ||
            this.$store.state.user.userId === null ||
            this.$store.state.user.userId === undefined ||
            localStorage.getItem("user") === null ||
            localStorage.getItem("user") === undefined ||
            localStorage.getItem("userinfos") === undefined
        ) {
            this.$store.dispatch("logout");
            this.$router.push("/login");
            return;
        }
        this.$store.dispatch("getUserInfos").then((response) => {
            this.users = response.data;
        });
        
    },
};
</script>
<style lang="postcss" scoped></style>
