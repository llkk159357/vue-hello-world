import vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
vue.use(Vuex)

 export default new Vuex.Store({
         state:{
         current:'',
         playmode:'random',
         songlists:'',
         items:[]
         },
         mutations:{
           changemode:function(state,payload){
             state.playmode=payload.mode

          },
          play:function(state,payload){
             state.current=payload.item
          },
         getsonglist:function(state,payload){

           axios.get('http://127.0.0.1:3000/playlist/detail?id='+payload.id).then(res=>
             state.songlists=res.data)
         },
         savehistory:function(state,payload){
              console.log(payload.item)
              
             state.items.push(payload.item)
             localStorage.setItem('history',JSON.stringify(state.items))
         },
         gethistory:function(state){
           state.items=JSON.parse(localStorage.getItem('history'))
         },
         remove:function(){
           localStorage.setItem('history',null)
         }
         
         },
         actions:{
          getsonglist:function({commit},payload){
           commit('getsonglist',payload) 
        
          },
        savehistory:function({commit},payload){
             commit('savehistory',payload)
        },
        gethistory:function({commit}){
          commit('gethistory')
        },
        remove:function({commit}){
      
        },
        toplay:function({commit},payload){
              commit('play',payload)
        }
         }


 })