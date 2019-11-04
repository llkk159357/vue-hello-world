<template>
    <div>
    <video :src="list" controls class="video"></video>

    </div>
</template>
<script>
import axios from 'axios'
export default {
    data(){
       return{
           item:'',
           list:''
       }

    },
     created:function(){
        var id=this.$route.params.id
        id=id.split('=')[1]
        axios.get('http://127.0.0.1:3000/mv/detail?mvid='+id).then(res=>{
         this.item=res
          console.log(res)
         } )
        axios.get('http://127.0.0.1:3000/mv/url?id='+id).then(res=>{
             this.list=res.data.data.url
               console.log(res)
        })

     }


}
</script>
<style scoped>
    .video{
        width:400px;
    }


</style>


