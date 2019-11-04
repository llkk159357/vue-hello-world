<template>
    <div class="content">
   <div class="wrapper">
   <span class="el-icon-back"></span>    
   <input type="text"  v-model="word" v-on:keyup.enter="search">
   </div>
   <div v-if="lists.length>0" class="result">
     <div v-for="(item,index) in lists" :key="index" class="searchlist" v-on:click="tosearchpage(item)" >
      <span class="el-icon-search"></span>
      <span>{{item.name}}</span><span>{{item.artists[0].name}}</span>
     
    </div>  
   </div>
   <div class="historywrapper">
    <div class="history">
    <span>历史记录</span>
    <span class="el-icon-delete" v-on:click="alert"></span>
    </div>
    <div class="pop" v-if="showalert">
    <div>
     确定清空全部历史记录？
    </div>
    <div class="controls">
    <span class="concell" v-on:click="concell">取消</span>
     <span class="remove" v-on:click="remove">清空</span> 
    </div>
    </div>
    <div class="detail">
     <span v-for="(item,index) in arr" :key="index" v-on:click="gosearchpage(item)"  class="item">{{item.name}}</span>   
    </div>
    
   </div>
    </div>
</template>
<script>
import axios from 'axios'

export default {
          data(){
          return{
              word:'',
              lists:'',
              arr:[],
              showalert:false
          }
    },
    computed:{
      items:function(){
        return this.$store.state.items

      }
    },
    created:function(){
       this.gethistory()
    },
     methods:{
         search:function(){

         axios.get('http://127.0.0.1:3000/search/suggest?keywords='+this.word).then(res=>{
             this.lists=res.data.result.songs
          console.log(res)
         })
         
       
       
           
         },
        gethistory:function(){
            console.log(localStorage.getItem('history'))
             if(localStorage.getItem('history')!==null){
               
                 this.arr=JSON.parse(localStorage.getItem('history'))
             }else{
                 this.arr=[]
             }
        },
        alert:function(){
           this.showalert=!this.showalert
        },
        concell:function(){
            this.showalert=false
        },
        remove:function(){
           localStorage.removeItem('history')
            this.showalert=false
            this.arr=[]
        },
        tosearchpage:function(item){

             this.arr.push({name:item.artists[0].name,id:item.id})

               localStorage.setItem('history',JSON.stringify(this.arr))
            this.$router.push({path:'/searchpage/'+item.id,params:{id:item.id}})
        },
        gosearchpage:function(item){
            this.$router.push({path:'/searchpage/'+item.id,params:{id:item.id}})  
        }
     }
}
</script>
<style scoped>
  .history{
      display: flex;
      justify-content: space-between;
      margin-top:15px;
      margin-bottom: 10px;
      align-items: center;
  }
  .item{
    margin:0 8px;
    border-radius: 35%;
    background: #e4e4e4;
    padding: 6px;
  }
   input{
    width:220px;
    margin-left:15px;
    height:25px;
  }
  .wrapper{
      margin-top:8px;
      display: flex;
      align-items: center;
  }
  .el-icon-back{
      font-size: 30px;
     
  }
   
  .pop{
    width:240px;
    height:60px;
    position: absolute;
    left:25%;
    top:60%;
    background: white;
    padding: 10px;
    border: 1px solid grey;
    border-radius: 10px;
  }

  .content{
      position: relative;
      height:100%;
  }
  .controls{
      margin-top:20px;
      display: flex;
      justify-content: flex-end;
  }
  .remove{
      margin-left:15px;
  }
  .remove,.concell{
      color:red;
  }
  .result{
    border:1px solid grey;
    background: white;
    position: absolute;
    z-index: 10;
    width:380px;


  }
  .searchlist{
    margin:18px 0;
    width:100%;
  }
</style>


 