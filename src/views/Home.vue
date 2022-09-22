<template>
  <div style="display: flex; flex-direction: row; height: 100%">
    <OrderList></OrderList>
    <div class="content" :class="{hide: selectedOrder.no == null}">
      <div style="margin: 16px">
        <h3>{{ selectedOrder.no }}</h3>
        <p>{{selectedOrder.name}} / {{selectedOrder.type}} / {{selectedOrder.status}}</p>
      </div>
      <Graph></Graph>
      <StepList></StepList>
    </div>
    <div class="empty" :class="{hide: selectedOrder.no != null}">
      <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" fill="#57606a"><path d="M6 43.6V4.3h.125q.125 0 .375.25l2 2q.25.25.5.25t.5-.25l2-2q.25-.25.5-.25t.5.25l2 2q.25.25.5.25t.5-.25l2-2q.25-.25.5-.25t.5.25l2 2q.25.25.5.25t.5-.25l2-2q.25-.25.5-.25t.5.25l2 2q.25.25.5.25t.5-.25l2-2q.25-.25.5-.25t.5.25l2 2q.25.25.5.25t.5-.25l2-2q.25-.25.5-.25t.5.25l2 2q.25.25.5.25t.5-.25l2-2q.25-.25.375-.25H42v39.3l-.125.05q-.125.05-.375-.2l-2-2q-.25-.25-.5-.25t-.5.25l-2 2q-.25.25-.5.25t-.5-.25l-2-2q-.25-.25-.5-.25t-.5.25l-2 2q-.25.25-.5.25t-.5-.25l-2-2q-.25-.25-.5-.25t-.5.25l-2 2q-.25.25-.5.25t-.5-.25l-2-2q-.25-.25-.5-.25t-.5.25l-2 2q-.25.25-.5.25t-.5-.25l-2-2q-.25-.25-.5-.25t-.5.25l-2 2q-.25.25-.5.25t-.5-.25l-2-2q-.25-.25-.5-.25t-.5.25l-2 2q-.25.25-.375.2L6 43.6Zm7.35-10.4h21.5q.65 0 1.075-.425.425-.425.425-1.075 0-.65-.425-1.075-.425-.425-1.075-.425h-21.5q-.65 0-1.075.425-.425.425-.425 1.075 0 .65.425 1.075.425.425 1.075.425Zm0-7.7h21.5q.65 0 1.075-.425.425-.425.425-1.075 0-.65-.425-1.075-.425-.425-1.075-.425h-21.5q-.65 0-1.075.425-.425.425-.425 1.075 0 .65.425 1.075.425.425 1.075.425Zm0-7.75h21.5q.65 0 1.075-.425.425-.425.425-1.075 0-.65-.425-1.075-.425-.425-1.075-.425h-21.5q-.65 0-1.075.425-.425.425-.425 1.075 0 .65.425 1.075.425.425 1.075.425Z"/></svg>
      <span>选择一个制令单</span>
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
    if (this.getToken() === null) {
      //window.location.href = "/login.html";
    }
  }
}
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.hide {
  display: none;
}
</style>