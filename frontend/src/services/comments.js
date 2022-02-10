import http from "../http-common";
// const axios = require("axios");
// let user = localStorage.getItem("user");

// const http = axios.create({
//     baseURL: "http://localhost:3000",
//     headers: {
//         Accept: "application/json",
//     },
// });
// http.defaults.headers.common["Authorization"] = "Bearer " + user.token;
export default {
    deleteComment(id) {
        return http.delete("/api/comments/" + id);
    },
    addComment(comment) {
        return http.post("/api/comments", comment);
    }
};
