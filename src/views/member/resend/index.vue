<template>
  <div class="container mx-auto bg-gray-200 h-screen">
    <div class="flex flex-col items-center flex-1 h-full justify-center px-4 sm:px-0">
      <div
        class="flex rounded-lg shadow-lg w-full sm:w-3/4 lg:w-2/3 bg-white sm:mx-0"
        style="height: 500px"
      >
        <div class="flex flex-col w-full md:w-1/2 p-4">
          <div class="flex flex-col flex-1 justify-center mb-8">
            <h1 class="text-3xl text-center font-thin">重發認證信件</h1>
            <div class="w-full mt-4">
              <el-form
                class="form-horizontal w-3/4 mx-auto"
                :model="form"
                :rules="rules"
                ref="form"
                :inline="true"
              >
                <div class="flex flex-col mt-4 text-sm">請輸入您的註冊帳號時輸入的電子信箱地址，我們會透過電子郵件向您重發電子信箱認證信件。</div>
                <el-form-item class="flex flex-col mt-4 w-full" label="電子信箱" prop="email">
                  <input
                    type="email"
                    class="flex-grow h-8 px-2 border rounded border-grey-400 w-full"
                    v-model="form.email"
                  />
                </el-form-item>
                <div class="flex flex-col mt-4">
                  <button
                    type="button"
                    @click="submitForm"
                    :disabled="request"
                    :class="buttonClass"
                  >再次發送認證信件</button>
                </div>
              </el-form>
              <div class="text-center mt-4">
                <router-link
                  to="/member/login"
                  class="ml-2 no-underline hover:underline text-blue-dark text-xs"
                >返回登入</router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="hidden md:block md:w-1/2 rounded-r-lg" v-bind:style="styleObject"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { errorMapping } from '@/utils/errorCode.js';

export default {
  name: 'MemberResend',
  data: () => ({
    form: {
      email: ''
    },
    styleObject: {
      background: 'url(\'../images/login.jpg\')',
      backgroundSize: 'cover',
      backgroundPosition: 'center center'
    },
    rules: {
      email: [
        { required: true, message: '請輸入電子信箱', trigger: 'blur' }
      ]
    }
  }),
  computed: {
    ...mapState('auth', ['request', 'failure']),
    buttonClass () {
      if (this.request) {
        return 'bg-gray-600 hover:bg-gray-900 text-white text-sm font-semibold py-2 px-4 rounded opacity-50 cursor-not-allowed';
      } else {
        return 'bg-gray-600 hover:bg-gray-900 text-white text-sm font-semibold py-2 px-4 rounded';
      }
    }
  },
  methods: {
    ...mapActions('auth', ['resendUserEmail']),
    submitForm () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.5)'
          });
          const success = await this.resendUserEmail(this.form.email);
          loading.close();
          if (success) {
            this.$router.push('/member/login');
            this.$message({ type: 'success', message: '已重新發送電子信箱認證信件，麻煩請至信箱查收，謝謝。' });
          } else {
            this.$message.error(errorMapping(this.failure));
          }
        }
      });
    }
  }
};
</script>

<style>
.el-form-item__content {
  width: 100%;
}
</style>
