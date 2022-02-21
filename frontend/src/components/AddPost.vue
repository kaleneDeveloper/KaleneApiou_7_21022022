<template>
    <v-container class="sendTweet">
        <v-row class="d-flex align-center">
            <v-avatar color="primary" size="50" class="mr-5 avatar mb-6">
                <img v-if="profile.imageUrl" :src="profile.imageUrl" />
                <v-icon v-else>
                    {{ subString }}
                </v-icon>
            </v-avatar>
            <v-text-field
                v-if="userId !== 0 || admin === true"
                v-model="post"
                color="teal"
                label="Post"
                outlined
                v-on:keyup.enter="addPost()"
                required
            >
                <template v-slot:label>
                    <div>Post</div>
                </template>
            </v-text-field>
        </v-row>
        <upload-image ref="upload" :key="componentKey"></upload-image>
        <v-btn
            v-if="this.userInfo.id === userId || admin === true"
            class="mt-3"
            color="primary"
            @click="addPost()"
            outlined
            :disabled="!validatePost()"
        >
            Add Post
        </v-btn>
    </v-container>
</template>
<script>
import uploadImage from "../components/Uploadimage";
import posts from "../services/posts.js";
export default {
    name: "add-post",
    components: {
        uploadImage,
    },
    props: {
        parentForceRender: Function,
    },
    data() {
        return {
            userUuid: this.$store.state.userToken.uuid,
            post: [],
            posts: [],
            userId: 0,
            userInfo: [],
            componentKey: 0,
            admin: false,
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
        async addPost() {
            if (this.validatePost() !== false) {
                if (this.$refs.upload._data.currentImage !== undefined) {
                    await this.$refs.upload._self.uploadFilePost(
                        this.userUuid,
                        this.post,
                        this.userInfo.username
                    );
                    this.parentForceRender();
                    this.post = "";
                } else {
                    posts
                        .addPost({
                            userUuid: this.userUuid,
                            content: this.post,
                            title: this.userInfo.username,
                        })
                        .then(() => {
                            this.post = "";
                            this.parentForceRender();
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }
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
};
</script>
<style scoped>

</style>
