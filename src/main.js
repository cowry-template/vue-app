import { createApp } from "vue";
import ArcoVue from "@arco-design/web-vue";
import ArcoVueIcon from "@arco-design/web-vue/es/icon";
import store from "@/stores";
import router from "@/router";
import globalComponents from "@/plugin/components";

import App from "@/App.vue";

import "@arco-design/web-vue/dist/arco.less";
import "virtual:svg-icons-register";
import "@/assets/styles/global.scss";

const app = createApp(App);

app.use(ArcoVue, {
  componentPrefix: "a",
});
app.use(ArcoVueIcon);
app.use(router);
app.use(store);
globalComponents(app);

app.mount("#app");
