import "babel-polyfill";

import Vue from 'vue'
import App from '@/vue/App'

import store from '@/vue/store';

new Vue({
    el: '#app',
    store,
    render: h => h(App)
})
