<template>
  <div class="container mx-auto bg-gray-200 h-screen" style="min-height:720px">
    <div class="flex flex-col items-center flex-1 h-full justify-center px-4 sm:px-0">
      <div class="flex rounded-lg shadow-lg w-full sm:w-3/4 lg:w-2/3 bg-white sm:mx-0">
        <div class="flex flex-col w-full md:w-1/2 p-4">
          <div class="flex flex-col flex-1 justify-center mb-8">
            <h1 class="text-3xl text-center font-thin">註冊</h1>
            <div class="w-full mt-4">
              <Form></Form>
              <hr class="my-5" />
              <div class="text-center">
                <router-link
                  to="/member/login"
                  class="ml-2 no-underline hover:underline text-blue-dark text-xs"
                >登入</router-link>
                <router-link
                  to="/member/forget"
                  class="ml-5 no-underline hover:underline text-blue-dark text-xs"
                >忘記密碼</router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="hidden md:block md:w-1/2 rounded-r-lg" v-bind:style="styleObject"></div>
        <div class="clearfix"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Form from './form.vue';

export default {
  name: 'MemberSignup',
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

<style>
.el-form-item__label {
  font-size: 0.75rem;
}
</style>
