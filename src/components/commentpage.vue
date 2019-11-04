<template>
    <div class="comment">
     
    <div>
     <h5>精彩评论</h5>  
     <comment :comments="comments.hotComments"></comment>  
    </div>
   <div>
    <h4>最新评论</h4>
    <comment ref="comment"  v-on:mousewheel.native="handlescroll" :comments="newcomments"></comment>
   </div>
   <div ref="loading" v-if="loading">
   loading...
   </div>
    </div>
</template>
<script>
import comment from './comment'
import axios from 'axios'
export default {
    data:function(){
        return{
        comments:'',
        newcomments:'',
        loading:true,
        items:[]
        }
    },
    created:function(){
        console.log(this.$route)
       axios.get("http://127.0.0.1:3000/comment/music?id=" + this.$route.params.id)
                .then(res => {
                this.comments = res.data;
                this.newcomments=res.data.comments

                 });
    },
    methods:{
     handlescroll:function(event){
         var distance=document.documentElement.offsetHeight-document.documentElement.scrollTop
         
           if(720<distance&&distance<740){
            var time=this.newcomments[this.newcomments.length-1].time
             axios.get("http://127.0.0.1:3000/comment/music?id=" + this.$route.params.id+'&before='+time)
                .then(res => {
                  
              this.newcomments= this.newcomments.concat(res.data.comments)
               
                 });  
           }

     },
      count: function(item) {
      var offsetx = item.offsetLeft;
      var offsety = item.offsetTop;

      item = item.offsetParent;
      while (item !== null) {
        offsetx += item.offsetLeft;
        offsety += item.offsetTop;

        item = item.offsetParent;
      }
      return [offsetx, offsety];
    },
    add:function(){
       this.items.push(5)
    }
    

    },
    components:{
        comment
    }
}
</script>
<style scoped>


</style>


