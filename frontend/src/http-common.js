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
export default axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + user.token,
    },
});
