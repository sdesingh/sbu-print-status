import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { UI_State } from "./store/ui/ui_state";
import { RootState } from "./store/types";
import { Data_State } from "./store/data/data_state";

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {
    version: "0.0.1",
    devMode: false
  },
  modules: {
    ui: UI_State,
    data: Data_State
  }
};

export default new Vuex.Store<RootState>(store);
