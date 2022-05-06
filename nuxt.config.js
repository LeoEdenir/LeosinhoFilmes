export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  router: {
    middleware: [
      'loggedIn',
    ],
  },

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'LeosinhoFilmes',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/global.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vuex-persist', ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/firebase',
    '@nuxtjs/toast',
  ],

  firebase: {
    config: {
      apiKey: "AIzaSyBokCfiLCYOKlXtCYKAPSe-fabm52MwP7k",
      authDomain: "leosinhofilmes.firebaseapp.com",
      projectId: "leosinhofilmes",
      storageBucket: "leosinhofilmes.appspot.com",
      messagingSenderId: "977925552851",
      appId: "1:977925552851:web:7ed843d57be0e98d47b226",
      databaseURL: 'https://leosinhofilmes.firebaseio.com"',
    },
    services: {
      auth: true,
      firestore: true
    },
  },

  firestore: {
    memoryOnly: false,
    enablePersistence: true,
    emulatorPort: 8080,
    emulatorHost: 'localhost',
    settings: {
      // Firestore Settings - currently only works in SPA mode
    }
  },

  toast: {
    position: 'top-center',
    duration: 3000,
  },

  axios: {
    baseURL: "https://api.themoviedb.org/3/",
  },

  env: {
    paramsUrl: {
      api_key: "7a6c316575389afeedb5d6c5dd145032",
      language: "pt-BR"
    },
    PORT: 8000
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
