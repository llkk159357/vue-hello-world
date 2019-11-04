<template>
<div>
    <div>
        {{x}}--{{y}}
    </div>
 <div class="box">
       
   <div class="wrapper"  v-on:dragover.prevent  v-on:dragenter.prevent   v-on:drop.prevent="add2">
      <div v-for="item in items2" :key="item" :id="item"  class="item"  ref="item"  draggable="true"  v-on:drag="drag"  v-on:dragend="dragend"  v-on:dragstart="dragstart" >
          {{item}}
      </div>
      </div>
    </div>
</div>
   
</template>
<script>
export default {
   data:function(){
     return{
         items1:[
            1,2,3,4,5,
         ],
         items2:[
             6,7,8,9,10
         ],
         num:'',
         x:'',
         y:'',
         distancex:'',
         distancey:''
         
     }
   },
   methods:{
        
       add:function(){
        this.items1.push(this.num)
        console.log(this.num)
        var index=this.items2.indexOf(this.num)
        this.items2.splice(index,1)
       },
       dragstart:function(event){
          var id=event.target.id
          console.log()
          
          var index=this.items2.indexOf(Number(id))
          
          this.distancex=event.pageX-this.count(this.$refs.item[index])[0]
          this.distancey=event.pageY-this.count(this.$refs.item[index])[1]

         console.log(this.distancex,this.distancey)
          
       },
        drag:function(event){
            var index=this.items2.indexOf(Number(event.target.id))
         var item=this.$refs.item[index] 
           
            item.style.top=event.pageY-this.distancey+'px'

        },
        dragend:function(){
          var index=this.items2.indexOf(Number(event.target.id))
         var item=this.$refs.item[index] 
          
            item.style.top=event.pageY-this.distancey+'px'
        },

       remove:function(){
     
       },
       add2:function(){
        var index=this.items2.indexOf(this.num)
         
      
       },
       count:function(item){
          
            var offsetx=item.offsetLeft
            var offsety=item.offsetTop
            
           item=item.offsetParent  

           while(item!==null){
 
              offsetx+=item.offsetLeft
              offsety+=item.offsetTop   
            
                 item=item.offsetParent 
           }
           return [offsetx,offsety]
       }
   }
    
}
</script>
<style scoped>
  
  .wrapper{
    
    width:300px;
    height:600px;
    border: 1px solid grey;
    margin-top:30px;
    padding:0 10px;
    margin:0 15px;
  }
 .item{
    width:200px;
    height:60px;
    border:1px solid grey;
    margin: 13px 0;
    position: absolute;
 }
</style>


