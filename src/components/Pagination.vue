<template>
  <div style="margin: 10px 0;text-align:center">
    <el-pagination
      v-show="pagination.total"
      layout="prev, pager, next"
      :value="value"
      @current-change="change"
      :total="Number(pagination.total)"
      :page-size="Number(pagination.per_page)"
    ></el-pagination>
  </div>
</template>

<script>
import Vue from 'vue';
import Pagination from 'element-ui';
Vue.use(Pagination);

export default {
  name: 'Pagination',
  props: {
    value: {
      type: Number,
      required: true
    },
    pagination: {
      type: Object,
      default: () => ({
        total: 0,
        per_page: 15
      })
    }
  },
  methods: {
    change (val) {
      this.$emit('input', val);
    }
  }
};
</script>
