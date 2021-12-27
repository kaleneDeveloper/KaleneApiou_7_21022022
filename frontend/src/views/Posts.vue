<template>
    <v-app id="inspire">
        <v-main class="pl-0">
            <v-container>
                <v-btn class="mx-2 btn-add-post" fab dark color="indigo">
                    <v-icon dark> mdi-plus </v-icon>
                </v-btn>
            </v-container>
            <v-container v-for="(post, index) in posts" v-bind:key="index">
                <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                    <v-card>
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
                                <v-icon
                                    v-else
                                    :color="post.user.profile[0].color"
                                    >{{ post.user.profile[0].icon }}</v-icon
                                >
                            </v-avatar>
                            <p class="mt-auto username subtitle-2 font-italic">
                                {{ post.user.username }}
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
                            <v-avatar color="primary" size="40" class="mr-5">
                                <img
                                    v-if="comment.user.profile[0].imageUrl"
                                    :src="comment.user.profile[0].imageUrl"
                                />
                                <v-icon v-else :color="red">
                                    {{ comment.user.profile[0].username }}
                                </v-icon>
                            </v-avatar>
                            <p class="mt-auto username subtitle-2 font-italic">
                                {{ comment.user.profile[0].username }}
                            </p>
                            <v-btn
                                v-if="post.user.id === userId || admin === true"
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
                                v-if="post.user.id === userId || admin === true"
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
            admin: false,
        };
    },
    mounted() {
        this.$store.dispatch("getPosts").then((response) => {
            this.posts = response.data;
        });
        this.$store.dispatch("getUserInfos").then((response) => {
            this.userId = response.data.id;
            this.admin = response.data.admin;
        });
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
</style>
