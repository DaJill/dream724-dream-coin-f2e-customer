<template>
  <span>{{ showNumberValue }}</span>
</template>

<script>
import numeral from 'numeral';

export default {
  name: 'FormatShowNumber',
  props: {
    showNumber: {
      default: 0
    }
  },
  computed: {
    showNumberValue () {
      return (this.showNumber > 0) ? numeral(this.showNumber).format('0,0') : 0;
    }
  }
};
</script>
