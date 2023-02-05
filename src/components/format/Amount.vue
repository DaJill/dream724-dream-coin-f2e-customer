<template>
  <span>$ {{ amountValue }}</span>
</template>

<script>
import numeral from 'numeral';

export default {
  name: 'FormatAmount',
  props: {
    amount: {
      default: 0
    }
  },
  computed: {
    amountValue () {
      return (this.amount > 0) ? numeral(this.amount).format('0,0') : 0;
    }
  }
};
</script>
