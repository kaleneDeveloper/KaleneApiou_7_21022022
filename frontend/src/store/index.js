import Vue from "vue";
import Vuex from "vuex";
const axios = require("axios");

Vue.use(Vuex);
const instance = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        Accept: "application/json",
    },
});

let user = localStorage.getItem("user");
let userInfos = localStorage.getItem("userInfos");
if (!user) {
    user = {
        userId: 0,
        uuid: "",
    };
} else {
    user = JSON.parse(user);
    userInfos = JSON.parse(userInfos);
    // try {
    //     user = JSON.parse(user);
    //     userInfos = JSON.parse(userInfos);
    // } catch (error) {
    //     user = {
    //         userId: 0,
    //         uuid: "",
    //     };
    // }
}
const store = new Vuex.Store({
    state: {
        status: "",
        user: user,
        userToken: userInfos,
    },
    mutations: {
        setStatus(state, status) {
            state.status = status;
        },
        logUser(state, user) {
            instance.interceptors.request.use((config) => {
                if (user.token) {
                    config.headers["Authorization"] = "Bearer " + user.token;
                }
                return config;
            });
            localStorage.setItem("user", JSON.stringify(user));
            state.user = user;
            this.dispatch("getUserToken");
        },
        userToken(state, userTokenInfo) {
            localStorage.setItem("userInfos", JSON.stringify(userTokenInfo));
            state.userToken = userTokenInfo;
        },
    },
    actions: {
        createAccount: ({ commit }, userInfo) => {
            return new Promise((resolve, reject) => {
                commit;
                instance
                    .post("/api/users/signup", userInfo)
                    .then((response) => {
                        commit("setStatus", response.data.status);
                        resolve(response);
                    })
                    .catch((error) => {
                        commit("setStatus", "error");
                        reject(error);
                    });
            });
        },
        login: ({ commit }, userInfo) => {
            commit("setStatus", "loading");
            return new Promise((resolve, reject) => {
                instance
                    .post("/api/users/login", userInfo)
                    .then((response) => {
                        commit("setStatus", "success");
                        commit("logUser", response.data);
                        resolve(response);
                    })
                    .catch((error) => {
                        commit("setStatus", "error");
                        reject(error);
                    });
            });
        },
        logout: ({ commit }) => {
            return new Promise((state) => {
                commit("logUser", {
                    userId: 0,
                    uuid: "",
                });
                localStorage.removeItem("user");
                localStorage.removeItem("userInfos");
                state;
            });
        },
        getUserToken({ commit }) {
            const token = store.state.user.token;
            instance
                .get("/api/users/token", {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    commit("userToken", response.data);
                })
                .catch((error) => {
                    commit("userToken", error);
                });
        },
        async getUserInfos() {
            const uuid = store.state.userToken.uuid;
            const token = store.state.user.token;
            await this.dispatch("getUserToken");
            return new Promise((resolve, reject) => {
                instance
                    .get("/api/users/id/" + uuid, {
                        headers: { Authorization: `Bearer ${token}` },
                    })
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        getUserPosts() {
            const uuid = store.state.userToken.uuid;
            const token = store.state.user.token;
            return new Promise((resolve, reject) => {
                instance
                    .get("/api/posts/user/" + uuid, {
                        headers: { Authorization: `Bearer ${token}` },
                    })
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        getPosts() {
            const token = store.state.user.token;
            return new Promise((resolve, reject) => {
                instance
                    .get("/api/posts", {
                        headers: { Authorization: `Bearer ${token}` },
                    })
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        modifyPost({ commit }, uuid) {
            const token = store.state.user.token;
            return new Promise((resolve, reject) => {
                commit;
                instance
                    .put("/api/posts/" + uuid, {
                        headers: { Authorization: `Bearer ${token}` },
                    })
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        deleteComment({ commit }, uuid) {
            const token = store.state.user.token;
            return new Promise((resolve, reject) => {
                commit;
                instance
                    .delete("/api/comments/" + uuid, {
                        headers: { Authorization: `Bearer ${token}` },
                    })
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        addComment({ commit }, comment) {
            const token = store.state.user.token;
            return new Promise((resolve, reject) => {
                commit;
                instance
                    .post("/api/comments", comment, {
                        headers: { Authorization: `Bearer ${token}` },
                    })
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        addPost: ({ commit }, post) => {
            const token = store.state.user.token;
            return new Promise((resolve, reject) => {
                commit;
                instance
                    .post("/api/posts", post, {
                        headers: { Authorization: `Bearer ${token}` },
                    })
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        deletePost: ({ commit }, uuid) => {
            const token = store.state.user.token;
            return new Promise((resolve, reject) => {
                commit;
                instance
                    .delete("/api/posts/" + uuid, {
                        headers: { Authorization: `Bearer ${token}` },
                    })
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
    },
});

export default store;
