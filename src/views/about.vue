<template>
  <section class="pt-10 pb-0">
    <div class="container mx-auto bg-gray-200 p-5">
      <h1 class="my-5 text-center text-2xl">關於我們</h1>
      <hr />
      <p class="my-10 mt-16 sm:px-5 md:px-32 text-sm">
        源自於一群熱愛程式、富有創造力的熱血青年共同成立。主要以研發科技娛樂及其附加產品為基礎，期盼能提昇人們的生活品質，
        並將歡樂帶給每位使用者。圓夢工作室追求的目標不僅是將創意投入於現有已開發的產品，更要不斷求新求變開發不同於市場之新穎產品，
        以及致力於將產品推向符合國際標準認定的層級，未來將不斷追求技術的創新與提昇，並將產品市場定位於國際。
      </p>
    </div>
    <div class="container mx-auto p-5 mt-10">
      <h1 class="my-5 text-center text-2xl">對於贊助者的您</h1>
      <hr />
      <p class="my-10 mt-16 sm:px-5 md:px-32 text-sm">
        每個計畫都會由發起者準備不同金額的贊助回饋。你可以透過贊助這些最新、最快、最與眾不同的商品或美好體驗、支持他們的夢想實現。
        計畫成功後，你就能依照贊助的金額得到你所預購的驚喜回饋，同時也讓一件美好的事物發生在你我的生活中！
        計畫如果失敗了，支持的金額將會退回到你的帳戶（不包含虛擬帳號轉帳交易手續費）。
      </p>
      <div class="text-center">
        <router-link to="/">
          <button
            class="bg-yellow-600 hover:bg-yellow-700 text-white py-1 font-light px-20 rounded"
          >開始贊助專案</button>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'About'
};
</script>
