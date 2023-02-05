<template>
  <div class="container mx-auto bg-gray-200 h-screen">
    <div class="flex flex-col items-center flex-1 h-full justify-center px-4 sm:px-0">
      <div
        class="flex rounded-lg shadow-lg w-full sm:w-3/4 lg:w-2/3 bg-white sm:mx-0"
        style="height: 500px"
      >
        <div class="flex flex-col w-full md:w-1/2 p-4">
          <div class="flex flex-col flex-1 justify-center mb-8">
            <h1 class="text-3xl text-center font-thin">嗨，歡迎回來</h1>
            <div class="w-full mt-4">
              <Form></Form>
              <div class="text-center mt-3">
                <router-link
                  to="/member/signup"
                  tag="button"
                  class="bg-white hover:bg-gray-300 text-sm border border-gray-500 py-1 px-4 rounded"
                >註冊</router-link>
                <router-link
                  to="/member/forget"
                  class="ml-2 no-underline hover:underline text-blue-dark text-xs"
                >忘記密碼?</router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="hidden md:block md:w-1/2 rounded-r-lg" v-bind:style="styleObject"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Form from './form.vue';

export default {
  name: 'MemberLogin',
  data: () => ({
    styleObject: {
      background: 'url(\'../images/login.jpg\')',
      backgroundSize: 'cover',
      backgroundPosition: 'center center'
    }
  }),
  components: {
    Form
  }
};
</script>
