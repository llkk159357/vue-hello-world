<template>
    <div class="nav">
     <span class="el-icon-s-tools"></span>
     <div class="inner">
         <span>我的</span>
         <span>发现</span>
         <span>朋友</span>
         <span>视频</span>
     </div>

     <span class="el-icon-search search" v-on:click="search" ></span>
    </div>
</template>
<script>
export default {
    methods:{
      search:function(){
         this.$router.push('/search')
      }


    }
}
</script>
<style scoped>
    .nav{
        display: flex;
        justify-content: space-between;
        margin:15px 0;
        font-size: 18px;
    }
  .inner span{
     margin:0 20px;
  }
  

</style>


