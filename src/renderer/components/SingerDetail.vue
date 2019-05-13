<template>
  <div class="singer-detail">
    <div class="header" :style="{backgroundImage:'url('+data.singerImg+')'}">
      <p>{{data.singer_name}}</p>
    </div>
    <div class="songs">
      <ul>
        <li v-for="(item, index) in data.list" :key="index">
          <p>{{item.musicData.songname}}</p>
          <p>{{item.musicData.albumname}}-{{item.musicData.singer[0].name}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { singerDetail } from "@/request/api"; // 导入我们的api接口
import axios from 'axios'
let getPlay = {
  comm: {
    format: "json",
    g_tk: 5381,
    inCharset: "utf-8",
    needNewCode: 1,
    notice: 0,
    outCharset: "utf-8",
    platform: "h5",
    uin: 0
  },
  req_0: {
    module: "vkey.GetVkeyServer",
    method: "CgiGetVkey",
    param: {
      guid: "5741524946",
      loginflag: 0,
      platform: "23",
      songmid:[],
      songtype:[],
      uin: "0"
    }
  }
};
export default {
  name: "singerDetail",
  data() {
    return {
      data: {
        singer_mid: "0025NhlN2yWrP4"
      }
    };
  },
  mounted() {
    this.getSingerDetail();
  },
  methods: {
    getSingerDetail() {
      singerDetail(this.$route.params.id).then(res => {
        res = res.substring(5, res.length - 1);
        this.data = JSON.parse(res).data;
        this.data.singerImg = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${this.data.singer_mid}.jpg?max_age=2592000`;
        this.data.list.forEach(e => {
            getPlay.req_0.param.songmid.push(e.musicData.songmid)
            getPlay.req_0.param.songtype.push(0)
        })
        axios({
            method:'post',
            url:'http://ustbhuangyi.com/music/api/getPurlUrl',
            data:getPlay
        }).then(res => {
            console.log(res);
            
        })
      })
    }
  }
};
</script>

<style scoped>
.header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.songs {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  padding: 30px;
  background-color: #222;
}

.songs ul li {
  margin-bottom: 30px;
  cursor: pointer;
}

.songs ul li p {
  margin: 0;
  padding: 0;
}

.songs ul li p:nth-child(1) {
  color: #fff;
  font-size: 1rem;
}

.songs ul li p:nth-child(2) {
  margin-top: 5px;
  color: rgba(255, 255, 255, 0.3);
  font-size: 0.9rem;
}
</style>
