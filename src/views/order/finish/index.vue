<template>
  <div class="w-full mx-auto p-5">
    <h1 class="my-5 text-center text-2xl">贊助明細</h1>
    <div class="w-full">
      <div class="p-5 bg-gray-300 rounded sm:w-1/2 sm:float-left">
        <p class="text-2xl font-bold">等待付款中</p>
        <div class="mt-10">
          <div v-if="detail.payway_id===1">
            <div class="my-5">
              <label class="font-bold">付款方式</label>
              <p>超商付款</p>
            </div>
            <div class="my-5">
              <label class="font-bold">支援超商</label>
              <p>7-11、全家、萊爾富、OK超商</p>
            </div>
            <div class="my-5">
              <label class="font-bold">繳費代碼</label>
              <p>{{ detail.payment_no }}</p>
            </div>
            <div class="my-5">
              <label class="font-bold">&nbsp;</label>
              <p>&nbsp;</p>
            </div>
          </div>
          <div v-else>
            <div class="my-5">
              <label class="font-bold">付款方式</label>
              <p>ATM轉帳</p>
            </div>
            <div class="my-5">
              <label class="font-bold">轉帳銀行代碼</label>
              <p>{{ detail.bank }}</p>
            </div>
            <div class="my-5">
              <label class="font-bold">轉帳銀行帳號</label>
              <p>{{ detail.bank_account }}</p>
            </div>
            <div class="my-5">
              <label class="font-bold">&nbsp;</label>
              <p>&nbsp;</p>
            </div>
          </div>
          <div class="my-5">
            <label class="font-bold">須繳付金額</label>
            <p>
              <Amount :amount="detail.price_total"></Amount>
            </p>
          </div>
          <div class="my-5">
            <label class="font-bold">付款期限</label>
            <p class="text-red-600">{{ detail.deadline }}</p>
          </div>
        </div>
      </div>
      <div class="p-5 sm:w-1/2 sm:float-right">
        <div>
          <label class="font-bold">贊助計畫</label>
          <p class="font-bold mt-1">{{ detail.product_name }}</p>
        </div>
        <div class="mt-8">
          <label class="font-bold">總金額</label>
          <p class="mt-1">
            <Amount :amount="detail.price_total"></Amount>
          </p>
        </div>
        <div class="mt-8">
          <label class="font-bold">收件人姓名</label>
          <p class="mt-1">{{ detail.name }}</p>
        </div>
        <div class="mt-8">
          <label class="font-bold">收件地址</label>
          <p class="mt-1">{{ detail.address }}</p>
        </div>
        <div class="mt-8">
          <label class="font-bold">聯絡電話</label>
          <p class="mt-1">{{ detail.mobile }}</p>
        </div>
        <div class="mt-8">
          <label class="font-bold">備註</label>
          <p class="mt-1">{{ detail.note }}</p>
        </div>
      </div>
      <div class="clearfix"></div>
    </div>
    <div class="my-10 text-center">
      <router-link to="/">
        <button
          class="bg-yellow-600 hover:bg-yellow-700 text-white py-1 font-light px-20 rounded"
        >繼續贊助其他專案</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import Amount from '@/components/format/Amount';
const { mapActions, mapState } = createNamespacedHelpers('order');

export default {
  name: 'OrderFinish',
  components: {
    Amount
  },
  computed: {
    ...mapState(['detail', 'failure'])
  },
  methods: {
    ...mapActions(['getDetail']),
    async fetchDetail () {
      const success = await this.getDetail(this.$route.params.no);
      if (!success) {
        this.$router.push('/');
      }
    }
  },
  created () {
    this.fetchDetail();
  }
};
</script>
