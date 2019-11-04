<template>
    <div class="box">
     
       <div  class="numwrapper">
        <div v-for="n in items.length+1"  class="num" :style="{bottom:100*(items.length-n+1)+'px'}" :key="n">
           {{300*(items.length-n+1)}} <span class="mark"></span><span class="standardline"></span>
        </div>
              </div>
  
        <div class="month">
           <span v-for="(item,index) in items" class="child"  :key="index">{{item.date}}</span>  
             
        </div>
        <div class="split">
         <span v-for="n in items.length"  class="line"  :key="n"></span>
        </div>
        <div  class="wrap">
          <span v-for="item  in items" :key="item.date" class="count"  :nnn="item.count"  :style="{height:item.count/3+'px'}">
        
        </span>
        </div>
      
     
    </div>
</template>
<script>
export default {
    data:function(){
        return{
        
        }
    },
    props:['items']
}
</script>
<style scoped>
  .box{
    margin:40px auto;
    position: relative;
    width:700px;
    height:500px;
    border-left:1.5px solid grey;
    border-bottom: 1.5px solid grey;
  }

 .month{
    position: absolute;
    left:0;
    bottom:-30px;
 }
 .child{
    margin:30px;
 }
.split{
    position: absolute;
    bottom: -30px;
    left:50px;
}
 .line{
   display: inline-block;
   width:3px;
   height:7px;  
   background:grey;
   margin:30px;
 }
 .count{
     display: inline-block;
     width:40px;
     margin:0 25px;
     background: orange;

 }
 .wrap{
    position:absolute;
    left:0;
    bottom: -5px;
 }

 .numwrapper{
     position: absolute;
     bottom: -10px;
     left:-50px;
     text-align: right;
 }
 .num{
     display:flex;
     align-items: center;
     justify-content: flex-end;
     position: absolute;

 }
 .mark{
     display: inline-block;
    width:5px;
    height:2px;
    background: grey;
    margin-left:10px;
 }
 .standardline{
    display: inline-block;
   width:700px;
   border-top:1px solid #e2e2e2;;   
   height: 2px;
 }
</style>


