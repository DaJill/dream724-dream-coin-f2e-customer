<template>
  <div id="app" class="font-sans">
    <go-top bg-color="#2d3748" :size="gotopSize"></go-top>
    <router-view />
  </div>
</template>

<script>
import GoTop from '@inotom/vue-go-top';

export default {
  name: 'App',
  components: {
    GoTop
  },
  data: () => ({
    gotopSize: 45
  })
}
</script>
