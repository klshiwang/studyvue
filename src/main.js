import Vue from 'vue'
import App from './App.vue'
import router from './router'


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import navs from './components/navs.vue';
import VueQuillEditor from 'vue-quill-editor'

//require styles
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';


Vue.use(VueQuillEditor);

Vue.use(ElementUI);

Vue.config.productionTip = false


Vue.component('navlist',navs);



new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


