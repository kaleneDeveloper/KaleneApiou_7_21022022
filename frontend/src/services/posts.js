import http from "../http-common";
// let user = localStorage.getItem("user");
// const axios = require("axios");

// if (user) {
//     user = JSON.parse(user);
// } else {
//     user = {
//         userId: 0,
//         token: "",
//     };
// }
// const http = axios.create({
//     baseURL: "http://localhost:3000",
//     headers: {
//         Accept: "application/json",
//         Authorization: "Bearer " + user.token,
//     },
// });
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
        return http.put("/api/posts/id/" + id, post);
    },
    deletePost(id) {
        return http.delete("/api/posts/" + id);
    },
};
