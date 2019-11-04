<template>
   <div>
   55555555555
   {{lists.code}}
    <div v-for="(item,index) in lists.tags" :key="index"  v-on:click="add(item.id)">
        {{item.name}}

    </div>
   </div>

</template>
<script>
import axios from 'axios'


export default {
    name:'singer',
    data(){
     return{
         lists:''
     }   
    },
    created:function(){
     axios.post(' https://www.easy-mock.com/mock/592501a391470c0ac1fab128/ms/table/list',{
        page:1
     }).then(res=>
     console.log(res)
     )
      
      var self=this
      axios.get('http://127.0.0.1:3000/playlist/hot').then(function(res){
     
        var aaa=JSON.parse(res.request.response)
     
      self.lists=JSON.parse(res.request.response)
    })
  
    },
  mounted:function(){
       
      
    },
    methods:{
    add:function(id){
        this.$router.push({path:'/song/id='+id,params:{id:id}})
    }

    }

}
</script>
<style>






</style>


