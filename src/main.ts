import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
//import globalMixin from './globalMixin'

import { createPinia, setActivePinia } from "pinia"


gsap.registerPlugin(ScrollTrigger);

/*Vue.mixin({
  created: function () {
    this.gsap = gsap;
  }
});*/

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

app.mount('#app')
