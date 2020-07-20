import Vue from 'vue'
import App from './App'
import Request from '@/js_sdk/luch-request/luch-request/index.js' // 下载的插件
// import Request from 'luch-request' // 使用npm
import qs from "qs";
Vue.prototype.$qs = qs;

const http = new Request();
Vue.prototype.$http = http

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
