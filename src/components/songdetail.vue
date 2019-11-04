<template>
    <div ref="root" class="root"  v-on:dragenter.prevent="handledrag" v-on:dragover.prevent="handledrag" v-on:drop.prevent="handledrag" >
        <div >
  <audio :src="url"  id="player"  ref="player"  v-on:loadstart="loadstart"   v-on:canplaythrouth="complete"   v-on:progress="progress"  v-on:volumechange="volumechange" v-on:timeupdate="gettime"   v-on:play="runplay"   v-on:ended="end"   v-on:canplay="canplay"></audio>
        </div>
     
     <div class="content" v-if="lyricmode">

     <div class="author" >
        <span   class="name" >{{singername}}</span>   
        <span >{{current.name}}</span>
      </div>
     
     
      <div class="circle" ref="circle">
          <img :src="imgurl" alt="">
      </div>
      <div class="wrapper">
    <div class="lyric" ref="lyric" id="lyric" >
        <div v-for="(item,index) in newlyric" :key="index"    v-if="index==i">
        <span>{{item}}</span>
        </div>
      </div>
      </div>
    </div>
       <div v-else>
          <div class="voice">
           <span>调音量</span>

          <div  class="volume" ref="volume"   v-on:dragenter.prevent="handledrag" v-on:dragover.prevent="handledrag" v-on:drop.prevent="handledrag"   v-on:click="changevoice">
        
          <span class="voiceball" ref="ball"  draggable="true" v-on:drag="dragvolume" v-on:dragend="dragendvolume"></span>
           </div>
         
         </div>
         <div   class="lyricwrapper">
       
        <div   class="lyricmode" ref='item' >
        <div v-for="(item,index) in newlyric" ref='list'   :class="{greenedlyric:index===i}"     :key="index" class="list">
        <span  v-if="item.length>0"  class="currentlyric"   > {{item.slice(item.lastIndexOf(']')+1)}}</span>
        </div>
      </div>
   
       </div>
       </div>
   
      <div class="control">
    <span class="currenttime">{{currenttime|formattime}}</span>

      <div class="line" ref="line"   v-on:click="setposition"  v-on:dragenter.prevent="handledrag" v-on:dragover.prevent="handledrag" v-on:drop.prevent="handledrag" >
        <span class="progress" :style="{width:currenttime*300/total+'px'}"></span>
         <span class="ball" id="ball"  v-on:drag="drag" v-on:dragend='dragend' ></span> 
        </div> 

     <span class="duration">{{time|formattime}}</span>
      </div>
     
      <button v-on:click="pause"  class="pause">pause</button>
    <button v-on:click="play" class="play">play</button>
       <div class="mode">
         <span v-on:click="playmode1">单曲循环</span>
         <span v-on:click="playmode2">顺序播放</span>
         <span v-on:click="playmode3">随机播放</span>
       </div>
   
     <div class="bgc">
       <img :src="imgurl" alt="">
     </div>
      <p  class="lookupcomment" v-on:click="getcomment">歌曲评论</p>
     <div  v-on:click="golyric"  class="lyricpart">
      看歌词
     </div>
      
    </div>
 
</template>
<script>
import axios from "axios";
import Vue from "vue";
import { constants } from "fs";
import { spread } from 'q';

