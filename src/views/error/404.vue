<template>
  <section class="pt-10 pb-0">
    <div class="container mx-auto p-5 mt-10">
      <h1 class="my-5 text-center text-2xl">404</h1>
      <hr />
      <p class="my-10 mt-16 sm:px-5 md:px-32 text-sm text-center">抱歉！我們似乎無法找到您要找的頁面。</p>
      <div class="text-center">
        <router-link to="/">
          <button
            class="bg-yellow-600 hover:bg-yellow-700 text-white py-1 font-light px-20 rounded"
          >探討贊助</button>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Error404'
};
</script>
