<template>
  <div>
    <MemberSettingNavbar @func="getInfo" />
    <MemberSettingAccount v-show="focus==='account'" />
    <MemberSettingRecord v-show="focus==='record'" />
  </div>
</template>

<script>
import MemberSettingNavbar from './navbar.vue';
import MemberSettingAccount from './account.vue';
import MemberSettingRecord from './record.vue';

export default {
  name: 'MemberSetting',
  components: {
    MemberSettingNavbar,
    MemberSettingAccount,
    MemberSettingRecord
  },
  data: () => ({
    focus: 'account'
  }),
  methods: {
    getInfo (type) {
      this.focus = type;
    }
  }
};
</script>