export default {
  data() {
    return {
      url: "",
      lyric: "",
      time: "",
      currenttime: 0,
      total: "",
      iscomment: false,
      comments: "",
      lyricmode: true,
      ismove: "",
      i: "",
      item: "",
      currentlyric:''
    };
  },
  computed: {
  
    singername: function() {
      return this.current.al.name;
    },
    imgurl: function() {
      return this.current.al.picUrl;
    },
    playmode: function() {
      return this.$store.state.playmode;
    },
    songlists: function() {
      return this.$store.state.songlists;
    },
    current: function() {
      return this.$store.state.current;
    },
    newlyric: function() {
      var arr = this.lyric.split("\n");
      var arr1 = [];
      var arr2 = [];
      for (var i = 0; i < arr.length; i++) {
        var index = arr[i].lastIndexOf("]");

        arr1.push(arr[i].slice(0, index + 1));
        arr2.push(arr[i].slice(index + 1));
      }

      return arr2;
    },
    lyrictime: function() {
      var arr = this.lyric.split("\n");
      var arr1 = [];
      for (var i = 0; i < arr.length; i++) {
        var index = arr[i].lastIndexOf("]");

        arr1.push(arr[i].slice(1, index));
      }
      return arr1;
    }
  },

  created: function() {
    var id = this.$route.params.id;
    axios.get("http://127.0.0.1:3000/song/url?id=" + id).then(res => {
      this.url = res.data.data[0].url;
      console.log(res.data.data[0].url);
    });
    var self = this;
    axios.get("http://127.0.0.1:3000/lyric?id=" + id).then(function(res) {
      self.lyric = res.data.lrc.lyric;
    });
    axios
      .get("http://127.0.0.1:3000/song/detail?ids=" + this.$route.params.id)
      .then(res => {
        console.log(res.data.songs[0]);
        this.item = res.data.songs[0];
      });
    console.log(this.current);
  },
  mounted: function() {},

  watch: {},

  methods: {
    loadstart:function(){
       var player = document.getElementById("player");
       console.log(player.constructor.prototype)
    },
    complete:function(){
        var player = document.getElementById("player");
      console.log(player.played)
     console.log('okok')
    },
    progress:function(){
        var player = document.getElementById("player");
      
         console.log(this.$refs.player.buffered.end(0))
          console.log(player.played)
       console.log('plpl')
    },
    dragvolume: function(event) {
      var distance = event.clientX - this.count(this.$refs.volume)[0];
      this.$refs.ball.style.left = distance + "px";
      console.log("drag");
    },
    dragendvolume: function(event) {
      var distance = event.clientX - this.count(this.$refs.volume)[0];
      this.$refs.ball.style.left = distance + "px";
    
    },

    canplay: function() {
      var player = document.getElementById("player");
      this.time = player.duration;
      var ball = document.getElementById("ball");
      player.play();
      player.volume = 0.8;

      this.total = player.duration;
      var lyric = document.getElementById("lyric");
      console.log(lyric.offsetHeight);

      var totaltime = 0;
      totaltime += player.currentTime;
    },
    end: function() {
      this.$refs.circle.style.animationPlayState = "paused";
      var player = document.getElementById("player");
      var self = this;
      if (this.playmode === "single") {
        player.play();
      } else if (this.playmode === "random") {
        var num = Math.floor(
          Math.random() * this.songlists.playlist.tracks.length
        );
      

        var id = this.songlists.playlist.tracks[num].id;
        axios
          .get("http://127.0.0.1:3000/song/url?id=" + id)
          .then(res => (this.url = res.data.data[0].url));

        this.$store.commit("play", {
          item: this.songlists.playlist.tracks[num]
        });

        axios.get("http://127.0.0.1:3000/lyric?id=" + id).then(function(res) {
          self.lyric = res.data.lrc.lyric;
          player.play();
        });
      } else {
        for (var i = 0; i < this.songlists.playlist.tracks.length; i++) {
          if (this.$route.params.id == this.songlists.playlist.tracks[i].id) {
            break;
          }
        }
        var id = this.songlists.playlist.tracks[i + 1].id;
        axios
          .get("http://127.0.0.1:3000/song/url?id=" + id)
          .then(res => (this.url = res.data.data[0].url));

        this.$store.commit("play", {
          item: this.songlists.playlist.tracks[i + 1]
        });

        axios.get("http://127.0.0.1:3000/lyric?id=" + id).then(function(res) {
          self.lyric = res.data.lrc.lyric;
          player.play();
        });
      }
    },
    runplay: function() {
      this.$refs.circle.style.animationPlayState = "running";
    },

    pause: function() {
      var player = document.getElementById("player");
      player.pause();
      this.$refs.circle.style.animationPlayState = "paused";
    },
    play: function() {
      var player = document.getElementById("player");
      player.play();
    },
    gettime: function() {
      

      this.currentlyric=this.newlyric[this.i]


      var player = document.getElementById("player");

      this.currenttime = player.currentTime;

      var ball = document.getElementById("ball");

      ball.style.left = (player.currentTime * 300) / player.duration + "px";

      for (var i = 0; i < this.lyrictime.length; i++) {
        if (
          this.currenttime.toFixed() ==
          this.processtime(this.lyrictime[i]).toFixed()
        ) {
          this.i = i;

          break;
        }
      }

      if (this.lyricmode === false) {
        var height = this.$refs.item.offsetHeight;
        var distance = height / this.lyrictime.length;

        for (var i = 0; i < this.lyrictime.length; i++) {
          if (
            this.currenttime.toFixed() ==
            this.processtime(this.lyrictime[i]).toFixed()
          ) {
            this.$refs.item.style.transition =
              "transform " + 0.8 + "s " + "linear";

            this.$refs.item.style.transform =
              "translateY(-" + i * distance + "px)";
            this.i = i;
           
            break;
          }
        }
      }
    },
    drag: function(event) {
      var arr = this.count(this.$refs.line);

      var ball = document.getElementById("ball");
      ball.style.left = event.clientX - arr[0] + "px";
    },
    dragend: function(event) {
      var arr = this.count(this.$refs.line);

      var ball = document.getElementById("ball");
      ball.style.left = event.clientX - arr[0] + "px";
    },

    handledrag: function(event) {},
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

    setposition: function(event) {
      var player = document.getElementById("player");
      var total = player.duration;
      var arr = this.count(this.$refs.line);
      var ball = document.getElementById("ball");
      ball.style.left = event.clientX - arr[0] + "px";

      player.currentTime = (event.clientX - arr[0]) * (player.duration / 200);
    },
    getcomment: function() {
      var id = this.$route.params.id;
    
      this.$router.push("/comment/" + id);
    },
    playmode1: function() {
      this.$store.commit("changemode", { mode: "single" });
    },
    playmode2: function() {
      this.$store.commit("changemode", { mode: "order" });
    },
    playmode3: function() {
      this.$store.commit("changemode", { mode: "random" });
    },
    golyric: function() {
      this.lyricmode = !this.lyricmode;
    },
    handletime: function(value) {
      var part1;
      var part2;
      var part3;

      if (value < 10) {
        return "00:" + "0" + value.toFixed(3);
      } else if (10 < value && value < 60) {
        return "00:" + value.toFixed(3);
      } else {
        var num = value - parseInt(value / 60) * 60;
        part1 = "0" + parseInt(value / 60) + ":";
        part2 =
          num > 10
            ? (value - parseInt(value / 60) * 60).toFixed(3)
            : "0" + (value - parseInt(value / 60) * 60).toFixed(3);

        return part1 + part2;
      }
    },
    processtime: function(value) {
      var index = value.indexOf(":");
      var str1 = value.slice(1, index);
      var index2 = value.indexOf(".");
      var str2 = value.slice(index + 1, index2);

      var str3 = value.slice(index2 + 1);
      return Number(str1 * 60) + Number(str2) + Number("0." + str3);
    },
    changevoice: function(event) {
      var player = document.getElementById("player");
      var distance = event.clientX - this.count(this.$refs.volume)[0];
      player.volume = (1 / 240) * distance;
      this.$refs.ball.style.left = distance + "px";
    },
    volumechange: function() {},

    changetime(value) {
      var index1 = value.indexOf(":");
      var index2 = value.indexOf(".");
      return (
        Number(value.slice(1, index1))* 60 +
        Number(value.slice(index1 + 1, index2)) +
        Number("0." +
        value.slice(index2 + 1))
      );
    }
  },
  components: {}
};
</script>
<style scoped>
.circle img {
  height: 300px;
  border-radius: 50%;
}
.line {
  height: 2px;
  width: 300px;
  background: #e4e4e4;
  border-radius: 15px;
  position: relative;
}
.progress {
  height: 2px;
  background: green;
  position: absolute;
  left: 0;
  top: 0px;
  border-radius: 15px;
}
.author {
  margin-bottom: 22px;
}

