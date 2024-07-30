import { defineConfig } from "vitepress";

const guideSidebar = [
  {
    text: "The Basics",
    link: "guide/basics",
    items: [
      { text: "Error handling", link: "/guide/basics/error-handling" },
      { text: "Testing", link: "/guide/basics/testing" },
    ],
  },
  {
    text: "The Outside World",
    link: "/guide/outside-world",
    items: [
      { text: "Serialization", link: "/guide/outside-world/json" },
      { text: "HTTP Client(s)", link: "/guide/outside-world/http-client" },
      { text: "HTTP Server", link: "/guide/outside-world/http-server" },
      { text: "Databases", link: "/guide/outside-world/databases" },
    ],
  },
  {
    text: "OTP Concurrency",
    link: "/guide/otp",
    items: [
      { text: "Processes", link: "/guide/otp/processes" },
      { text: "Actors", link: "/guide/otp/actors" },
      { text: "Supervisors", link: "/guide/otp/supervisors" },
    ],
  },
  {
    text: "BEAM Platform",
    link: "/guide/platform",
    items: [
      { text: "BEAM Interop", link: "/guide/platform/beam-interop" },
      { text: "ETS", link: "/guide/platform/ets" },
      { text: "Mnesia", link: "/guide/platform/mnesia" },
    ],
  },
  {
    text: "Going Further",
    link: "/guide/further",
    items: [
      { text: "JavaScript", link: "/guide/further/js" },
      { text: "Ecosystem", link: "/guide/further/ecosystem" },
      { text: "Resources", link: "/guide/further/resources" },
    ],
  },
];

const patternsSidebar = [{ text: "Extensions", link: "/patterns/extensions" }];

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
