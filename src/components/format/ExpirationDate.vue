<template>
  <span>{{ ExpirationDateValue }}</span>
</template>

<script>
import moment from 'moment';

export default {
  name: 'FormatExpirationDate',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  computed: {
    ExpirationDateValue () {
      return (this.value !== '') ? moment(this.value).diff(moment(), 'days') : '';
    }
  }
};
</script>

<style src="element-ui/lib/theme-chalk/index.css"></style>
