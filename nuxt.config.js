export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: "server",

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: "Logical Cobwebs",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "Logical Cobwebs is Bill Horsman and Nonie Coulthard and it's based in Scotland.",
      },
    ],
    link: [
      { rel: "icon", type: "image/png", sizes: "96x96", href: "/favicon.png" },
      {
        rel: "stylesheet",
        href: "https://use.fontawesome.com/releases/v5.0.13/css/all.css",
        integrity:
          "sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp",
        crossorigin: "anonymous",
      },
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ["@/assets/stylesheets/typography.scss"],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ["~/plugins/global.js"],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    "@nuxtjs/tailwindcss",
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
};
