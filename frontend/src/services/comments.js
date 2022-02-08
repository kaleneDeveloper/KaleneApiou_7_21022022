import http from "../http-common";
export default {
    deleteComment(id) {
        return http.delete("/api/comments/" + id);
    },
    addComment(comment) {
        return http.post("/api/comments", comment);
    }
};
