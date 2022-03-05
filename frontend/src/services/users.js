// import axios from "axios";
import http from "../http-common";
// const http = axios.create({
//     baseURL: "http://localhost:3000",
//     headers: {
//         "Content-type": "application/json",
//         Authorization: "Bearer " + user.token,
//     },
// });
export default {
    getProfile(id) {
        return http.get("/api/users/id/" + id);
    },
    updateProfile(id, profile) {
        let formData = new FormData();
        formData.append("username", profile.username);
        formData.append("lastName", profile.lastName);
        formData.append("age", profile.age);
        formData.append("email", profile.email);
        if (profile.password !== "") {
            formData.append("password", profile.password);
        }
        formData.append("profile", profile.imageUrl);

        return http.put("/api/users/profile/" + id, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },
    deleteUser(id) {
        return http.delete("/api/users/" + id);
    },
};
