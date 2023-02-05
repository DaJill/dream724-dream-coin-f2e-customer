<template>
  <div class="w-full mx-auto p-5 sm:w-1/2">
    <div class="mx-auto mb-8">
      <el-steps :active="2" finish-status="success">
        <el-step title="填寫付款資料"></el-step>
        <el-step title="確認付款資訊"></el-step>
        <el-step title="付款資訊完畢"></el-step>
      </el-steps>
    </div>
    <div class="mb-10">
      <label class="font-bold">| 贊助專案</label>
      <div class="mt-2 text-blue-700">{{ order.productName }}</div>
    </div>
    <div class="mb-10">
      <label class="font-bold">| 贊助項目</label>
      <div class="mt-2 text-blue-700">
        <span class="text-red-700 font-bold">
          <Amount :amount="order.funding_type.price"></Amount>
        </span>
        - {{ order.funding_type.description }}
      </div>
    </div>
    <div class="mb-10">
      <label class="font-bold">| 贊助金額</label>
      <div class="mt-2">
        <Amount :amount="order.price"></Amount>
      </div>
    </div>
    <div class="mb-10">
      <label class="font-bold">| 寄送地址</label>
      <div class="mt-2 text-blue-700">
        <table class="table-auto w-full">
          <tr>
            <td class="px-4 py-2 border-1 w-1/4">
              <span class="text-red-600">*</span>收件人姓名
            </td>
            <td class="px-4 py-2 border-1">{{ order.name }}</td>
          </tr>
          <tr>
            <td class="px-4 py-2 border-1">
              <span class="text-red-600">*</span>收件地址
            </td>
            <td class="px-4 py-2 border-1">{{ order.address }}</td>
          </tr>
          <tr>
            <td class="px-4 py-2 border-1">
              <span class="text-red-600">*</span>聯絡電話
            </td>
            <td class="px-4 py-2 border-1">{{ order.mobile }}</td>
          </tr>
          <tr>
            <td class="px-4 py-2 border-1">備註</td>
            <td class="px-4 py-2 border-1">{{ order.note }}</td>
          </tr>
        </table>
      </div>
    </div>
    <div class="mb-10">
      <label class="font-bold">| 付款方式</label>
      <div class="mt-2 text-2xl">
        <span v-if="order.payway_id===1">超商付款</span>
        <span v-else>ATM轉帳</span>
      </div>
    </div>
    <div class="mb-10">
      <label class="font-bold">| 需支付總金額</label>
      <div class="mt-2 text-red-700 text-2xl font-bold">
        <Amount :amount="order.price"></Amount>
      </div>
    </div>
    <hr class="my-5" />
    <div class="mb-10">
      <button
        type="button"
        class="p-3 rounded text-white w-full bg-orange-600 hover:bg-orange-900"
        @click="goBack()"
      >回上一頁，返回修改</button>
    </div>
    <div class="mb-10">
      <button
        type="button"
        class="p-3 rounded text-white w-full bg-gray-600 hover:bg-gray-900"
        @click="submitForm()"
        :disabled="request"
      >確認完畢，進行付款</button>
    </div>
    <form name="newebpay" id="data_set" method="post">
      <input type="hidden" name="MerchantID" id="MerchantID" />
      <input type="hidden" name="TradeInfo" id="TradeInfo" />
      <input type="hidden" name="TradeSha" id="TradeSha" />
      <input type="hidden" name="Version" id="Version" />
    </form>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { errorMapping } from '@/utils/errorCode.js';
import Amount from '@/components/format/Amount';
const { mapActions, mapGetters, mapState } = createNamespacedHelpers('order');

export default {
  name: 'OrderConfirm',
  components: {
    Amount
  },
  computed: {
    ...mapGetters(['order']),
    ...mapState(['payway', 'request'])
  },
  data: () => ({
    fullscreenLoading: false
  }),
  methods: {
    ...mapActions(['createOrder', 'initSuccess']),
    async submitForm () {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.5)'
      });
      const success = await this.createOrder(this.order);
      loading.close();
      if (success) {
        if (typeof (this.payway.MerchantID) !== 'undefined') {
          document.getElementById('data_set').action = this.payway.url;
          document.getElementById('MerchantID').value = this.payway.MerchantID;
          document.getElementById('TradeInfo').value = this.payway.TradeInfo;
          document.getElementById('TradeSha').value = this.payway.TradeSha;
          document.getElementById('Version').value = this.payway.Version;
          document.getElementById('data_set').submit();
        } else {
          document.location.href = this.payway.url;
        }
      } else {
        this.$message.error(errorMapping(this.failure));
      }
    },
    goBack () {
      this.$router.push('/order/checkout');
    }
  },
  created () {
    const storeOrder = JSON.parse(localStorage.getItem('order'));
    if (storeOrder === null) {
      this.goBack();
    } else {
      this.initSuccess();
    }
  }
};
</script>
