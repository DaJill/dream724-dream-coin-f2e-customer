<template>
  <nav class="py-4 border-b">
    <div class="container mx-auto flex justify-between items-center">
      <router-link to="/">
        <h1 class="text-2xl cursor-pointer hover:text-blue-900">圓夢</h1>
      </router-link>
      <LayoutNav />
    </div>
  </nav>
</template>

<script>
import LayoutNav from './nav.vue';

export default {
  name: 'LayoutHeader',
  components: {
    LayoutNav
  }
}
</script>
