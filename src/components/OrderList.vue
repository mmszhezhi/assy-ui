<template>
  <div class="d-flex flex-column align-items-stretch flex-shrink-0 bg-white" style="width: 380px;">
    <a href="/" class="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom">
      <svg style="width:24px;height:24px" viewBox="0 0 24 24">
        <path fill="#000000" d="M17,9H7V7H17M17,13H7V11H17M14,17H7V15H14M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3Z" />
      </svg>
      <span class="fs-5 fw-semibold">&nbsp;&nbsp;乳化制令单</span>
    </a>
    <div style="margin: 8px"><input type="search" class="form-control" placeholder="搜索制令单" v-model="keyword"></div>
    <div class="list-group list-group-flush border-bottom scrollarea">
      <a v-for="(order, i) in orders" :key="'order'+i" href="#" class="list-group-item list-group-item-action py-3 lh-tight" :class="{active: selectedOrder.no === order.no}" aria-current="true" @click="selectOrder(order)">
        <div class="d-flex w-100 align-items-center justify-content-between">
          <strong class="mb-1">{{order.no}}</strong>
          <small>{{ statusMap[order.status] }}</small>
        </div>
        <div class="col-10 mb-1 small">{{order.workshop}} / {{order.line}} / {{order.devGroup}}</div>
        <div class="col-10 mb-1 small">{{order.createTime }}</div>
      </a>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {mapMutations, mapState} from "vuex";
import {SET_SELECTED_ORDER, SET_SELECTED_PROCESS} from "../store/mutations.type";

export default {
  name: "OrderList",
  data() {
    return {
      page: 1,
      pageSize: 100,
      orders: [],
      keyword: "",
      statusMap: {
        0: "待生产",
        1: "生产中",
        2: "暂停中",
        3: "完工",
        4: "生产完成",
        5: "结案"
      }
    }
  },
  computed: {
    ...mapState(["selectedOrder"])
  },
  watch: {
    keyword() {
      this.load();
    }
  },
  mounted() {
    this.load();
  },
  methods: {
    ...mapMutations([SET_SELECTED_ORDER, SET_SELECTED_PROCESS]),
    load() {
      axios.post("/api/emul/orders", {page: this.page, pageSize: this.pageSize, keyword: this.keyword}, {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}}).then(response => {
        console.log(response);
        if (response.data.code === 0) {
          this.orders = response.data.data.rows;
          this.selectOrder(this.orders[0]);
        }
      }).catch(error => {
        console.log(error);
      }).then(() => {
      })
    },
    selectOrder(o) {
      this.setSelectedProcess("");
      this.setSelectedOrder(o);
    },
  }
}
</script>

<style scoped>

</style>