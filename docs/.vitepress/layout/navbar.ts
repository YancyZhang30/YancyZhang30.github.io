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
    text: '关于我',
    items: [
      {
        text: '掘金',
        link: 'https://juejin.cn/user/3131845139247960/posts'
      },
      { text: 'Github', link: 'https://github.com/Jacqueline712' },
      {
        text: '飞书社区',
        link: 'https://pzfqk98jn1.feishu.cn/wiki/space/7193915595975491587?ccm_open_type=lark_wiki_spaceLink'
      }

      // { text: '公众号', link: 'https://blog.csdn.net/weixin_44803753' }
    ]
  }
];