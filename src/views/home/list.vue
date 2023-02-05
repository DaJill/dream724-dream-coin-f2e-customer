<template>
  <section class="py-10 mb-10">
    <div class="container mx-auto">
      <h2 class="text-2xl text-left mb-6">集資項目</h2>
      <div class="flex flex-wrap items-center justify-center sm:ml-0 ml-10">
        <router-link
          v-for="(project, key) in lists"
          :key="key"
          :to="`/projects/${project.code}`"
          tag="div"
          class="sm:w-1/2 md:w-1/3 lg:w-1/4 m-3 lg:m-8 border rounded-lg overflow-hidden cursor-pointer hover:bg-gray-100"
        >
          <img
            :src="`https://dream168.s3.ap-northeast-1.amazonaws.com/${project.image_path}`"
            class="h-40 w-full"
            :title="project.name"
          />
          <div class="p-5">
            <h4 class="font-normal">{{ project.name }}</h4>
            <hr class="my-3" />
            <div class="text-sm">
              <div class="float-left text-gray-500">
                <div class="float-left">
                  <img src="@/assets/images/time.png" class="icon-time" />
                </div>
                <div class="float-left">
                  剩下
                  <ExpirationDate :value="project.end_date"></ExpirationDate>天
                </div>
                <div class="clearfix"></div>
              </div>
              <div class="float-right">
                <Amount :amount="project.raised"></Amount>
              </div>
              <div class="clearfix"></div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <div class="clearfix"></div>
    <Pagination :value="pagination.current_page" @input="changePage" :pagination="pagination"></Pagination>
  </section>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import Amount from '@/components/format/Amount';
import ExpirationDate from '@/components/format/ExpirationDate';
import Pagination from '@/components/Pagination';
const { mapState, mapActions } = createNamespacedHelpers('product');

export default {
  name: 'HomeList',
  components: {
    Amount,
    ExpirationDate,
    Pagination
  },
  computed: {
    ...mapState(['lists', 'request', 'pagination', 'failure'])
  },
  methods: {
    ...mapActions(['getLists', 'initPagination', 'updatePage']),
    async fetchLists () {
      await this.getLists();
    },
    changePage (page) {
      this.updatePage(page);
      this.fetchLists();
    }
  },
  created () {
    this.initPagination();
    this.fetchLists();
  }
}
</script>

<style>
.icon-time {
  width: 19px;
  margin: 2px 3px 0 0;
  opacity: 0.5;
}
</style>
