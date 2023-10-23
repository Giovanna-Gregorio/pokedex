import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueToast from 'vue-toast-notification';

Vue.config.productionTip = false;

Vue.use(require('vue-moment'));
Vue.use(VueToast, {
  duration: 1500,
  position: 'top',
  iconPack: 'material' 
});

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')