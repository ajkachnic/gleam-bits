import { DefaultTheme, defineConfig } from "vitepress";

const guideSidebar = [
  {
    text: "The Essentials",
    base: "/guide/essentials/",
    items: [
      { text: "Introduction", link: "intro" },
      { text: "Error Handling", link: "error" },
      { text: "Testing", link: "testing" },
    ],
  },
  {
    text: "The Outside World",
    base: "/guide/outside-world/",
    items: [
      { text: "Files", link: "files" },
      { text: "Serialization", link: "serialization" },
      { text: "HTTP Client(s)", link: "http-client" },
      { text: "HTTP Server", link: "http-server" },
      { text: "Databases", link: "databases" },
    ],
  },
  {
    text: "OTP Concurrency",
    base: "/guide/otp",
    items: [
      { text: "Processes", link: "processes" },
      { text: "Actors", link: "actors" },
      { text: "Supervisors", link: "supervisors" },
    ],
  },
  {
    text: "BEAM Platform",
    base: "/guide/platform",
    items: [
      { text: "BEAM Interop", link: "beam-interop" },
      { text: "ETS", link: "ets" },
    ],
  },
  {
    text: "Going Further",
    base: "/guide/further/",
    items: [
      { text: "JavaScript", link: "js" },
      { text: "Ecosystem", link: "ecosystem" },
      { text: "Resources", link: "resources" },
      { text: "Contributing", link: "contributing" },
    ],
  },
] satisfies DefaultTheme.SidebarItem[];

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
    theme: { light: "vitesse-light", dark: "vitesse-dark" },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav,

    sidebar: {
      "/guide/": { base: "/guide/", items: guideSidebar },
      "/patterns/": { base: "/patterns/", items: patternsSidebar },
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/ajkachnic/gleam-bits" },
    ],
  },
  head: [
    [
      "script",
      {},
      "window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };",
    ],
    ["script", { defer: "", src: "/_vercel/insights/script.js" }],
  ],
});
