<template>
  <div>
    <div class="form-horizontal w-3/4 mx-auto">
      <el-form class="form-horizontal w-3/4 mx-auto" :rules="rules" :model="form" ref="form">
        <el-form-item class="flex flex-col w-full" label="新密碼" prop="password">
          <el-input
            type="password"
            v-model="form.password"
            class="flex-grow w-full"
            placeholder="新密碼"
          ></el-input>
        </el-form-item>
        <el-form-item class="flex flex-col w-full" label="新密碼確認" prop="password_confirmation">
          <el-input
            type="password"
            v-model="form.password_confirmation"
            class="flex-grow w-full"
            placeholder="再次輸入新密碼"
          ></el-input>
        </el-form-item>
        <el-form-item class="flex flex-col mt-8">
          <button
            type="button"
            @click="submitForm"
            :disabled="request"
            class="bg-gray-600 hover:bg-gray-900 text-white text-sm font-semibold px-4 rounded w-full"
          >確定</button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { errorMapping } from '@/utils/errorCode.js';

export default {
  name: 'MemberResetForm',
  data () {
    return {
      form: {
        token: this.$route.query.token,
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
    ...mapState('auth', ['request', 'failure'])
  },
  methods: {
    ...mapActions('auth', ['resetUserPassword']),
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
    submitForm () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.5)'
          });
          const success = await this.resetUserPassword(this.form);
          loading.close();
          if (success) {
            this.$message({ type: 'success', message: '密碼重置成功，請使用新密碼登入，謝謝。' });
            this.$router.push('/member/login');
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
.el-form-item__label {
  text-align: left;
}
</style>
