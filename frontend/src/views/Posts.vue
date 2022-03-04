<template>
    <v-app id="inspire">
        <v-main class="pl-0" :key="componentKey">
            <!-- ADD POST -->
            <add-post
                ref="addPost"
                :parentForceRender="forceRerender"
            ></add-post>
            <v-container>
                <v-btn class="mx-2 btn-add-post" fab dark color="indigo">
                    <v-icon dark> mdi-plus </v-icon>
                </v-btn>
            </v-container>
            <!-- POSTS AND COMMENTS -->
            <get-posts :parentForceRender="forceRerender"></get-posts>
        </v-main>
    </v-app>
</template>
<script>
import AddPost from "../components/AddPost";
import getPosts from "../components/Posts";
export default {
    components: {
        AddPost,
        getPosts,
    },
    data() {
        return {
            hidden: false,
            currentImage: undefined,
            userId: 0,
            userUuid: this.$store.state.userToken.uuid,
            admin: false,
            userInfo: [],
            componentKey: 0,
        };
    },
    beforeCreate() {
        this.$store.dispatch("getUserInfos").then((response) => {
            this.userId = response.data.id;
            this.admin = response.data.admin;
            this.userInfo = response.data;
        });
    },
    methods: {
        forceRerender() {
            this.componentKey += 1;
        },
        validate(index) {
            if (this.comment[index] || this.comment[index] > 0) {
                return true;
            } else {
                return false;
            }
        },
        validatePost() {
            if (this.post.length > 0) {
                return true;
            } else {
                return false;
            }
        },
    },
    computed: {
        profile() {
            return this.userInfo.profile && this.userInfo.profile.length > 0
                ? this.userInfo.profile[0]
                : "";
        },
        subString() {
            return this.userInfo.profile && this.userInfo.profile.length > 0
                ? this.userInfo.profile[0].username
                      .substring(0, 1)
                      .toUpperCase()
                : "";
        },
    },
    mounted() {
        if (this.$store.state.user.userId === 0) {
            this.$router.push("/login");
            return;
        }
    },
};
</script>
<style scoped>
.username {
    line-height: 1;
}
.btn-add-post {
    position: fixed;
    right: 2rem;
    bottom: 0;
    margin: 2rem;
    z-index: 100;
}
.sendTweet {
    padding: 24px;
}
</style>
