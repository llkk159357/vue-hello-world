<template>
    <div>
     <div>
       <h3>单曲</h3>  
       <div>
        <div v-for="(item,index) in lists" :key="index"  v-if="index<5"  v-on:click="toplay(item)">
           <div>
            {{item.name}}
            </div>  
            <div>
              <span>{{item.album.name}}</span><span>{{item.artists[0].name}}</span>
            </div>
        </div>    
       </div>
     </div>
    </div>
</template>
<script>
import axios from 'axios'

export default {
    data:function(){
      return {
          lists:'',
          item:''
      }
    },
    created:function(){
     axios.get('http://127.0.0.1:3000/search?keywords='+this.$route.params.id)
         .then(res=>
         this.lists=res.data.result.songs
          
         )
      axios.get('http://127.0.0.1:3000/song/detail?ids='+this.$route.params.id).then(res=>{
        console.log(res)
          this.item=res.data.songs[0]
         })  
     

    },
    methods:{
    toplay:function(item){
        this.$router.push({path:'/songdetail/'+item.id,params:{id:item.id}})
         
        this.$store.commit('play',{item:this.item})
    }
    }

}
</script>
<style scoped>
 



</style>