.ball {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: white;
  position: absolute;
  left: 0;
  top: -3.5px;
}
.author {
  text-align: center;
}
.name {
  margin-right: 15px;
}
@keyframes move {
  0% {
    transform: translate(0px);
  }
  100% {
    transform: translate(300px);
  }
}

.control {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 25px;
}
.duration {
  margin-left: 10px;
}

.wrapper {
  width: 240px;
  height: 20px;
  overflow: hidden;
  margin: 10px auto;
  margin-bottom: 20px;
  text-align: center;
  font-size: 17px;
  color: #e4e4e4;
}
.root {
  position: relative;
  z-index: 2;
  height: 100%;
}
.content {
  position: relative;
  z-index: 10;
  height: 100%;
  width: 100%;
  margin-top: 40px;
}
.bgc {
  height: 100%;
  width: 100%;
  filter: blur(70px);
  position: absolute;
  z-index: -3;
  left: 0;
  top: 0;
}
.bgc img {
  width: 100%;
  height: 100%;
}

.circle {
  text-align: center;
  animation: circle 20s linear infinite;
  margin-bottom: 40px;
  box-sizing: border-box;
}
@keyframes circle {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
.currenttime {
  margin-right: 10px;
  display: flex;
  align-items: center;
}

.v-enter {
  transform: translate(100%);
}
.v-enter-active {
  transition: transform 1s;
}

.lookupcomment {
  position: relative;
  z-index: 15;
}
.play,
.pause {
  margin: 0 15px;
}
.mode span {
  margin: 0px 10px;
}
.mode span {
  margin-top: 10px;
  position: relative;
  z-index: 18;
}
.lyricwrapper {
  position: relative;
  z-index: 18;
  height: 310px;
  overflow: hidden;
  text-align: center;
  width: 100%;
  margin: 60px auto;
  color: grey;
}
.lyricmode {
  margin-top: 20px;
}
.move {
  animation: move 0.3s linear;
}
@keyframes move {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-20px);
  }
}

.lyricpart {
  position: relative;
  z-index: 10;
}
.list {
  margin: 24px 0;

}

.greenedlyric {
  color: white; 
}
.volume {
  display: inline-block;
  width: 240px;
  height: 3px;
  border-radius: 10%;
  background: white;
  margin-left: 15px;
  background: white;
  position: relative;
}
.voice {
  margin-top: 15px;
  position: relative;
  z-index: 18;
  display: flex;
  align-items: center;
}

.voiceball {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: white;
  position: absolute;
  left: 0;
  top: -3px;
  z-index: 22;
}
</style>

