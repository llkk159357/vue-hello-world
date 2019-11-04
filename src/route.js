import vue from 'vue'
import Router from 'vue-router'
import singer from './components/singer'
import './components/singer'
import song from './components/song'
import songabout from './components/songdetail'
import mv from './components/mv'
import video from './components/video'
import home from './components/home'
import songlists from './components/songlists'
import commentpage from './components/commentpage'
import search from './components/search'
import searchpage from './components/searchpage'
import box from './components/box'
import table from './components/table'
import chart from './components/chart'
import echart from './components/echart'
vue.use(Router)

  export default new Router({
     routes:[
      {
        path:'/',
        component:home

      },
     {
     path:'/singer',
    
     component:singer,
    
     },
     {
       path:'/song/:id',
       component:song
     } ,
     {
       path:'/songdetail/:id',
       component:songabout
     },
     {
       path:'/mv/',
       component:mv
     },
     {
       path:'/video/:id',
       component:video
     },
     {
       path:'/songlists/:id',
       component:songlists
     },
     {
       path:'/comment/:id',
       component:commentpage
     },
     {
       path:'/search',
       component:search
     },
     {
       path:'/searchpage/:id',
       component:searchpage
     },
     {
      path:'/box/:id',
      component:box
     },
     {
       path:'/table',
       component:table
     },
     {
       path:'/chart',
       component:chart
     },
     {
       path:'/echart',
       component:echart
     }
     ]

  }) 

  


