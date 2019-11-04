import Vue from 'vue'
import App from './App.vue'
import router from './route'
import store from './store'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import echarts from 'echarts'

Vue.prototype.$echarts=echarts

// require styles
import 'swiper/dist/css/swiper.css'
Vue.use(ElementUI)


Vue.use(VueAwesomeSwiper, /* { default global options } */)

Vue.config.productionTip = false

Vue.filter('formattime',function(value){
      var part1=parseInt(value/60)
      var part2=Math.round(value-part1*60)
      if(part2<10){
        part2='0'+part2
      }
      return part1+":"+part2
       
})

Vue.filter('formatdate',function(value){
      var date=new Date(value)
          var year=date.getFullYear()
          var month=date.getMonth()
          var day=date.getDay()
      return  year+'年'+month+'月'+day+'日'
})

Vue.filter('handletime',function(value){
      var part1;
      var  part2;
       var   part3;

    if(value<10){
          return '00:'+'0'+value.toFixed(3)
    }else if(10<value&&value<60){
          return '00:'+value.toFixed(3)
    }else{
       var num=value-parseInt(value/60)*60
          part1='0'+parseInt(value/60)+':'
          part2= num>10? (value-parseInt(value/60)*60).toFixed(3): '0'+ (value-parseInt(value/60)*60).toFixed(3)

   return  part1+part2
    

    }
    
})



new Vue({
  store,
  router,
 render: h => h(App)

}).$mount('#app')
