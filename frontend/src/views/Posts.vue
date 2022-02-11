<template>
    <v-app id="inspire">
        <v-main class="pl-0">
            <!-- ADD POST -->
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
                        color="teal"
                        label="Post"
                        outlined
                        v-on:keyup.enter="addPost(userInfo.uuid)"
                        required
                    >
                        <template v-slot:label>
                            <div>Post</div>
                        </template>
                    </v-text-field>
                </v-row>
                <upload-image ref="upload"></upload-image>
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
            <!-- POSTS AND COMMENTS -->
            <v-container>
                <v-container v-for="(post, index) in posts" v-bind:key="index">
                    <!-- POSTS -->
                    <v-col class="mb-10">
                        <v-card :key="componentKey">
                            <v-card-title>
                                <h1>{{ post.title }}</h1>
                            </v-card-title>
                            <v-card-text>
                                <p>
                                    {{ post.content }}
                                </p>
                            </v-card-text>
                            <v-row>
                                <v-col
                                    v-for="(image, index) in imagesUrlSource(
                                        index
                                    )"
                                    v-bind:key="index"
                                    class="d-flex child-flex"
                                    cols="8"
                                    sm="4"
                                >
                                    <v-img contain :src="image"></v-img>
                                </v-col>
                            </v-row>
                            <v-row class="justify-space-between">
                                <div class="d-flex align-center">
                                    <template>
                                        <v-container>
                                            <div>
                                                <v-menu
                                                    bottom
                                                    min-width="200px"
                                                    rounded
                                                    offset-y
                                                >
                                                    <template
                                                        v-slot:activator="{
                                                            on,
                                                        }"
                                                    >
                                                        <v-btn
                                                            icon
                                                            x-large
                                                            v-on="on"
                                                        >
                                                            <v-avatar
                                                                color="primary"
                                                                size="46"
                                                            >
                                                                <img
                                                                    v-if="
                                                                        post
                                                                            .user
                                                                            .profile[0]
                                                                            .imageUrl
                                                                    "
                                                                    :src="
                                                                        post
                                                                            .user
                                                                            .profile[0]
                                                                            .imageUrl
                                                                    "
                                                                />
                                                                <v-icon
                                                                    v-else
                                                                    color="black"
                                                                >
                                                                    {{
                                                                        post.user.profile[0].username
                                                                            .substring(
                                                                                0,
                                                                                1
                                                                            )
                                                                            .toUpperCase()
                                                                    }}
                                                                </v-icon>
                                                            </v-avatar>
                                                        </v-btn>
                                                    </template>
                                                    <v-card>
                                                        <v-list-item-content
                                                            class="justify-center"
                                                        >
                                                            <div
                                                                class="mx-auto text-center"
                                                            >
                                                                <v-avatar
                                                                    color="primary"
                                                                    size="46"
                                                                >
                                                                    <img
                                                                        v-if="
                                                                            post
                                                                                .user
                                                                                .profile[0]
                                                                                .imageUrl
                                                                        "
                                                                        :src="
                                                                            post
                                                                                .user
                                                                                .profile[0]
                                                                                .imageUrl
                                                                        "
                                                                    />
                                                                    <v-icon
                                                                        v-else
                                                                        color="black"
                                                                    >
                                                                        {{
                                                                            post.user.profile[0].username
                                                                                .substring(
                                                                                    0,
                                                                                    1
                                                                                )
                                                                                .toUpperCase()
                                                                        }}
                                                                    </v-icon>
                                                                </v-avatar>
                                                                <h3>
                                                                    {{
                                                                        post
                                                                            .user
                                                                            .profile[0]
                                                                            .username
                                                                    }}
                                                                    {{
                                                                        post
                                                                            .user
                                                                            .profile[0]
                                                                            .username
                                                                    }}
                                                                </h3>
                                                                <p
                                                                    class="text-caption mt-1"
                                                                >
                                                                    {{
                                                                        profile.email
                                                                    }}
                                                                </p>
                                                                <v-divider
                                                                    class="my-3"
                                                                ></v-divider>
                                                                <v-btn
                                                                    depressed
                                                                    rounded
                                                                    text
                                                                    @click="
                                                                        profilePath(
                                                                            post
                                                                                .user
                                                                                .profile[0]
                                                                                .userUuid
                                                                        )
                                                                    "
                                                                >
                                                                    Voir le
                                                                    profil
                                                                </v-btn>
                                                                <v-divider
                                                                    class="my-3"
                                                                ></v-divider>
                                                                <div
                                                                    v-if="
                                                                        post
                                                                            .user
                                                                            .id ===
                                                                            userId ||
                                                                        admin ===
                                                                            true
                                                                    "
                                                                >
                                                                    <v-btn
                                                                        depressed
                                                                        rounded
                                                                        text
                                                                    >
                                                                        Edit
                                                                        Account
                                                                    </v-btn>
                                                                    <v-divider
                                                                        class="my-3"
                                                                    ></v-divider>
                                                                    <v-btn
                                                                        depressed
                                                                        rounded
                                                                        text
                                                                    >
                                                                        Disconnect
                                                                    </v-btn>
                                                                </div>
                                                            </div>
                                                        </v-list-item-content>
                                                    </v-card>
                                                </v-menu>
                                            </div>
                                        </v-container>
                                    </template>

                                    <span
                                        class="m-auto username subtitle-2 font-italic"
                                    >
                                        @{{ post.user.username }}
                                    </span>
                                </div>
                                <div class="d-flex align-center mr-5">
                                    <!-- POST DIALOG -->
                                    <v-dialog
                                        v-if="
                                            post.user.id === userId ||
                                            admin === true
                                        "
                                        v-model="dialog[index]"
                                        persistent
                                        max-width="600px"
                                    >
                                        <template
                                            v-slot:activator="{ on, attrs }"
                                        >
                                            <v-btn
                                                :v-bind="attrs"
                                                v-on="on"
                                                class="ml-auto"
                                                color="primary"
                                                fab
                                                x-small
                                                dark
                                                @click="takePost(post.content)"
                                            >
                                                <v-icon>mdi-pencil</v-icon>
                                            </v-btn>
                                        </template>
                                        <v-card>
                                            <v-card-title>
                                                <span class="text-h5"
                                                    >Post utilisateur</span
                                                >
                                            </v-card-title>
                                            <v-card-text>
                                                <v-container>
                                                    <v-row>
                                                        <v-col cols="12">
                                                            <v-textarea
                                                                color="teal"
                                                                label="Post"
                                                                v-model="
                                                                    postUpdate
                                                                "
                                                                value="postUpdate"
                                                            >
                                                                <template
                                                                    v-slot:label
                                                                >
                                                                    <div>
                                                                        post
                                                                    </div>
                                                                </template>
                                                            </v-textarea>
                                                        </v-col>
                                                    </v-row>
                                                </v-container>
                                            </v-card-text>
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn
                                                    color="blue darken-1"
                                                    text
                                                    @click="
                                                        dialog = [false[index]]
                                                    "
                                                >
                                                    Close
                                                </v-btn>
                                                <v-btn
                                                    color="blue darken-1"
                                                    text
                                                    @click="
                                                        modifyPost(
                                                            post.uuid,
                                                            index
                                                        )
                                                    "
                                                >
                                                    Save
                                                </v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>
                                    <v-btn
                                        class="ml-1"
                                        id="delete-post"
                                        @click="deletePost(post.uuid)"
                                        v-if="
                                            post.user.id === userId ||
                                            admin === true
                                        "
                                        color="red"
                                        fab
                                        x-small
                                        dark
                                        v-bind:uuid="post.uuid"
                                    >
                                        <v-icon>mdi-minus</v-icon>
                                    </v-btn>
                                </div>
                            </v-row>
                        </v-card>
                    </v-col>
                    <!-- COMMENTS -->
                    <v-col
                        id="comment"
                        v-for="(comment, index) in post.comments"
                        v-bind:key="index"
                        cols="12"
                        sm="12"
                        md="12"
                        lg="12"
                        xl="12"
                    >
                        <v-card>
                            <v-card-text>
                                <p>
                                    {{ comment.content }}
                                </p>
                            </v-card-text>
                            <div class="d-flex align-center profile pa-1">
                                <v-avatar
                                    color="primary"
                                    size="40"
                                    class="mr-5"
                                >
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
                                <p
                                    class="mt-auto username subtitle-2 font-italic"
                                >
                                    @{{ comment.user.profile[0].username }}
                                </p>
                                <!-- COMMENT DIALOG -->
                                <v-dialog
                                    v-if="
                                        comment.user.id === userId ||
                                        admin === true
                                    "
                                    v-model="dialogComment[comment.id]"
                                    persistent
                                    max-width="600px"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn
                                            :v-bind="attrs"
                                            v-on="on"
                                            class="ml-auto"
                                            color="primary"
                                            fab
                                            x-small
                                            dark
                                            @click="
                                                takeComment(comment.content)
                                            "
                                        >
                                            <v-icon>mdi-pencil</v-icon>
                                        </v-btn>
                                    </template>
                                    <v-card>
                                        <v-card-title>
                                            <span class="text-h5"
                                                >Commentaire utilisateur</span
                                            >
                                        </v-card-title>
                                        <v-card-text>
                                            <v-container>
                                                <v-row>
                                                    <v-col cols="12">
                                                        <v-textarea
                                                            color="teal"
                                                            label="modify-comment"
                                                            v-model="
                                                                commentUpdate
                                                            "
                                                        >
                                                            <template
                                                                v-slot:label
                                                            >
                                                                <div>
                                                                    commentaire
                                                                </div>
                                                            </template>
                                                        </v-textarea>
                                                    </v-col>
                                                </v-row>
                                            </v-container>
                                        </v-card-text>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn
                                                color="blue darken-1"
                                                text
                                                @click="
                                                    dialogComment = [
                                                        false[comment.id],
                                                    ]
                                                "
                                            >
                                                Close
                                            </v-btn>
                                            <v-btn
                                                color="blue darken-1"
                                                text
                                                @click="
                                                    modifyComment(
                                                        comment.uuid,
                                                        comment.id
                                                    )
                                                "
                                            >
                                                Save
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                                <v-btn
                                    @click="deleteComment(comment.uuid)"
                                    class="ml-1"
                                    v-if="
                                        comment.user.id === userId ||
                                        admin === true
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
            </v-container>
        </v-main>
    </v-app>
