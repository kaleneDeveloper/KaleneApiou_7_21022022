import Vue from "vue";
import Vuex from "vuex";
const axios = require("axios");

Vue.use(Vuex);
const instance = axios.create({
    baseURL: "http://localhost:3000",
    headers: { "Content-Type": "application/json" },
});
let user = localStorage.getItem("user");
let userInfos = localStorage.getItem("userInfos");
if (!user) {
    user = {
        userId: 0,
        uuid: "",
    };
} else {
    try {
        user = JSON.parse(user);
        userInfos = JSON.parse(userInfos);
        instance.defaults.headers.common["Authorization"] = user.token;
    } catch (error) {
        user = {
            userId: 0,
            uuid: "",
        };
    }
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
            instance.defaults.headers.common["Authorization"] = user.token;
            localStorage.setItem("user", JSON.stringify(user));
            state.user = user;
        },
        userToken(state, userTokenInfo) {
            instance.defaults.headers.common["Authorization"] = user.token;
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
        getUserToken: ({ commit }) => {
            const token = user.token;
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
        getUserInfos: () => {
            const uuid = store.state.userToken.uuid;
            return new Promise((resolve, reject) => {
                instance
                    .get("/api/users/id/" + uuid)
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
