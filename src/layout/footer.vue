<template>
  <footer class="container mx-auto clearfix py-5 border-t text-center mb-20 mt-5 sm:mb-0 mt-10">
    <div class="flex justify-center">
      <router-link to="/about" tag="div" class="cursor-pointer hover:text-blue-900">關於我們</router-link>
      <div class="mx-2">|</div>
      <router-link to="/policy" tag="div" class="cursor-pointer hover:text-blue-900">網站使用條款</router-link>
      <div class="mx-2">|</div>
      <router-link to="/faq" tag="div" class="cursor-pointer hover:text-blue-900">常見問題</router-link>
    </div>
    <p class="text-gray-500 mt-2 text-xs">Copyringt © 2019 By 圓夢工作室</p>
  </footer>
</template>

<script>
export default {
  name: 'LayoutFooter'
}
</script>