</template>
<script>
import comments from "../services/comments.js";
import posts from "../services/posts.js";
import uploadImage from "../components/Uploadimage";
export default {
    components: {
        uploadImage,
    },
    data() {
        return {
            currentImage: undefined,
            posts: [],
            post: [],
            comment: [],
            commentUpdate: [],
            userId: 0,
            userUuid: this.$store.state.userToken.uuid,
            admin: false,
            userInfo: [],
            dialog: [],
            dialogComment: [],
            dialogProfile: [],
            postUpdate: [],
            imagesUrl: [],
            componentKey: 0,
        };
    },
    beforeCreate() {
        this.$store
            .dispatch("getUserInfos")
            .then((response) => {
                this.userId = response.data.id;
                this.admin = response.data.admin;
                this.userInfo = response.data;
            })
            .then(() => {
                posts
                    .getPosts()
                    .then((response) => {
                        this.posts = response.data;
                    })
                    .then(() => {
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
                        });
                        this.posts.sortOn("id");
                    });
            });
    },
    created() {
        this.deleteComment();
        this.addComment();
        this.addPost();
    },
    methods: {
        forceRerender() {
            this.componentKey += 1;
            this.getPosts();
        },
        imagesUrlSource(index) {
            if (this.posts[index].imageUrl !== null) {
                const result = this.posts[index].imageUrl.split(" ");
                const result1 = result.filter((e) => e && e !== "+");
                this.imagesUrl[index] = result1;
                return result1;
            }
        },
        takePost(content) {
            this.postUpdate = content;
        },
        takeComment(content) {
            this.commentUpdate = content;
        },
        profilePath(user) {
            this.$router.push("/user/" + user);
        },
        getPosts() {
            posts
                .getPosts()
                .then((response) => {
                    this.posts = response.data;
                })
                .then(() => {
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
                    });
                    this.posts.sortOn("id");
                });
        },
        deleteComment(uuid) {
            comments
                .deleteComment(uuid)
                .then(() => {
                    this.forceRerender();
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        addComment(uuid, index) {
            if (this.validate(index) != false) {
                comments
                    .addComment({
                        postUuid: uuid,
                        userUuid: this.userUuid,
                        content: this.comment[index],
                    })
                    .then(() => {
                        this.forceRerender();
                        this.comment[index] = "";
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        },
        addPost() {
            if (this.validatePost() != false) {
                if (this.$refs.upload._data.currentImage !== undefined) {
                    this.$refs.upload._self.uploadFilePost(
                        this.userUuid,
                        this.post,
                        this.userInfo.username
                    );
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
                            this.forceRerender();
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }
            }
        },
        deletePost(uuid) {
            posts.deletePost(uuid).then(() => {
                this.forceRerender();
            });
        },
        modifyPost(uuid, index) {
            posts
                .modifyPost(uuid, {
                    content: this.postUpdate,
                })
                .then(() => {
                    this.forceRerender();
                    this.dialog = [false[index]];
                });
        },
        modifyComment(uuid, index) {
            comments
                .modifyComment(uuid, { content: this.commentUpdate })
                .then(() => {
                    this.forceRerender();
                    this.dialogComment = [false[index]];
                });
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
