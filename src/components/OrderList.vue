<template>
  <div class="d-flex flex-column align-items-stretch flex-shrink-0 bg-white nav-list">
    <a href="/" class="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom">
      <svg style="width:24px;height:24px" viewBox="7.92 5.41 16.15 21.21">
        <g>
          <path fill="#9ac3f4"
                d="M22.64,13.76l-5-7.47a2,2,0,0,0-3.32,0l-5,7.47a8.45,8.45,0,0,0-.57,8.3,7.84,7.84,0,0,0,6.39,4.5,8.42,8.42,0,0,0,1.64,0,7.84,7.84,0,0,0,6.39-4.5A8.45,8.45,0,0,0,22.64,13.76Z"></path>
          <path fill="#2f7ded"
                d="M16,26.6a7.38,7.38,0,0,1-.82,0,7.84,7.84,0,0,1-6.39-4.5,8.45,8.45,0,0,1,.57-8.3l5-7.47a2,2,0,0,1,3.32,0l5,7.47a8.45,8.45,0,0,1,.57,8.3,7.84,7.84,0,0,1-6.39,4.5A7.38,7.38,0,0,1,16,26.6ZM16,7.4l-5,7.47a6.34,6.34,0,0,0-.42,6.33,5.78,5.78,0,0,0,4.76,3.37,6.84,6.84,0,0,0,1.28,0A5.78,5.78,0,0,0,21.4,21.2,6.34,6.34,0,0,0,21,14.87Z"></path>
        </g>
      </svg>
      <span class="fs-5 fw-semibold">&nbsp;&nbsp;乳化制令单</span>
    </a>
    <div style="margin: 8px"><input type="search" class="form-control" placeholder="搜索" v-model="keyword"></div>
    <div class="list-group list-group-flush border-bottom scrollarea">
      <a v-for="(order, i) in orders" :key="'order'+i" href="javascript:void(0)" class="list-group-item list-group-item-action py-3 lh-tight" :class="{active: selectedOrder.no === order.no}" aria-current="true" @click="selectOrder(order)">
        <div class="d-flex w-100 align-items-center justify-content-between">
          <strong class="mb-1">{{order.no}}</strong>
          <small>{{ statusMap[order.status] }}</small>
        </div>
        <div class="col-10 mb-1 small">{{order.workshop}} / {{order.line}} / {{order.devGroup}}</div>
        <div class="col-10 mb-1 small">{{order.createTime?.slice(0, 19).replace('T', ' ') }}</div>
      </a>
    </div>
    <div class="empty" v-if="orders.length === 0">
      <span>无制令单</span>
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
      axios.post("/api/emul/orders", {page: this.page, pageSize: this.pageSize, keyword: this.keyword}, this.getRequestConfig()).then(response => {
        console.log(response);
        if (response.data.code === 0) {
          this.orders = response.data.data.rows;
          if (this.orders.length > 0) {
            this.selectOrder(this.orders[0]);
          }
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
.nav-list {
  width: 280px;
  border-right: 1px solid rgba(0,0,0,.125);
}
</style>