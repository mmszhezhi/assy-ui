<template>
  <div class="step-tb table-responsive">
    <table class="table table-hover">
      <thead>
      <tr>
        <th scope="col" style="width: 3%">#</th>
        <th scope="col" style="width: 8%">ID</th>
        <th scope="col" style="width: 5%">编码</th>
        <th scope="col" style="width: 10%">名称</th>
        <th scope="col" style="width: 5%">状态</th>
        <th scope="col" style="width: 10%">功能码</th>
        <th scope="col" style="width: 5%">模式</th>
        <th scope="col" style="width: 5%">类型</th>
        <th scope="col" style="width: 20%">参数</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(r, i) in rows" :key="'step-'+i">
        <th scope="row">{{i+1}}</th>
        <td>{{ r.id }}</td>
        <td>{{ r.code }}</td>
        <td>{{ r.name }}</td>
        <td>{{ r.status }}</td>
        <td>{{ r.functionCode }}</td>
        <td>{{r.executeMode}}</td>
        <td>{{r.operationType}}</td>
        <td>{{r.params}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {mapState} from "vuex";
import axios from "axios";

export default {
  name: "StepList",
  data() {
    return {
      rows: []
    }
  },
  computed: {
    ...mapState(["selectedProcess", "selectedOrder"])
  },
  watch: {
    selectedProcess() {
      console.log(this.selectedProcess);
      if (this.selectedProcess === "") {
        this.rows = [];
        return
      }
      axios.post("/api/emul/orders/" + this.selectedOrder.no + "/step", {"process": this.selectedProcess}, this.getRequestConfig()).then(response => {
        console.log(response);
        if (response.data.code !== 0) {
          return
        }
        this.rows = response.data.data;
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
td {
  white-space: normal !important;
  word-wrap: break-word;
}
table {
  table-layout: fixed;
}
</style>