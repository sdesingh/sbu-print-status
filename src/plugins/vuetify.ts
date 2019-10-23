import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdi"
  },
  theme: {
    themes: {
      light: {
        primary: "#960000",
        success: "#28a745",
        warning: "#fd7e14",
        error: "#dc3545",
        info: "#343a40"
      },
      dark: {
        primary: "#2b2b2b",
        success: "#20bf6b",
        warning: "#ffa801",
        error: "#f53b57",
        info: "#485460"
      }
    }
  }
});
