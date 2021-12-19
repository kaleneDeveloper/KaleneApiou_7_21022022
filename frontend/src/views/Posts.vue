<template>
    <div class="posts">
        <h1>This is an posts page</h1>
        <div class="posts">
            <div class="post" v-for="(post, index) in posts" v-bind:key="index">
                <h3>{{ post.title }}</h3>
                <h4>{{ post.content }}</h4>
                <p>{{ post.user.username }}</p>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
export default {
    data() {
        return {
            posts: [],
        };
    },
    mounted() {
        axios
            .get("http://localhost:3000/api/posts")
            .then((response) => {
                this.posts = response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    },
};
</script>
<style scoped>
.posts {
    margin: 0 auto;
    width: 80%;
}
</style>