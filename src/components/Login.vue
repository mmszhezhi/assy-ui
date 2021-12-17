<template>
  <div class="container" style="margin-top: 16px">
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
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: ""
    }
  },
  methods: {
    login() {
      axios.post("/api/auth/login", {userName: this.username, password: this.password}).then(response => {
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
    }
  },
  mounted() {
    if (localStorage.getItem('token') != null) {
      this.$router.push({name: "home"});
    }
  }
}
</script>

<style scoped>

</style>