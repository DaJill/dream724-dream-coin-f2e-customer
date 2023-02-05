<template>
  <div class="w-full mx-auto p-5 sm:w-1/2">
    <div class="mx-auto mb-8">
      <el-steps :active="1" finish-status="success">
        <el-step title="填寫付款資料"></el-step>
        <el-step title="確認付款資訊"></el-step>
        <el-step title="付款資訊完畢"></el-step>
      </el-steps>
    </div>
    <el-form class="mx-auto" :model="form" :rules="rules" ref="form" v-if="checkout">
      <div class="mb-10">
        <label class="font-bold">| 贊助專案</label>
        <div class="mt-2 text-blue-700 text-xl">
          <div class="float-left">{{ order.productName }}</div>
          <img
            class="float-left ml-2 cursor-pointer"
            src="@/assets/images/close.png"
            width="30"
            title="取消"
            @click="clearOrderConfirm"
          />
          <div class="clearfix"></div>
        </div>
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
        <label class="font-bold">
          | 贊助金額
          <span class="text-gray-400 text-sm">(不得超過$30,000)</span>
        </label>
        <div class="mt-2">
          <div class="float-left">
            <el-form-item prop="price" class="float-left">
              <input
                type="number"
                class="border-1 border-gray-700 rounded leading-normal p-2"
                v-model="form.price"
              />
            </el-form-item>
          </div>
          <div class="float-left inline-flex sm:ml-2">
            <button
              type="button"
              @click="calculateAmount('integer')"
              class="bg-gray-500 hover:bg-gray-700 text-white text-sm py-2 px-4 rounded-l"
            >湊整數</button>
            <button
              type="button"
              @click="calculateAmount('add1000')"
              class="bg-gray-500 hover:bg-gray-700 text-white text-sm py-2 px-4 border-l-1 border-r-1"
            >+1000</button>
            <button
              type="button"
              @click="calculateAmount('down')"
              class="bg-gray-500 hover:bg-gray-700 text-white text-sm py-2 px-4 rounded-r"
            >最低金額</button>
          </div>
          <div class="clearfix"></div>
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
              <td class="px-4 py-2 border-1">
                <el-form-item prop="name">
                  <input
                    type="text"
                    v-model="form.name"
                    class="border-1 border-gray-600 rounded leading-normal w-full leading-loose"
                  />
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td class="px-4 py-2 border-1">
                <span class="text-red-600">*</span>收件地址
              </td>
              <td class="px-4 py-2 border-1">
                <el-form-item prop="address">
                  <input
                    type="text"
                    v-model="form.address"
                    class="border-1 border-gray-600 rounded leading-normal w-full leading-loose"
                  />
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td class="px-4 py-2 border-1">
                <span class="text-red-600">*</span>聯絡電話
              </td>
              <td class="px-4 py-2 border-1">
                <el-form-item prop="mobile">
                  <input
                    type="text"
                    v-model="form.mobile"
                    class="border-1 border-gray-600 rounded leading-normal w-full leading-loose"
                  />
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td class="px-4 py-2 border-1">備註</td>
              <td class="px-4 py-2 border-1">
                <input
                  type="text"
                  v-model="form.note"
                  class="border-1 border-gray-600 rounded leading-normal w-full leading-loose"
                />
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div class="mb-10">
        <label class="font-bold">| 付款方式</label>
        <div class="mt-2 text-blue-700 text-center">
          <div
            class="cursor-pointer border-1 px-10 py-3 my-2 w-full sm:float-left sm:mr-2"
            v-bind:class="{ 'bg-gray-900': payment.store, 'text-white': payment.store }"
            @click="chagnePayment('store')"
          >超商付款</div>
          <div
            class="cursor-pointer border-1 px-10 py-3 my-2 w-full sm:float-left sm:mr-2"
            v-bind:class="{ 'bg-gray-900': payment.atm, 'text-white': payment.atm }"
            @click="chagnePayment('atm')"
          >ATM轉帳</div>
          <div class="clearfix"></div>
        </div>
      </div>
      <div class="mb-10">
        <label class="font-bold">| 需支付總金額</label>
        <div class="mt-2 text-red-700 text-2xl font-bold">
          <Amount :amount="form.price"></Amount>
        </div>
      </div>
      <hr class="my-5" />
      <div class="mb-10">
        <button
          type="button"
          class="p-3 rounded text-white w-full bg-gray-600 hover:bg-gray-900"
          @click="submitForm()"
        >進行付款</button>
      </div>
    </el-form>
    <div class="container mx-auto p-5 mt-10" v-else>
      <p class="my-10 mt-16 sm:px-5 md:px-32 text-sm text-center">抱歉！您尚未選擇要贊助的專案</p>
      <div class="text-center">
        <router-link to="/">
          <button
            class="bg-yellow-600 hover:bg-yellow-700 text-white py-1 font-light px-20 rounded"
          >探討贊助</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { merge } from 'lodash';
