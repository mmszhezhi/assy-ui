<template>
  <div>
    <p class="font-monospace"> 制订单:{{ this.selectedOrder.no }} 总数：{{ rows.length }}</p>
    <p class="font-monospace"> 当前位置{{ locMap[selected] }}数量：{{ frows.length }}</p>
    <select name="fc" id="fc" v-model="selected" class="form-select form-select-lg mb-3 select-lab"
            aria-label=".form-select-lg example">
      <option v-for="(item,i) in filters" :key="'step-'+i" :value="item">{{ locMap[item] }}</option>

    </select>
  </div>
  <div class="step-tb table-responsive">
    <table class="table table-hover">
      <thead>
      <tr>
        <th scope="col" style="width: 3%">#</th>
        <th scope="col" style="width: 8%">瓶身码</th>
        <!--        <th scope="col" style="width: 5%"></th>-->

        <th scope="col" style="width: 5%">状态</th>
        <th scope="col" style="width: 10%">位置</th>
        <th scope="col" style="width: 10%">时间</th>
        <th scope="col" style="width: 10%">名称</th>

        <!--        <th scope="col" style="width: 5%">模式</th>-->
        <!--        <th scope="col" style="width: 5%">类型</th>-->
        <!--        <th scope="col" style="width: 20%">参数</th>-->
      </tr>
      </thead>
      <tbody>
      <tr v-for="(r, i) in frows" :key="'step-'+i">
        <th scope="row">{{ i + 1 }}</th>
        <td>{{ r.bottleCode }}</td>
        <td>{{ r.status }}</td>
        <td>{{ locMap[r.loc] }}</td>
        <td>{{ shijianfilter(r.finishTime, "yyy-mm-dd HH:mm:ss") }}</td>
        <td>{{ r.name }}</td>

      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {mapState} from "vuex";
import axios from "axios";
// let opv = this.$refs.select.value;
export default {
  name: "StepList",
  data() {
    return {
      selected: "",
      rows: [],
      filters: [],
      locMap: {
        "Scanner_0": "上料",
        "Scanner_5": "个性化",
        "Scanner_14": "透明盖",
        "Scanner_15": "包装上料",
        "Scanner_23": "齐套扫码",
      }

    }
  },
  methods:{
    shijianfilter: function (value, args) {
      var dt = new Date(value)
      var y = dt.getFullYear()
      //这里month得加1
      var m = dt.getMonth() + 1
      var d = dt.getDate()
      //如果要求的时间格式只有年月日
      if (args.toLowerCase() === "yyy-mm-dd") {
        return `${y}-${m}-${d}`
        //如果时间要求精确到时分秒
      } else {
        var hh = dt.getHours()
        var mm = dt.getMinutes()
        var ss = dt.getSeconds();
        return `${y}-${m}-${d}:${hh}:${mm}:${ss}`
      }
    }
  },
  computed: {
    ...mapState(["selectedProcess", "selectedOrder"]),
    frows: function () {
      return this.rows.filter(user => {
        if (this.selected !== "") {
          return user.loc === this.selected
        } else {
          return true
        }

      })
    }
  },
  watch: {
    selectedProcess() {
      axios.post("/api/assy/getproducts", {
        "tid": this.selectedOrder.no,
        "page": 1,
        "pageSize": 10000
      }, this.getRequestConfig()).then(response => {
        console.log(response);
        if (response.data.code !== 0) {
          return
        }
        this.rows = response.data.data.rows;
        this.length = this.rows.length
        this.filters = [...new Set(this.rows.map(item => item.loc))]
        console.log(this.filters)
      }).catch(error => {
        console.log(error);
      }).then(() => {
      })
    }
  }
}
</script>

<style scoped>
.step-tb {
  margin-top: 16px;
  height: 100%
}

.select-lab {
  width: 30%
}

td {
  white-space: normal !important;
  word-wrap: break-word;
}

table {
  table-layout: fixed;
}
</style>