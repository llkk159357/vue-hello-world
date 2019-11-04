<template>
    <div>
     <navbar></navbar>
     <div class="swiper">
      <swiper :options="swiperOptions">
       <swiper-slide  v-for="(item,index) in lists" :key="index" >
        <img :src="item.pic" alt="">

       </swiper-slide>
          <div class="swiper-pagination"  slot="pagination"></div>
      </swiper>
     </div>
     <div>
     <div>
       推荐歌单 
     </div>
        <div>
          <ul>
            <li v-for="(item,index) in recmend" :key="index"  v-on:click="add(item.id)">
              <div>
                <img :src="item.picUrl" alt="">
              </div>
               <div class="description">
                {{item.name}}
               </div>
            </li>
          </ul>
        </div>
     </div>
     

    </div>
</template>
<script>
import axios from 'axios'
import navbar from './nav'
export default {
    data(){
        return{
            swiperOptions:{
             pagination:{
                el: '.swiper-pagination'
             },
                //循环
                loop:true,
            },
            lists:'',
            items:'',
            hot:'',
            recmend:''
        }
    },
    created:function(){
        var self=this
         axios.get('http://localhost:3000/banner?type=2').then(res=>{
          self.lists=res.data.banners
         
         })
         axios.get('http://localhost:3000/playlist/catlist').then(res=>{
          self.items=res.data.banners
       
         
         }) 
         axios.get('http://localhost:3000/playlist/hot').then(res=>{
          self.hot=res.data.banners
         
         }) 
          axios.get('http://localhost:3000/personalized').then(res=>{
          this.recmend=res.data.result
        
         
         }) 


    },
    methods:{
        add:function(id){
            this.$router.push({path:'/songlists/'+id,params:{id:id}})
        }
    },
    components:{
        navbar
    }
}
</script>
<style scoped>
   img{
     max-width:414px;
   }
   li{
  display: inline-block;
  width:32%;
  margin-right:3px;
   }
   li img{
       max-width: 100%;
   }
  .description{
    font-size: 12px;
  }
 ul{
     display: flex;
     flex-direction: row;
    justify-content: space-between;
    flex-flow: row wrap;
 }
</style>


