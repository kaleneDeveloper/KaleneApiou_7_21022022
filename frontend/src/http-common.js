import axios from "axios";
let user = localStorage.getItem("user");

export default axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + JSON.parse(user).token,
    },
});

// .defaults.headers.common["Authorization"] =
//     "Bearer " + JSON.parse(user).token;

// const http = axios.create({
//     baseURL: "http://localhost:3000",
//     headers: {
//         "Content-type": "application/json",
//     },
// });
// http.defaults.headers.common["Authorization"] =
//     "Bearer " + JSON.parse(user).token;
