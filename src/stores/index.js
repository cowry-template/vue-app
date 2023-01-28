import { createPinia } from "pinia";
import piniaPersistedState from "pinia-plugin-persistedstate";

const store = createPinia();

store.use(piniaPersistedState);

export default store;
