<template>
  <section class="pt-10 pb-0">
    <div class="container mx-auto p-5 mt-10" v-if="enableResult==='success'">
      <h1 class="my-5 text-center text-2xl">帳號驗證成功</h1>
      <hr />
      <p class="my-10 mt-16 sm:px-5 md:px-32 text-sm text-center leading-loose">
        親愛的會員您好，您的信箱已驗證成功。
        <br />感謝您註冊
        <b>圓夢</b>，一起用夢想讓世界更美好
      </p>
      <div class="text-center">
        <router-link to="/member/login">
          <button
            class="bg-yellow-600 hover:bg-yellow-700 text-white py-1 font-light px-20 rounded"
          >登入</button>
        </router-link>
      </div>
    </div>
    <div class="container mx-auto p-5 mt-10" v-if="enableResult==='failure'">
      <h1 class="my-5 text-center text-2xl">帳號驗證失敗</h1>
      <hr />
      <p class="my-10 mt-16 sm:px-5 md:px-32 text-sm text-center leading-loose">
        親愛的會員您好，您的帳號驗證結果：
        <span class="text-red-600">失敗</span>
        <br />失敗原因可能已驗證過或超過驗證時效，
        <br />請重新嘗試或則請與我們聯繫，謝謝。
      </p>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'MemberConfirm',
  data: () => ({
    enableResult: ''
  }),
  methods: {
    ...mapActions('auth', ['enableUser']),
    async doEnable () {
      const success = await this.enableUser(this.$route.query.token);
      if (success) {
        this.enableResult = 'success';
      } else {
        this.enableResult = 'failure';
      }
    }
  },
  created () {
    this.doEnable();
  }
};
</script>
