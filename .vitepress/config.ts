import { defineConfig } from "vitepress";

const guideSidebar = [
  {
    text: "The Essentials",
    // link: "guide/essentials",
    items: [
      { text: "Error Handling", link: "/essentials/error" },
      { text: "Testing", link: "/essentials/testing" },
    ],
  },
  {
    text: "The Outside World",
    link: "/outside-world",
    items: [
      { text: "Serialization", link: "/outside-world/json" },
      { text: "HTTP Client(s)", link: "/outside-world/http-client" },
      { text: "HTTP Server", link: "/outside-world/http-server" },
      { text: "Databases", link: "/outside-world/databases" },
    ],
  },
  {
    text: "OTP Concurrency",
    link: "/otp",
    items: [
      { text: "Processes", link: "/otp/processes" },
      { text: "Actors", link: "/otp/actors" },
      { text: "Supervisors", link: "/otp/supervisors" },
    ],
  },
  {
    text: "BEAM Platform",
    link: "/platform",
    items: [
      { text: "BEAM Interop", link: "/platform/beam-interop" },
      { text: "ETS", link: "/platform/ets" },
      { text: "Mnesia", link: "/platform/mnesia" },
    ],
  },
  {
    text: "Going Further",
    link: "/further",
    items: [
      { text: "JavaScript", link: "/further/js" },
      { text: "Ecosystem", link: "/further/ecosystem" },
      { text: "Resources", link: "/further/resources" },
    ],
  },
];

const patternsSidebar = [{ text: "Extensions", link: "/extensions" }];

const nav = [
  {
    text: "Guide",
    link: "/guide/",
    activeMatch: "/guide/",
  },
  {
    text: "Patterns",
    link: "/patterns/",
    activeMatch: "/patterns/",
  },
];

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "./src",
  title: "Gleam Bits",
  description: "Bite-sized pieces of Gleam knowledge",
  markdown: {
    theme: "vitesse-dark",
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav,

    sidebar: {
      "/guide/": { base: "/guide/", items: guideSidebar },
      "/patterns/": { base: "/patterns/", items: patternsSidebar },
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
