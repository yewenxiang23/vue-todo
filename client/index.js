import Vue from 'vue'
import App from './app.vue'
import './assets/styles/global.css'
const root = document.createElement('div')
document.body.appendChild(root)

let v = new Vue({
  el: root,
  components: {App},
  // template:'<App/>'
  render: h => h(App)
})
Vue.use({
  v
})
