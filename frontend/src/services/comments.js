// import { http } from "../http-common";
import axios from "axios";
let user = localStorage.getItem("user");

const http = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        "Content-type": "application/json",
    },
});
http.defaults.headers.common["Authorization"] =
    "Bearer " + JSON.parse(user).token;
export default {
    deleteComment(id) {
        return http.delete("/api/comments/" + id);
    },
    addComment(comment) {
        return http.post("/api/comments", comment);
    }
};
