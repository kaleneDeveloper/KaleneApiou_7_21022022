import http from "../http-common";

export default {
    getProfile(id) {
        return http.get("/api/users/id/" + id);
    },
    updateProfile(id) {
        return http.put("/api/users/profile/id/" + id);
    },
};
