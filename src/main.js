import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import TypeNav from "@/components/TypeNav";
import store from "@/store";
import SliderLoop from "@/components/sliderLoop";
import "@/mock/mockServer";
import Pagination from "@/components/Pagination";

import * as API from "@/api";
// API.reqGoodsList({})
import { MessageBox, Message } from "element-ui";
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;

Vue.config.productionTip = false;
Vue.component("TypeNav", TypeNav);
Vue.component("SliderLoop", SliderLoop);
Vue.component("Pagination", Pagination);

// lazyload
import VueLazyload from "vue-lazyload";
import loading from "@/assets/images/rabit.gif";
// 在图片界面没有进入到可视范围前不加载, 在没有得到图片前先显示loading图片
Vue.use(VueLazyload, {
  // 内部自定义了一个指令lazy
  loading, // 指定未加载得到图片之前的loading图片
});


// validate 
import '@/vee-validate'

new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  el: "#app",
  render: (h) => h(App),
  router,
  store,
});
