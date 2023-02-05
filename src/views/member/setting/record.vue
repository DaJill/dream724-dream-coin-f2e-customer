<template>
  <div>
    <div class="px-3 py-4 flex justify-center">
      <table class="w-full text-md bg-white shadow-md rounded mb-4">
        <tbody>
          <tr class="border-b">
            <th class="text-center p-3 px-5">贊助時間</th>
            <th class="text-center p-3 px-5">專案編號</th>
            <th class="text-center p-3 px-5">專案項目</th>
            <th class="text-center p-3 px-5">贊助金額</th>
            <th class="text-center p-3 px-5">付款類型</th>
            <th class="text-center p-3 px-5">狀態</th>
          </tr>
          <tr v-for="order in lists" class="border-b hover:bg-orange-100 bg-gray-100">
            <td class="text-center p-3 px-5">{{ order.order_datetime }}</td>
            <td class="text-center p-3 px-5">{{ order.product_code }}</td>
            <td class="text-left p-3 px-5">
              <router-link
                :to="`/projects/${order.product_code}`"
                target="_blank"
                class="text-blue-500 hover:text-blue-700"
              >
                <span
                  v-if="order.product_in_fund===true"
                  class="bg-red-700 text-white p-1 rounded text-xs"
                >募資中</span>
                {{ order.product_name }}
              </router-link>
            </td>
            <td class="text-right p-3 px-5">
              <Amount :amount="order.price_total"></Amount>
            </td>
            <td class="text-right p-3 px-5">
              <span v-if="order.payway_id===1">超商付款</span>
              <span v-if="order.payway_id===2">ATM轉帳</span>
            </td>
            <td class="text-center p-3 px-5">
              <span v-if="order.order_status===0">審核中</span>
              <span v-if="order.order_status===1">
                <span v-if="order.delivery_status===0">待出貨</span>
                <span v-if="order.delivery_status===1">已出貨</span>
                <span v-if="order.delivery_status===-1">出貨取消</span>
              </span>
              <span v-if="order.order_status===-1">已取消</span>
              {{ order.reason }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagination :value="pagination.current_page" @input="changePage" :pagination="pagination"></Pagination>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import Amount from '@/components/format/Amount';
import Pagination from '@/components/Pagination';
const { mapState, mapActions } = createNamespacedHelpers('order');

export default {
  name: 'MemberSettingRecord',
  components: {
    Amount,
    Pagination
  },
  computed: {
    ...mapState(['lists', 'request', 'pagination', 'failure'])
  },
  methods: {
    ...mapActions(['getLists', 'initPagination', 'updatePage']),
    async fetchLists () {
      await this.getLists();
    },
    changePage (page) {
      this.updatePage(page);
      this.fetchLists();
    }
  },
  created () {
    this.initPagination();
    this.fetchLists();
  }
}

</script>
