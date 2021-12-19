import Vue from "vue";
import Vuex from "vuex";
const axios = require("axios");

Vue.use(Vuex);
const instance = axios.create({ baseURL: "http://localhost:3000" });
let user = localStorage.getItem("user");
if (!user) {
    user = {
        userId: 0,
        uuid: "",
    };
} else {
    try {
        user = JSON.parse(user);
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
    },
    mutations: {
        setStatus(state, status) {
            state.status = status;
        },
        logUser(state, user) {
            state.user = user;
            localStorage.setItem("user", JSON.stringify(user));
        },
    },
    actions: {
        createAccount: ({ commit }, userInfo) => {
            return new Promise((resolve, reject) => {
                commit;
                axios;
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
                axios;
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
                state;
            });
        },
        getUserInfos: () => {
            return new Promise((resolve, reject) => {
                axios;
                instance
                    .get("/api/users/" + store.state.user.uuid)
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
