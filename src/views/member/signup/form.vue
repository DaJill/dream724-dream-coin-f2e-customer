<template>
  <div>
    <el-form class="form-horizontal w-3/4 mx-auto" :rules="rules" :model="form" ref="form">
      <div class="flex flex-col">
        <el-form-item prop="account" label="帳號">
          <el-input
            type="text"
            class="flex-grow w-full text-sm"
            v-model="form.account"
            minlength="4"
            maxlength="20"
            placeholder="4~20英文數字組合"
          ></el-input>
        </el-form-item>
      </div>
      <div class="flex flex-col">
        <el-form-item prop="email" label="電子信箱">
          <el-input
            type="text"
            class="flex-grow w-full text-sm"
            v-model="form.email"
            placeholder="請輸入常用的電子信箱"
          ></el-input>
        </el-form-item>
      </div>
      <div class="flex flex-col">
        <el-form-item prop="password" label="密碼">
          <el-input
            type="password"
            class="flex-grow w-full text-sm"
            v-model="form.password"
            placeholder="6~20英文數字組合且需有英文數字參雜"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>
      </div>
      <div class="flex flex-col">
        <el-form-item prop="password_confirmation" label="確認密碼">
          <el-input
            type="password"
            class="flex-grow w-full text-sm"
            v-model="form.password_confirmation"
            placeholder="再次輸入密碼"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>
      </div>
      <div class="flex flex-col w-full mt-2">
        <button
          type="button"
          class="bg-gray-600 hover:bg-gray-900 text-white text-sm font-semibold px-4 py-2 rounded w-full"
          @click="submitForm('form')"
          :disabled="request"
        >註冊</button>
      </div>
    </el-form>
    <p class="text-xs my-2 text-center">
      繼續進行代表你同意
      <router-link to="/policy" target="_blank" class="text-blue-500 hover:text-blue-800">服務條款</router-link>。
    </p>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { errorMapping } from '@/utils/errorCode.js';

export default {
  name: 'MemberSignupForm',
  data () {
    return {
      form: {
        account: '',
        email: '',
        password: '',
        password_confirmation: ''
      },
      rules: {
        mobile: [
          { required: true, message: '請輸入手機', trigger: 'blur' },
          { min: 10, max: 10, message: '長度為 10 個字元', trigger: 'blur' },
          { pattern: /^[0-9]+$/, message: '限制數字組合', trigger: 'blur' }
        ],
        account: [
          { required: true, message: '請輸入帳號', trigger: 'blur' },
          { min: 4, max: 20, message: '長度為 4 至 20 個字元', trigger: 'blur' },
          { pattern: /^[A-Za-z0-9]+$/, message: '限制英文數字組合', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '請輸入電子信箱', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '請輸入密碼', trigger: 'blur' },
          { min: 6, max: 20, message: '長度為 6 至 20 個字元', trigger: 'blur' },
          { validator: this.formatPassword, trigger: 'blur' }
        ],
        password_confirmation: [
          { required: true, message: '請輸入密碼確認', trigger: 'blur' },
          { min: 6, max: 20, message: '長度為 6 至 20 個字元', trigger: 'blur' },
          { validator: this.formatPassword, trigger: 'blur' },
          { validator: this.confirmatePassword, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState('auth', ['request', 'failure'])
  },
  methods: {
    ...mapActions('auth', ['signup']),
    formatPassword (rule, value, callback) {
      const regp = /^(?=.*[a-zA-Z]+)(?=.*[0-9]+)[a-zA-Z0-9]+$/;
      if (!regp.test(value)) {
        callback(new Error('英文數組合並且需英文跟數字參雜'));
      } else {
        callback();
      }
    },
    confirmatePassword (rule, value, callback) {
      if (value !== this.form.password) {
        callback(new Error('請確定與密碼輸入一致'));
      } else {
        callback();
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.5)'
          });
          const success = await this.signup(this.form);
          loading.close();
          if (success) {
            this.$router.push('/');
            this.$message({ type: 'success', message: '註冊成功，請先至信箱進行帳號認證動作，謝謝。' });
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
.el-form-item__error {
  font-size: 0.75rem;
  color: #f56565;
}
</style>
