import http from "../http-common";
// const axios = require("axios");

let user = localStorage.getItem("user");
// const http = axios.create({
//     baseURL: "http://localhost:3000",
//     headers: {
//         Accept: "application/json",
//     },
// });
if (user) {
    user = JSON.parse(user);
    http.defaults.headers.common["Authorization"] = "Bearer " + user.token;
} else {
    user = {
        userId: 0,
        token: "",
    };
}
export default {
    getProfile(id) {
        return http.get("/api/users/id/" + id);
    },
    updateProfile(id) {
        return http.put("/api/users/profile/id/" + id);
    },
};
