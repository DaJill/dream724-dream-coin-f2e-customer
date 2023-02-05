<template>
  <div>
    <el-form
      class="form-horizontal w-3/4 mx-auto"
      :model="form"
      ref="form"
      :rules="rules"
      label-position="left"
    >
      <el-form-item label="帳號" prop="account" class="flex flex-col">
        <input
          type="text"
          class="flex-grow border rounded border-grey-400 w-full text-sm leading-loose"
          v-model.trim="form.account"
          minlength="4"
          maxlength="20"
        />
      </el-form-item>
      <el-form-item label="密碼" prop="password" class="flex flex-col">
        <input
          type="password"
          class="flex-grow rounded border border-grey-400 w-full text-sm leading-loose"
          v-model.trim="form.password"
          minlength="6"
          maxlength="20"
        />
      </el-form-item>
      <el-form-item class="flex flex-col mt-8">
        <button
          type="button"
          class="bg-gray-600 hover:bg-gray-900 text-white text-sm px-4 rounded w-full"
          @click="submitForm('form')"
          :disabled="request"
        >登入</button>
      </el-form-item>
      <el-form-item class="flex flex-col mt-8 text-red-700" v-if="this.resend">
        <router-link to="/member/resend">沒收到電子信箱認證信件?</router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { errorMapping } from '@/utils/errorCode.js';

export default {
  name: 'MemberLoginForm',
  data () {
    return {
      resend: false,
      form: {
        account: '',
        password: ''
      },
      rules: {
        account: [
          { required: true, message: '請輸入帳號', trigger: 'blur' },
          { min: 4, max: 20, message: '長度為 4 至 20 個字元', trigger: 'blur' },
          { pattern: /^[A-Za-z0-9]+$/, message: '限制英文數字組合', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '請輸入密碼', trigger: 'blur' },
          { min: 6, max: 20, message: '長度為 6 至 20 個字元', trigger: 'blur' },
          { validator: this.formatPassword, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState('auth', ['request', 'failure'])
  },
  methods: {
    ...mapActions('auth', ['login']),
    formatPassword (rule, value, callback) {
      const regp = /^(?=.*[a-zA-Z]+)(?=.*[0-9]+)[a-zA-Z0-9]+$/;
      if (!regp.test(value)) {
        callback(new Error('英文數組合並且需英文跟數字參雜'));
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
          const success = await this.login(this.form);
          loading.close();
          if (success) {
            this.$router.push('/');
            this.$message({ type: 'success', message: '登入成功' });
          } else {
            this.resend = (this.failure === 1002012);
            this.$message.error(errorMapping(this.failure));
          }
        }
      });
    }
  }
};
</script>

<style>
.el-form-item__label {
  line-height: 28px;
}
</style>
