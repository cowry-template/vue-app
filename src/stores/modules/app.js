import { defineStore } from "pinia";

export const useAppStore = defineStore("appInfo", {
  state: {
    token: "",
    userInfo: {},
  },
  getters: {},

  actions: {
    setToken(v) {
      this.token = v;
    },
    setUserInfo(v) {
      this.userInfo = v;
    },
  },
  persist: true,
});
