import http from "../http-common";
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
