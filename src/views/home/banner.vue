<template>
  <section class="py-10">
    <div class="container mx-auto">
      <img src="@/assets/images/home.jpg" class="hidden" />
      <video loop="true" autoplay="autoplay" muted="true" class="w-screen">
        <source type="video/mp4" src="@/assets/home.mp4" />
      </video>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HomeBanner'
}
</script>
