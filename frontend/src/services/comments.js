import axios from "axios";
let user = localStorage.getItem("user");
if (user) {
    user = JSON.parse(user);
} else {
    user = {
        userId: 0,
        token: "",
    };
}
const http = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + user.token,
    },
});

export default {
    deleteComment(id) {
        return http.delete("/api/comments/" + id);
    },
    addComment(comment) {
        return http.post("/api/comments", comment);
    },
    modifyComment(id, comment) {
        return http.put("/api/comments/" + id, comment);
    },
};
