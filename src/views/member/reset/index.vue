<template>
  <div class="container mx-auto bg-gray-200 h-screen">
    <div class="flex flex-col items-center flex-1 h-full justify-center px-4 sm:px-0">
      <div
        class="flex rounded-lg shadow-lg w-full sm:w-3/4 lg:w-2/3 bg-white sm:mx-0"
        style="height: 500px"
      >
        <div class="flex flex-col w-full md:w-1/2 p-4">
          <div class="flex flex-col flex-1 justify-center mb-8">
            <h1 class="text-3xl text-center font-thin">重設密碼</h1>
            <div class="w-full mt-4">
              <Form></Form>
            </div>
          </div>
        </div>
        <div
          class="hidden md:block md:w-1/2 rounded-r-lg"
          style="background: url('https://images.unsplash.com/photo-1515965885361-f1e0095517ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3300&q=80'); background-size: cover; background-position: center center;"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import Form from './form.vue';

export default {
  name: 'MemberReset',
  components: {
    Form
  }
};
</script>
