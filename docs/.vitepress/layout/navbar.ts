import { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.NavItem[] = [
  {
    text: '首页',
    link: '/'
  },
  {
    text: '随便写写',
    items: [
      {
        text: '随笔',
        link: '/views/essay/'
      },
      {
        text: '工具·库',
        link: '/views/tool/'
      }
    ]
  },
  {
    text: '学无止境',
    items: [
      {
        text: 'Linux',
        link: '/views/linux/'
      },
      {
        text: 'Nginx',
        link: '/views/nginx/'
      },
      {
        text: 'NodeJs',
        link: '/views/node/'
      },
      {
        text: '数据结构与算法',
        link: '/views/algorithm/'
      }
    ]
  },
  {
    text: '关于我',
    items: [
      {
        text: 'CSDN',
        link: 'https://blog.csdn.net/ZHANGYANG_1109'
      },
      { text: 'Github', link: 'https://github.com/yancyzhang30' },
      // { text: '公众号', link: 'https://blog.csdn.net/weixin_44803753' }
    ]
  }
];