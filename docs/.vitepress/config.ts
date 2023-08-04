/**
 * @description 基础配置
 */
import { defineConfig } from 'vitepress'
import { sidebar, nav } from './layout'

export default defineConfig({
  title: '小绵杨Yancyの博客', // 文档的标题
  description: '分享前沿学习干货，不止前端', // 文档描述
  lastUpdated: true,

  // 移动端搜索框优化
  head: [
    [
      'meta',
      {
        name: 'viewport',
        content: 'width=device-width,initial-scale=1,user-scalable=no'
      }
    ],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }]
  ],

  // 配置markdown写作风格
  markdown: {
    toc: {
      level: [1, 2, 3, 4]
    },
    headers: {
      level: [1, 2, 3, 4]
    },
    // https://github.com/valeriangalliat/markdown-it-anchor#usage
    anchor: {
      // permalink: anchor.permalink.headerLink()
    },
    lineNumbers: true, // 让代码块中实现行号
  },

  // 主题配置
  themeConfig: {
    nav,
    sidebar,
    // 支持一级标题的时候再说
    outline: {
      level: [1, 6],
      label: '目录'
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/yancyzhang30' }],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present 小绵杨'
    }
  }
});