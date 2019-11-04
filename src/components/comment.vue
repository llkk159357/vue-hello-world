<template>
        <div  class="comment">
         <div v-for="(item,index) in comments" class="item"  :key="index"> 
        <div  class="avatar">
        <img :src="item.user.avatarUrl" alt="">
        </div>
        <div class="wrapper">
        <div class="personal">
            <div>
           <span>{{item.user.nickname}}</span><br>
         <span>{{item.time|formatdate}}</span>
            </div>
      
         <span>{{item.likedCount}}</span>
        </div>
        <div class="content">
            {{item.content}}
        </div>
        </div>
         
        </div>
    
         </div>
</template>
<script>
export default {
     props:['comments']


}
</script>
<style scoped>
 .comment{
   
     background:white;
     padding:10px 10px;
    
    
 }

  .item{
      margin-bottom: 22px;
      display: flex;
      
    
  } 
   .avatar{
       margin-right:10px;
   }
  .avatar img{
   width:40px;
    height:40px;
   
    border-radius: 50%;
  }


  .personal{
    display: flex;
    justify-content: space-between;
  }
  .content{
      margin-top:10px;
      word-wrap: break-word;
  }

 .wrapper{
    width:88%;
 }


</style>

