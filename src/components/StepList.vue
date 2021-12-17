<template>
  <div style="width: 100%; overflow-y: auto; height: 100%">
    <table class="table table-hover">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">ID</th>
        <th scope="col">编码</th>
        <th scope="col">名称</th>
        <th scope="col">状态</th>
        <th scope="col">功能码</th>
        <th scope="col">模式</th>
        <th scope="col">类型</th>
        <th scope="col">参数</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(r, i) in rows" :key="'step-'+i">
        <th scope="row">{{i+1}}</th>
        <td style="width: 5%">{{ r.id }}</td>
        <td style="width: 5%">{{ r.code }}</td>
        <td style="width: 20%">{{ r.name }}</td>
        <td style="width: 5%">{{ r.status }}</td>
        <td style="width: 10%">{{ r.functionCode }}</td>
        <td style="width: 5%">{{r.executeMode}}</td>
        <td style="width: 10%">{{r.operationType}}</td>
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
      axios.post("/api/emul/orders/" + this.selectedOrder.no + "/step", {"process": this.selectedProcess}, {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}}).then(response => {
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

</style>