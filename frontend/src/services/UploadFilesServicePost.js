import http from "../http-common";
// const axios = require("axios");
// let user = localStorage.getItem("user");

// const http = axios.create({
//     baseURL: "http://localhost:3000",
//     headers: {
//         Accept: "application/json",
//         Authorization: "Bearer " + JSON.parse(user).token,
//     },
// });
// http.defaults.headers.common["Authorization"] = "Bearer " + user.token;

class UploadFilesServicePost {
    uploadFilePost(file, onUploadProgress) {
        let formData = new FormData();
        formData.append("title", file.title);
        formData.append("content", file.content);
        formData.append("userUuid", file.userUuid);
        file.imageUrl.forEach((imageUrl) => {
            formData.append("posts", imageUrl);
        });
        return http.post("/api/posts", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress,
        });
    }
}
export default new UploadFilesServicePost();
