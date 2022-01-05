<template>
  <div class="container" style="margin-top: 16px">
    <div style="text-align: end; cursor: pointer" @click="showAddressDialog();">
      <span class="badge bg-primary">{{ host }}</span>
    </div>
    <form @submit.prevent="login()">
      <div class="mb-3">
        <label for="username" class="form-label">用户名</label>
        <input type="text" class="form-control" id="username" v-model="username">
      </div>
      <div class="mb-3">
        <label for="passwd" class="form-label">密码</label>
        <input type="password" class="form-control" id="passwd" v-model="password">
      </div>
      <button type="submit" class="btn btn-primary">登录</button>
    </form>
    <div class="modal fade" id="address-setting" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">地址设置</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <input type="text" class="form-control" id="address-text" ref="addressInput" :value="host" required>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
            <button type="button" class="btn btn-primary" @click="saveAddress();">保存</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Modal } from 'bootstrap/dist/js/bootstrap.min';

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      addressDialog: null,
      host: "",
    }
  },
  methods: {
    login() {
      axios.post(localStorage.getItem("host") + "/auth/login", {userName: this.username, password: this.password}).then(response => {
        console.log(response);
        if (response.data.code === 0) {
          localStorage.setItem('token', response.data.data.token);
          this.$router.push({name: "home"});
        } else {
          alert(response.data.msg);
        }
      }).catch(error => {
        console.log(error);
      }).then(() => {
      })
    },
    showAddressDialog() {
      this.addressDialog.show();
    },
    saveAddress() {
      if (this.$refs.addressInput.value === "") {
        alert("地址不能为空");
      } else {
        this.host = this.$refs.addressInput.value;
        localStorage.setItem("host", this.host);
        this.addressDialog.hide();
      }
    }
  },
  mounted() {
    if (localStorage.getItem("host") != null) {
      this.host = localStorage.getItem("host");
    } else {
      this.host = "http://localhost"
      localStorage.setItem("host", this.host);
    }
    if (localStorage.getItem('token') != null) {
      this.$router.push({name: "home"});
    }
    this.addressDialog = new Modal(document.getElementById('address-setting'), {
      keyboard: false
    });
  }
}
</script>

<style scoped>

</style>