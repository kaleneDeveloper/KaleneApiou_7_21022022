import http from "../http-common";

class UploadFilesServicePost {
    async uploadFilePost(file, onUploadProgress) {
        let formData = new FormData();
        console.log(file);
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
