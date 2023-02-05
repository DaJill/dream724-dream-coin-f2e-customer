<template>
  <section class="pt-10 pb-0">
    <div class="container mx-auto p-5">
      <h1 class="my-5 text-center text-2xl">常見問題</h1>
      <hr />
      <div class="my-10 p-5">
        <h2 class="my-3 text-left text-2xl">一、發起計畫</h2>
        <section class="shadow">
          <article
            class="border-b"
            v-for="(faq, key) in list"
            @click="toggleDescription(key, faq, 'one')"
          >
            <div
              v-bind:class="{ 'border-transparent': faq.active, 'border-gray-700': faq.active }"
              class="border-l-2"
            >
              <header
                class="flex justify-between items-center p-5 pl-8 pr-8 cursor-pointer select-none"
              >
                <span
                  class="text-gray-500 font-thin text-xl"
                  v-bind:class="{ 'text-gray-500': faq.active, 'text-gray-700': faq.active }"
                >{{ faq.title }}</span>
                <div
                  class="rounded-full border border-grey w-7 h-7 flex items-center justify-center"
                  v-bind:class="{ 'hidden': faq.active }"
                >
                  <svg
                    aria-hidden="true"
                    class
                    data-reactid="266"
                    fill="none"
                    height="24"
                    stroke="#606F7B"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
                <div
                  class="rounded-full border border border-gray-700 w-7 h-7 flex items-center justify-center bg-gray-700"
                  v-bind:class="{ 'hidden': !faq.active }"
                >
                  <!-- icon by feathericons.com -->
                  <svg
                    aria-hidden="false"
                    data-reactid="281"
                    fill="none"
                    height="24"
                    stroke="white"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline points="18 15 12 9 6 15" />
                  </svg>
                </div>
              </header>
              <div>
                <div class="pl-8 pr-8 pb-5 text-grey-darkest">
                  <p class="pl-4">
                    <slide-up-down :active="faq.active" :duration="300">{{faq.description }}</slide-up-down>
                  </p>
                </div>
              </div>
            </div>
          </article>
        </section>
        <br />
        <h2 class="my-3 text-left text-2xl">⼆、贊助計畫</h2>
        <section class="shadow">
          <article
            class="border-b"
            v-for="(faq, key) in listSecond"
            @click="toggleDescription(key, faq, 'second')"
          >
            <div
              v-bind:class="{ 'border-transparent': faq.active, 'border-gray-700': faq.active }"
              class="border-l-2"
            >
              <header
                class="flex justify-between items-center p-5 pl-8 pr-8 cursor-pointer select-none"
              >
                <span
                  class="text-gray-500 font-thin text-xl"
                  v-bind:class="{ 'text-gray-500': faq.active, 'text-gray-700': faq.active }"
                >{{ faq.title }}</span>
                <div
                  class="rounded-full border border-grey w-7 h-7 flex items-center justify-center"
                  v-bind:class="{ 'hidden': faq.active }"
                >
                  <svg
                    aria-hidden="true"
                    class
                    data-reactid="266"
                    fill="none"
                    height="24"
                    stroke="#606F7B"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
                <div
                  class="rounded-full border border border-gray-700 w-7 h-7 flex items-center justify-center bg-gray-700"
                  v-bind:class="{ 'hidden': !faq.active }"
                >
                  <!-- icon by feathericons.com -->
                  <svg
                    aria-hidden="false"
                    data-reactid="281"
                    fill="none"
                    height="24"
                    stroke="white"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline points="18 15 12 9 6 15" />
                  </svg>
                </div>
              </header>
              <div>
                <div class="pl-8 pr-8 pb-5 text-grey-darkest">
                  <p class="pl-4">
                    <slide-up-down :active="faq.active" :duration="300">{{faq.description }}</slide-up-down>
                  </p>
                </div>
              </div>
            </div>
          </article>
        </section>
      </div>
    </div>
  </section>
</template>

<script>
import SlideUpDown from 'vue-slide-up-down'

export default {
  name: 'Faq',
  components: {
    SlideUpDown
  },
  data: () => ({
    active: [false, false],
    list: [
      { title: '提案⼈人的⾝身分有限制嗎?', description: '要在圓夢上發起計畫，您必須為台灣居⺠民並且擁有台灣的銀行帳⼾。', active: false },
      { title: '發起計畫需要付錢嗎?', description: '圓夢收取計畫成功後金額的 6 %，其中包含金流服務和圓夢收取的⼿手續費以及圓夢網站的維護費⽤用。我們收取小額的網站維護費⽤用是為確保圓夢能夠長久經營，幫助更多的創作⼈。', active: false },
      { title: '集資⽬目標有限制嗎?', description: '⾦額沒有限制。但是計畫只要沒有達到目標，收到的贊助金額會全數退回給⽀持者。', active: false },
      { title: '集資的時間有限制嗎?', description: '建議時間在 35-45 天左右。集資時間太長對於達標少有幫助，贊助⼈也會因此看不到您需要資⾦的急迫性。集資時間並不包括計畫執行時間。計畫執行時間並沒有限制。', active: false },
      { title: '發起的計畫集資成功了，哪時候才能拿到贊助的款項呢?', description: '計畫成功結束後，圓夢將扣除交付款項所需之⼿續費後，於次月十日前將剩餘之代收款項給付給提案⼈。', active: false },
      { title: '發起的計畫集資成功了，該怎麼聯聯絡贊助人?', description: '計畫成功結束後，圓夢有提供「贊助⼈列列表」，其中包含所有贊助人的聯聯絡資料和贊助細節。', active: false },
      { title: '在圓夢上⾯面發起計畫有哪些好處?', description: '圓夢⽤意在於鼓勵、幫助台灣的創意⼈做自己想做的事情。在圓夢上提案除了會在圓夢網站、圓夢 facebook ⾴面曝光以外，還有機會登上與我們合作的其他社群媒體平台。', active: false },
      { title: '為什什麼計畫要經過審核?', description: '圓夢會就提案的內容做評估。然⽽提案人所刊載內容之真實性、合法性、即時性等並無審查之義務，亦不負任何明示或默示之承諾或擔保。', active: false }
    ],
    listSecond: [
      { title: '我⽀支持的計畫沒有成功/失敗了的話，我贊助的錢跑去哪裡?', description: '如果計畫期限到了仍然沒有達到⽬標，圓夢會跟您確認您想要的退款⽅式退還所支持的金額(不包含虛擬帳號轉帳交易⼿續費)。', active: false },
      { title: '我想取消贊助或退款，該怎麼做?', description: '如果您所⽀持的計畫仍在計畫集資期間尚未結束，您可以與圓夢客服聯絡，我們會跟您確認您想要的退款⽅式退還所支持的金額(不包含虛擬帳號轉帳交易⼿續費)。如果該計畫已經集資結束，您則需要與提案人聯絡。', active: false },
      { title: '贊助計畫會有收據嗎?', description: '贊助圓夢的計畫後，您會收到由圓夢所寄出的 Email 收款證明，此證明並非電⼦發票。贊助回饋的發票或收據，在計畫成功達標結束後，將由計畫提案人負責處理。', active: false }
    ]
  }),
  methods: {
    toggleDescription (key, data, type) {
      if (type === 'one') {
        if (data.active) {
          this.list[key]['active'] = false;
        } else {
          this.list[key]['active'] = true;
        }
      } else {
        if (data.active) {
          this.listSecond[key]['active'] = false;
        } else {
          this.listSecond[key]['active'] = true;
        }
      }
    }
  }
};
</script>
