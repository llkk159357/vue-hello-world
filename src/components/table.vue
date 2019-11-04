<template>
    <div class="table">
   <table>
      <tr>
        <th>date</th>
        <th>name</th>
        <th>address</th>
        <th>操作</th>
      </tr>
     <tr v-for="item in lists" :key="item.id">
    <td>{{item.date}}</td>
    <td>{{item.name}}</td>
    <td>{{item.address}}</td>
    <td>编辑/删除</td>
     </tr>
 

   </table>
   <ul>
    <li v-for="n in 10" :key="n"  v-on:click="add(n)">{{n}}</li>
   </ul>
     <chart :items='items'></chart>
    </div>
</template>   
<script>
import axios from "axios";
import chart from "./chart";
export default {
  data: function() {
    return {
      currentpage: 1,
      lists: "",
      items: [
        { date: "星期一", count: 700 },
        { date: "星期二", count: 400 },
        { date: "星期三", count: 900 },
        { date: "星期四", count: 500 },
        { date: "星期五", count: 1200 }
      ]
    };
  },
  created: function() {
    this.fetchdata();
  },
  methods: {
    fetchdata: function() {
      axios
        .post(
          " https://www.easy-mock.com/mock/592501a391470c0ac1fab128/ms/table/list",
          {
            page: this.currentpage
          }
        )
        .then(res => (this.lists = res.data.list));
    },
    add: function(n) {
      this.currentpage = n;
      this.fetchdata();
    }
  },
  components: {
    chart
  }
};
</script>
<style scoped>
table {
  border: 1px solid grey;
}
td {
  border: 1px solid grey;
}

ul li {
  display: inline-block;
  margin: 0 15px;
}
</style>


