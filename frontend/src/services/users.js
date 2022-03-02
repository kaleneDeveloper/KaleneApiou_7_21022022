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
    getProfile(id) {
        return http.get("/api/users/id/" + id);
    },
    updateProfile(id) {
        return http.put("/api/users/profile/id/" + id);
    },
};
