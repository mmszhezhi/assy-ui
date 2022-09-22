<template>
  <button class="btn-primary bnt" @click="this.outStockDialog.show()">强制完工</button>
<!--  <ModalDialog id="outStockDialog" :title="'完工'" positive-text="完工" positive-class="btn-danger" @onPositiveClick="ctl()">-->
  <ModalDialog id="outStockDialog" :title="'完工'"  positive-class="btn-danger" @onPositiveClick="this.ctl()">
    <form ref="loginForm" class="login-form needs-validation" @submit.prevent="">
      <p>强制完工 {{selectedOrder.no}}</p>
      <p>请输入密码</p>
      <div class="mb-3">
        <input name="password" type="password" class="form-control input-lab" :class="{'is-invalid': ret != null && ret.code !== 0}" @input="ret = null" id="inputPassword" required>
        <div class="invalid-feedback">
          {{ ret != null ? ret.msg : '' }}
        </div>
      </div>
<!--      <p>密码错误</p>-->
    </form>
  </ModalDialog>
  <div>{{this.msg}}</div>
</template>

<script>
import go from 'gojs';
import axios from "axios";
import {mapMutations, mapState} from "vuex";
import {SET_SELECTED_PROCESS} from "../store/mutations.type";
import { Modal } from 'bootstrap/dist/js/bootstrap.min';
import ModalDialog from "@/components/ModalDialog";
// let $ = go.GraphObject.make;

export default {
  name: "Graph",
  components: {ModalDialog},
  data() {
    return {
      msg :"",
      psd:"",
      ret: null,
      statusMap: {
        0: "未执行",
        1: "执行中",
        2: "完成",
        4: "等待输入",
        5: "暂停中",
        6: "故障"
      }
    }
  },
  computed: {
    ...mapState(["selectedOrder"])
  },
  watch: {
    selectedOrder() {
      this.msg = ""
      // this.load(this.selectedOrder.no);
    }
  },
  mounted() {
    this.outStockDialog = new Modal(document.getElementById('outStockDialog'), {
      keyboard: false
    });
  },
  methods: {
    ...mapMutations([SET_SELECTED_PROCESS]),
    select(obj) {
      if (!(obj.part instanceof go.Link)) {
        if (obj.part.isSelected) {
          this.setSelectedProcess(obj.part.data.code);
        } else {
          this.setSelectedProcess("");
        }
      }
    },

    ctl() {
      let loginData = new FormData(this.$refs.loginForm);
      this.outStockDialog.show()
      console.log(loginData)
      console.log(loginData.get("password"))
      if (loginData.get("password") != "xuanyu"){
        console.log("fuck")
        this.ret = {code: -1, msg: "密码错误！"}

      }else{
        axios.post("api/assy/ctl" + "?no=" + this.selectedOrder.no + "&command=COMPLETE", {"no": this.selectedOrder.no, "command": "COMPLETE"},{headers:{'Content-Type':'application/x-www-form-urlencoded'}}, this.getRequestConfig()).then(response =>{
          this.msg = response
          this.ret = {code: 0, msg: ""}
          this.outStockDialog.hide()
          loginData.set("password","")
          this.$refs.loginForm.reset();
          // console.log(response)
        })
      }



      // console.log("fuck y")
      // console.log(this.selectedOrder.name + "   " + this.selectedOrder.no)
    }
  }
}
</script>

<style bnt>
#graph {
  height: 100%;
  width: 50%;
}

#graph >>> canvas {
  outline: none;
}
</style>

<style scoped>
#graph {
  height: 100%;
  margin-left: 16px;
  margin-right: 16px;
}
.bnt {
  width: 50%;
  align-content: center;
  align-items: center;
  alignment: center;
  text-align: center;
  alignment: center;

}
.input-lab{
  width:30%
}

#graph >>> canvas {
  outline: none;
}
</style>