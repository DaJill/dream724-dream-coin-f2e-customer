<template>
  <div class="container mx-auto p-5">
    <LayoutHeader />
    <router-view />
    <LayoutFooter />
  </div>
</template>

<script>
import LayoutHeader from './header.vue';
import LayoutFooter from './footer.vue';

export default {
  name: 'Layout',
  components: {
    LayoutHeader,
    LayoutFooter
  }
}
</script>
