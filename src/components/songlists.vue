<template>
    <div>
        <div> 15321600238
          <div>歌单</div> 
          <div>
           {{lists.playlist.name}}   
              
        </div> 
        <div class="count">
        <span>{{lists.playlist.playCount}}</span>
        <span>{{lists.playlist.commentCount}}</span>
        <span>{{lists.playlist.shareCount}}</span>
        </div>
        </div>
       <div v-for="(item,index) in lists.playlist.tracks" :key="item.id"  class="item" v-on:click="add(item)">
         <span class="index">{{index+1}}</span>
         <div>
         <div class="name">{{item.name}}</div>
         <div>{{item.ar[0].name}}-{{item.al.name}}</div>
         </div>
       </div>
    </div>
</template>
<script>
import axios from 'axios'

export default {
      data(){
       return{
          
       }
      },
      computed:{
       lists:function(){
         return this.$store.state.songlists
       }  
      },
      created:function(){
        var id=this.$route.params.id
      this.getsong()
      },
      methods:{
          add:function(item){
              this.$router.push({path:'/songdetail/'+item.id,params:{id:item.id}})
              this.$store.commit('play',{item:item})
           },
         getsong:function(){
             var id=this.$route.params.id
             this.$store.dispatch('getsonglist',{id:id})

           }
      }

}
</script>
<style scoped>
  .index{
      margin-right:15px;
  }
  .item{
      margin-bottom:15px;
      margin-left:10px;
      display: flex;
      align-items: center;
      border-bottom: 0.2px #e4e4e4 solid;
      padding-bottom: 8px;
  }
  
  .count{
      display: flex;
      justify-content: space-around;
  }
  .name{
      margin-bottom: 8px;
  }

 
</style>


