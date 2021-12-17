<template>
  <div style="display: flex; flex-direction: row; height: 100%">
    <OrderList></OrderList>
    <div style="display: flex; flex-direction: column; width: 100%">
      <div style="margin: 16px">
        <h3>{{ selectedOrder.no }}</h3>
        <p>{{selectedOrder.workshop}} / {{selectedOrder.line}} / {{selectedOrder.devGroup}}</p>
      </div>
      <Graph></Graph>
      <StepList></StepList>
    </div>
  </div>
</template>

<script>
import OrderList from "../components/OrderList";
import StepList from "../components/StepList";
import Graph from "../components/Graph";
import {mapState} from "vuex";

export default {
  name: "Home",
  components: {
    OrderList,
    StepList,
    Graph,
  },
  computed: {
    ...mapState(["selectedOrder"])
  },
  mounted() {
    if (localStorage.getItem('token') === null) {
      this.$router.push({name: "login"})
    }
  }
}
</script>

<style scoped>

</style>