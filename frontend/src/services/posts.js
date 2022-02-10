import http from "../http-common";
// const axios = require("axios");
// let user = localStorage.getItem("user");

// const http = axios.create({
//     baseURL: "http://localhost:3000",
//     headers: {
//         Accept: "application/json",
//         Authorization: "Bearer " + JSON.parse(user).token,
//     },
// });
// http.defaults.headers.common["Authorization"] = "Bearer " + user.token;

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
