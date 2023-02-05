<template>
  <ul class="flex">
    <li class="mr-4" v-if="typeof(user.account) !== 'undefined'">
      <router-link to="/member/setting" class="hover:text-blue-600">{{ user.account }}</router-link>
      <img
        src="@/assets/images/logout.png"
        width="20px"
        class="float-right ml-2 mt-1 cursor-pointer"
        @click="handleLogout"
        title="登出"
      />
      <div class="float-right mx-2">|</div>
      <router-link to="/order/checkout">
        <img
          src="@/assets/images/cart.png"
          width="20px"
          class="float-right ml-2 mt-1 cursor-pointer"
          title="付款結帳"
        />
      </router-link>
      <div class="float-right mx-2">|</div>
      <div class="clearfix"></div>
    </li>
    <li class="mr-4" v-if="typeof(user.account) === 'undefined'">
      <router-link to="/member/login">
        <button class="bg-gray-600 hover:bg-gray-900 text-white py-1 font-light px-6 rounded">登入</button>
      </router-link>
    </li>
  </ul>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'LayoutNav',
  computed: {
    ...mapGetters('auth', ['user'])
  },
  methods: {
    ...mapActions('auth', ['logout']),
    async handleLogout () {
      const loading = this.$loading({ fullscreen: true });
      await this.logout();
      this.$router.push('/');
      loading.close();
      this.$message({ type: 'success', message: '登出成功' });
    }
  }
}
</script>
