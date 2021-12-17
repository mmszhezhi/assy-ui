import {createRouter, createWebHashHistory} from 'vue-router'
import Login from "../components/Login";
import Home from "../views/Home";

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
  ]
});
