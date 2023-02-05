<template>
  <div>
    <nav class="bg-white px-8 pt-2 shadow-md">
      <div class="-mb-px flex justify-center">
        <a
          v-for="navbar in list"
          id="navbar-account"
          class="cursor-pointer no-underline uppercase tracking-wide border-gray-800 font-bold text-xs py-3 mr-8"
          v-bind:class="{ 'text-gray-500': !navbar.focus, 'border-b-2': navbar.focus }"
          @click="toggleSetting(navbar.type)"
        >{{ navbar.title }}</a>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'MemberSettingNavbar',
  data: () => ({
    list: [
      { type: 'account', title: '帳號設定', focus: true },
      { type: 'record', title: '贊助紀錄', focus: false }
    ]
  }),
  methods: {
    toggleSetting (type) {
      this.list[0].focus = !this.list[0].focus;
      this.list[1].focus = !this.list[1].focus;
      this.$emit('func', type);
    }
  },
  created () {
    this.$emit('func', 'account');
  }
};
</script>
