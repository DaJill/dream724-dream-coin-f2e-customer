export default [
  {
    path: '',
    component: () => import('@/layout'),
    children: [
      {
        path: '/',
        name: 'home',
        meta: { title: '' },
        component: () => import('@/views/home')
      },
      {
        path: '/projects/:code',
        meta: { title: '專案' },
        component: () => import('@/views/projects')
      },
      {
        path: '/order/checkout',
        meta: { title: '贊助結帳', requiresAuth: true },
        component: () => import('@/views/order/checkout')
      },
      {
        path: '/order/confirm',
        meta: { title: '付款確認', requiresAuth: true },
        component: () => import('@/views/order/confirm')
      },
      {
        path: '/order/finish/:no',
        meta: { title: '結帳完畢', requiresAuth: true },
        component: () => import('@/views/order/finish')
      },
      {
        path: '/member/login',
        meta: { title: '登入' },
        component: () => import('@/views/member/login/index')
      },
      {
        path: '/member/signup',
        meta: { title: '註冊' },
        component: () => import('@/views/member/signup/index')
      },
      {
        path: '/member/confirm',
        meta: { title: '註冊確認' },
        component: () => import('@/views/member/confirm/index')
      },
      {
        path: '/member/forget',
        meta: { title: '忘記密碼' },
        component: () => import('@/views/member/forget/index')
      },
      {
        path: '/member/reset',
        meta: { title: '重設密碼' },
        component: () => import('@/views/member/reset/index')
      },
      {
        path: '/member/resend',
        meta: { title: '重發電子信箱認證信件' },
        component: () => import('@/views/member/resend/index')
      },
      {
        path: '/member/setting',
        meta: { title: '個人設置', requiresAuth: true },
        component: () => import('@/views/member/setting/index')
      },
      {
        path: '/about',
        meta: { title: '關於我們' },
        component: () => import('@/views/about')
      },
      {
        path: '/policy',
        meta: { title: '網站使用條款' },
        component: () => import('@/views/policy')
      },
      {
        path: '/faq',
        meta: { title: '常見問題' },
        component: () => import('@/views/faq')
      }
    ]
  },
  {
    path: '*',
    component: () => import('@/views/error/404')
  }
];
