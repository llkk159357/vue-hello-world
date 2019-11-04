<template>
    <div>
55555555555555
    <div v-for="item in lists.data" :key="item.id" v-on:click="add(item.id)">
       {{item.name}}
    </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return{
            lists:""
        }
    },
    created:function(){
      axios.get('http://127.0.0.1:3000/mv/all').then(res=>{
           this.lists=JSON.parse(res.request.response)
           console.log(JSON.parse(res.request.response))
      })


    },
    methods:{
        add:function(id){
          this.$router.push({path:'/video/id='+id,id})
        }
    }
}
</script>
<style>




</style>

