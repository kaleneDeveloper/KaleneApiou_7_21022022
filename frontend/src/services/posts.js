import http from "../http-common";
export default {
    getPosts() {
        return http.get("/api/posts");
    },
    getPostUser(id) {
        return http.get("/api/users/id/" + id);
    },
    addPost(post) {
        return http.post("/api/posts", post);
    },
    modifyPost(id, post) {
        return http.put("/api/posts/" + id, post);
    },
    deletePost(id) {
        return http.delete("/api/posts/" + id);
    },
};
