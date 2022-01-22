<template>
    <v-app id="inspire">
        <v-main class="pl-0">
            <v-container class="sendTweet">
                <v-row class="d-flex align-center">
                    <v-avatar
                        color="primary"
                        size="50"
                        class="mr-5 avatar mb-6"
                    >
                        <img v-if="profile.imageUrl" :src="profile.imageUrl" />
                        <v-icon v-else>
                            {{ subString }}
                        </v-icon>
                    </v-avatar>
                    <v-text-field
                        v-if="userId !== 0 || admin === true"
                        v-model="post"
                        label="Post"
                        outlined
                        v-on:keyup.enter="addPost(userInfo.uuid)"
                        required
                    ></v-text-field>
                </v-row>
                <v-btn
                    v-if="this.userInfo.id === userId || admin === true"
                    class="mt-3"
                    color="primary"
                    @click="addPost(userInfo.uuid)"
                    outlined
                    :disabled="!validatePost()"
                >
                    Add Post
                </v-btn>
            </v-container>
            <v-container>
                <v-btn class="mx-2 btn-add-post" fab dark color="indigo">
                    <v-icon dark> mdi-plus </v-icon>
                </v-btn>
            </v-container>
            <v-container v-for="post in posts" v-bind:key="post.id">
                <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                    <v-card v-if="renderComponent">
                        <v-card-title>
                            <h1>{{ post.title }}</h1>
                        </v-card-title>
                        <v-card-text>
                            <p>
                                {{ post.content }}
                            </p>
                        </v-card-text>
                        <div class="d-flex align-center profile pa-1">
                            <v-avatar color="primary" size="46" class="mr-5">
                                <img
                                    v-if="post.user.profile[0].imageUrl"
                                    :src="post.user.profile[0].imageUrl"
                                />
                                <v-icon v-else color="black">
                                    {{
                                        post.user.profile[0].username
                                            .substring(0, 1)
                                            .toUpperCase()
                                    }}
                                </v-icon>
                            </v-avatar>
                            <p class="mt-auto username subtitle-2 font-italic">
                                @{{ post.user.username }}
                            </p>
                            <v-btn
                                v-if="post.user.id === userId || admin === true"
                                id="modify-post"
                                v-bind:uuid="post.uuid"
                                class="ml-auto"
                                color="primary"
                                fab
                                x-small
                                dark
                            >
                                <v-icon>mdi-pencil</v-icon>
                            </v-btn>
                            <v-btn
                                class="ml-1"
                                id="delete-post"
                                @click="deletePost(post.uuid)"
                                v-if="post.user.id === userId || admin === true"
                                color="red"
                                fab
                                x-small
                                dark
                                v-bind:uuid="post.uuid"
                            >
                                <v-icon>mdi-minus</v-icon>
                            </v-btn>
                        </div>
                    </v-card>
                </v-col>
                <v-col
                    id="comment"
                    v-for="comment in post.comments"
                    v-bind:key="comment.id"
                    cols="12"
                    sm="12"
                    md="12"
                    lg="12"
                    xl="12"
                >
                    <v-card v-if="renderComponent">
                        <v-card-text>
                            <p>
                                {{ comment.content }}
                            </p>
                        </v-card-text>
                        <div class="d-flex align-center profile pa-1">
                            <v-avatar color="primary" size="40" class="mr-5">
                                <img
                                    v-if="comment.user.profile[0].imageUrl"
                                    :src="comment.user.profile[0].imageUrl"
                                />
                                <v-icon v-else color="black">
                                    {{
                                        comment.user.profile[0].username
                                            .substring(0, 1)
                                            .toUpperCase()
                                    }}
                                </v-icon>
                            </v-avatar>
                            <p class="mt-auto username subtitle-2 font-italic">
                                @{{ comment.user.profile[0].username }}
                            </p>
                            <v-btn
                                v-if="
                                    comment.user.id === userId || admin === true
                                "
                                class="ml-auto"
                                color="primary"
                                fab
                                x-small
                                dark
                            >
                                <v-icon>mdi-pencil</v-icon>
                            </v-btn>
                            <v-btn
                                @click="deleteComment(comment.uuid)"
                                class="ml-1"
                                v-if="
                                    comment.user.id === userId || admin === true
                                "
                                color="red"
                                fab
                                x-small
                                dark
                            >
                                <v-icon>mdi-minus</v-icon>
                            </v-btn>
                        </div>
                    </v-card>
                </v-col>
                <v-card-text>
                    <v-text-field
                        v-if="userId !== 0 || admin === true"
                        v-model="comment[post.id]"
                        label="Comment"
                        outlined
                        class="mt-3"
                        v-on:keyup.enter="addComment(post.uuid, post.id)"
                        required
                    ></v-text-field>
                    <v-btn
                        v-if="userId !== 0 || admin === true"
                        class="mt-3"
                        color="primary"
                        @click="addComment(post.uuid, post.id)"
                        outlined
                        :disabled="!validate(post.id)"
                    >
                        Add comment
                    </v-btn>
                </v-card-text>
            </v-container>
        </v-main>
    </v-app>
</template>
<script>
export default {
    data() {
        return {
            posts: [],
            userId: 0,
            userUuid: this.$store.state.userToken.uuid,
            admin: false,
            comment: [],
            post: [],
            renderComponent: true,
            userInfo: [],
        };
    },
    methods: {
        async forceRerender() {
            await this.$store.dispatch("getPosts").then((response) => {
                this.posts = response.data;
            });
            this.renderComponent = false;
            this.$nextTick(() => {
                Array.prototype.sortOn = function (key) {
                    this.sort(function (a, b) {
                        if (a[key] > b[key]) {
                            return -1;
                        } else if (a[key] < b[key]) {
                            return 1;
                        }
                        return 0;
                    });
                };
                this.posts.sortOn("id");
                this.renderComponent = true;
            });
        },
        async deleteComment(uuid) {
            await this.$store.dispatch("deleteComment", uuid);
            this.forceRerender();
        },
        async addComment(uuid, index) {
            if (this.validate(index) != false) {
                await this.$store.dispatch("addComment", {
                    postUuid: uuid,
                    userUuid: this.userUuid,
                    content: this.comment[index],
                });
                this.comment[index] = "";
                this.forceRerender();
            }
        },
        async addPost() {
            if (this.validatePost() != false) {
                await this.$store.dispatch("addPost", {
                    userUuid: this.userUuid,
                    content: this.post,
                    title: this.userInfo.username,
                });
                this.post = "";
                this.forceRerender();
            }
        },
        async deletePost(uuid) {
            await this.$store.dispatch("deletePost", uuid);
            this.forceRerender();
        },
        validate(index) {
            if (this.comment[index]) {
                return true;
            } else {
                return false;
            }
        },
        validatePost() {
            if (this.post || this.post.length > 0) {
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
    mounted: async function () {
        if (this.$store.state.user.userId === 0) {
            this.$router.push("/login");
            return;
        }
        await this.$store.dispatch("getPosts").then((response) => {
            this.posts = response.data;
        });
        await this.$store.dispatch("getUserInfos").then((response) => {
            this.userId = response.data.id;
            this.admin = response.data.admin;
            this.userInfo = response.data;
        });
        this.forceRerender();
    },
};
</script>
<style scoped>
#comment {
    margin-top: -20px;
    margin-left: auto;
    width: calc(100% - 2rem);
}
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
