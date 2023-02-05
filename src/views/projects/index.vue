<template>
  <section class="pt-10 pb-0">
    <div class="container mx-auto p-5">
      <article>
        <div class="mb-5">
          <h1 class="mb-4 text-center text-2xl">{{ detail.name }}</h1>
          <div class="float-none w-full sm:w-1/2 sm:float-left">
            <el-carousel :interval="5000" arrow="always">
              <el-carousel-item v-for="(item, i) in detail.img" :key="i">
                <img
                  class="products_img"
                  :src="`https://dream168.s3.ap-northeast-1.amazonaws.com/${item}`"
                />
              </el-carousel-item>
            </el-carousel>
          </div>
          <div class="float-none w-full sm:w-1/2 sm:float-right">
            <div class="p-5">
              <h2 class="text-3xl">
                <Amount :amount="detail.raised"></Amount>
              </h2>
              <p class="text-gray-600">
                目標
                <Amount :amount="detail.price_target"></Amount>
              </p>
              <div v-if="detail.width>0" class="w-full mb-5">
                <div class="shadow w-full bg-gray-300 mt-2">
                  <div
                    class="bg-green-500 text-xs leading-none py-1 text-center text-white"
                    v-bind:style="{ width: detail.width + '%' }"
                  >
                    <ShowNumber :showNumber="detail.percent"></ShowNumber>%
                  </div>
                </div>
              </div>
              <div class="mb-5">
                <span class="text-gray-600">贊助人數</span>
                <span class="text-3xl mx-2">
                  <ShowNumber :showNumber="detail.raised_people"></ShowNumber>
                </span>
              </div>
              <div class="mb-5">
                <span class="text-gray-600">剩餘時間</span>
                <span class="text-3xl mx-2">
                  <ExpirationDate :value="detail.end_date"></ExpirationDate>
                </span>
                <span class="text-gray-600">天</span>
              </div>
              <div class="bg-gray-100 border-l-4 border-gray-500 text-gray-700 p-4" role="alert">
                <p v-if="detail.raised >= detail.price_target" class="font-bold">專案募資成功！</p>
                <p v-else class="font-bold">專案強烈募資中！</p>
                <p>在 {{ detail.end_date }} 23:59:59 募資結束前，您都可以持續贊助此計畫。</p>
              </div>
            </div>
          </div>
          <div class="clearfix"></div>
        </div>
        <nav class="bg-white px-8 pt-2 border-t-1 border-b-1 border-gray-400">
          <div class="-mb-px flex justify-center">
            <a
              class="no-underline cursor-pointer text-teal-dark uppercase tracking-wide font-bold py-3 mr-8"
              v-bind:class="{ 'text-gray-400': !description  }"
              @click="showDetail('description')"
            >專案內容</a>
            <a
              class="no-underline cursor-pointer text-teal-dark uppercase tracking-wide font-bold py-3 mr-8"
              v-bind:class="{ 'text-gray-400': !order  }"
              @click="showDetail('order')"
            >贊助專案</a>
          </div>
        </nav>
        <div class="p-5" v-bind:class="{ 'hidden': !description }" v-html="detail.description"></div>
        <div class="p-5" v-bind:class="{ 'hidden': !order }">
          <div class="container mx-auto p-8">
            <div class="flex flex-row flex-wrap -mx-2">
              <div
                class="w-full sm:w-1/2 md:w-1/3 mb-4 px-2"
                v-for="(funding, key) in detail.funding_type"
                :key="key"
              >
                <div
                  class="relative bg-white rounded border hover:bg-gray-300 cursor-pointer"
                  @click="goCheckout(key)"
                >
                  <div class="p-4">
                    <h3 class="text-2xl font-bold text-red-700">
                      <a class="stretched-link" href="#" title="Card 1">
                        <Amount :amount="funding.price"></Amount>
                      </a>
                    </h3>
                    <p class="my-5">{{ funding.description }}</p>
                    <div>
                      <div class="float-left w-2/4 text-left">
                        <p class="text-xs text-gray-500 sm:text-sm">寄送地點</p>
                        <p class="text-xs sm:text-sm">只寄送台灣本島</p>
                      </div>
                      <div class="float-right w-2/4 text-right">
                        <p class="text-xs text-gray-500 sm:text-sm">預設寄送時間</p>
                        <p class="text-xs sm:text-sm">{{ funding.delivery_date }}</p>
                      </div>
                      <div class="clearfix"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Amount from '@/components/format/Amount';
import ShowNumber from '@/components/format/ShowNumber';
import ExpirationDate from '@/components/format/ExpirationDate';

export default {
  name: 'Projects',
  components: {
    Amount,
    ShowNumber,
    ExpirationDate
  },
  data: () => ({
    description: true,
    order: false
  }),
  computed: {
    ...mapState('product', ['detail', 'failure'])
  },
  methods: {
    ...mapActions('product', ['getDetail']),
    ...mapActions('order', ['checkOrderItem', 'addOrder']),
    async fetchDetail () {
      await this.getDetail(this.$route.params.code);
    },
    showDetail (method) {
      if (method === 'description') {
        this.description = true;
        this.order = false;
      } else {
        this.description = false;
        this.order = true;
      }
    },
    async goCheckout (funding) {
      if (await this.checkOrderItem()) {
        this.$message.error('你已有進行其他贊助，請先至購物車作結帳動作再執行');
      } else {
        const success = await this.addOrder({
          code: this.detail.code,
          productName: this.detail.name,
          funding_type: this.detail.funding_type[funding],
          amount: this.detail.funding_type[funding].price,
          confirm: false
        });
        if (success) {
          this.$router.push('/order/checkout');
        }
      }
    }
  },
  created () {
    this.fetchDetail();
  }
};
</script>

<style>
.products_img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