import { mapActions, mapGetters } from 'vuex';
import Amount from '@/components/format/Amount';

export default {
  name: 'OrderCheckout',
  components: {
    Amount
  },
  computed: {
    ...mapGetters('order', ['order'])
  },
  data: () => ({
    checkout: false,
    form: {
      price: 0,
      name: '',
      address: '',
      mobile: '',
      note: '',
      payway_id: 1
    },
    payment: {
      store: true,
      atm: false
    },
    rules: {
      price: [
        { required: true, message: '請輸入要贊助的金額', trigger: 'blur' },
        { type: 'integer', min: 100, max: 30000, message: '贊助金額為 100 ~ 30,000 之間', trigger: 'blur' }
      ],
      name: [
        { required: true, message: '請輸入收件人姓名', trigger: 'blur' }
      ],
      address: [
        { required: true, message: '請輸入收件地址', trigger: 'blur' }
      ],
      mobile: [
        { required: true, message: '請輸入聯絡電話', trigger: 'blur' }
      ]
    }
  }),
  methods: {
    ...mapActions('order', ['checkOrderItem', 'addOrder', 'clearOrder']),
    submitForm () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.5)'
          });
          this.form.payway_id = (this.payment.store === true) ? 1 : 2;
          this.form.confirm = true;
          let shoppingCart = this.order;
          const success = await this.addOrder(merge(shoppingCart, this.form));
          loading.close();
          if (success) {
            this.$router.push('/order/confirm');
          }
        }
      });
    },
    calculateAmount (type) {
      switch (type) {
        case 'integer':
          const num = this.form.price;
          if (Math.floor(num / 100) === num / 100) {
            var posi = /[1-9][0]*$/.exec(Number(num).toString())[0].length - 1;
            this.form.price = num + Math.pow(10, posi);
          } else {
            this.form.price = Math.ceil(num / 100) * 100;
          }
          break;
        case 'add1000':
          this.form.price += 1000;
          break;
        default:
          this.form.price = this.order.funding_type.price;
      }
    },
    chagnePayment (payment) {
      this.payment['store'] = false;
      this.payment['atm'] = false;
      this.payment[payment] = true;
    },
    clearOrderConfirm () {
      this.$confirm('確定要取消此次的贊助活動?', '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.5)'
        });
        const success = await this.clearOrder();
        loading.close();
        if (success) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          window.location.reload();
        }
      }).catch(() => {
      });
    }
  },
  watch: {
    'form.price': function (newVal, oldVal) {
      if (newVal < this.order.funding_type.price || newVal > 30000) {
        this.form.price = this.order.funding_type.price;
      }
    }
  },
  created () {
    const storeOrder = JSON.parse(localStorage.getItem('order'));
    if (storeOrder !== null) {
      this.checkout = true;
      this.form.price = storeOrder.funding_type.price;
      if (typeof (storeOrder.name) !== 'undefined') {
        this.form.price = storeOrder.price;
        this.form.name = storeOrder.name;
        this.form.address = storeOrder.address;
        this.form.mobile = storeOrder.mobile;
        this.form.note = storeOrder.note;
        if (this.form.payway_id === 1) {
          this.payment['store'] = true;
          this.payment['atm'] = false;
        } else {
          this.payment['store'] = false;
          this.payment['atm'] = true;
        }
      }
    }
  }
};
</script>
