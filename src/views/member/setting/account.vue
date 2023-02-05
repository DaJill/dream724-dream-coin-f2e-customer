<template>
  <div class="my-5 border-gray-300 border-1 rounded">
    <div class="form-horizontal w-3/4 mx-auto p-10">
      <div class="flex flex-col mt-4">
        <div class="flex-col flex py-3">
          <label class="pb-2 text-gray-700 font-semibold">帳號</label>
          <div>{{ user.account }}</div>
        </div>
        <div class="flex-col flex py-3">
          <label class="pb-2 text-gray-700 font-semibold">電子信箱</label>
          <div>{{ user.email }}</div>
        </div>
        <div class="flex-col flex py-3">
          <label class="pb-2 text-gray-700 font-semibold">手機</label>
          <div>{{ user.mobile }}</div>
        </div>
        <div class="flex-col flex py-3">
          <el-form :rules="rules" :model="form" ref="form" label-width="90px">
            <el-form-item class="flex-col flex py-3" prop="password" label="修改密碼">
              <el-input type="password" v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item class="flex-col flex py-3" prop="password_confirmation" label="密碼確認">
              <el-input type="password" v-model="form.password_confirmation"></el-input>
            </el-form-item>
            <el-form-item class="flex-col flex py-3">
              <button
                class="bg-gray-600 hover:bg-gray-900 text-white text-sm py-2 px-4 rounded w-full"
                type="button"
                @click="submitForm('form')"
                :disabled="request"
              >修改</button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex';
import { errorMapping } from '@/utils/errorCode.js';

export default {
  name: 'MemberSettingAccount',
  data () {
    return {
      form: {
        password: '',
        password_confirmation: ''
      },
      rules: {
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
    ...mapState('auth', ['request', 'failure']),
    ...mapGetters('auth', ['user'])
  },
  methods: {
    ...mapActions('auth', ['updateUser', 'logout']),
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
          const success = await this.updateUser(this.form);
          loading.close();
          if (success) {
            await this.logout();
            this.$router.push('/');
            this.$message({ type: 'success', message: '修改密碼成功，請重新用新密碼進行登入，謝謝。' });
          } else {
            this.$message.error(errorMapping(this.failure));
          }
        }
      });
    }
  }
}
</script>

<style>
.el-form-item__error {
  font-size: 0.75rem;
  color: #f56565;
}
</style>
