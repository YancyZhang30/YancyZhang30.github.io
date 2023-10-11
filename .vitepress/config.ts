import { defineConfig } from 'vitepress';

import { docsAuto } from '@yicode-helper/yidocs-auto';

let { sideBar, navBar } = docsAuto();

export default defineConfig({
  base: '/',
  title: '小绵杨の博客',
  description: '何以解忧，唯有代码。',
  lastUpdated: true,
  outDir: './dist',
  srcDir: './markdown',
  markdown: {
    theme: 'material-theme-palenight',
    lineNumbers: true
  },
  titleTemplate: false,
  head: [
    //
    [
      'link',
      {
        rel: 'shortcut icon',
        href: '/favicon.ico'
      }
    ]
  ],
  themeConfig: {
    logo: '/logo.png',
    lastUpdatedText: '更新时间',
    siteTitle: '小绵杨の博客',
    outline: 'deep',
    outlineTitle: '目录',
    socialLinks: [{ icon: 'github', link: 'https://github.com/yancyzhang30' }],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present 小绵杨'
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    nav: navBar,
    sidebar: sideBar
  }
});
