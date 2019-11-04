<template>
    <div>
      <div v-for="item in lists.playlist.tracks" :key="item.id" v-on:click="add(item.id)" >
        {{item.name}}
      </div>

    </div>

</template>
<script>
import axios from 'axios'
import { constants } from 'fs';
export default {
    data(){
        return{
            lists:''
        }
    },
    created:function(){
      var index=this.$route.params.id
      index=index.split('=')[1]
       axios.get('http://127.0.0.1:3000/playlist/detail?id='+index).then(res=>{
            this.lists=JSON.parse(res.request.response)
         console.log(JSON.parse(res.request.response))
     } )
    },
    methods:{
        add:function(id){
           this.$router.push({path:'/songdetail/id='+id,id})

        }
    }
}
</script>
<style>


</style>


   