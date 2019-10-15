import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  themes: {
    light: {
      primary: '#e74c3c',
    },
    dark: {
      primary: '#e74c3c',
    }
  }
});
