<template>
    <div>
      <audio :src="item.data[0].url" controls></audio>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data:function(){
       return{
           item:''
       }
    },
     created:function(){
      var id = this.$route.params.id;
    axios.get("http://127.0.0.1:3000/song/url?id=" + id).then(res => {
      this.item = JSON.parse(res.request.response);
    }); 
 

     }
}
</script>
<style scoped>
  




</style>


