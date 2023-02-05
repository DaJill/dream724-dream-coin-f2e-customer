<template>
  <div>
    <HomeBanner />
    <HomeList />
  </div>
</template>

<script>
// @ is an alias to /src
import HomeBanner from './banner.vue';
import HomeList from './list.vue';

export default {
  name: 'Home',
  components: {
    HomeBanner,
    HomeList
  }
};
</script>
