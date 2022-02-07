import axios from "axios";
// let user = localStorage.getItem("user");

export const instance = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        Accept: "application/json",
        Authorization: "Bearer " + $store.state.user.token,
    },
});

// return (instance.defaults.headers.common["Authorization"] =
//     "Bearer " + JSON.parse(user).token);
