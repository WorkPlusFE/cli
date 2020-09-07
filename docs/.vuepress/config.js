module.exports = {
  title: 'WorkPlusFE 开发手册',
  base: '/w6s-cli/',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  themeConfig: {
    sidebar: 'auto',
    displayAllHeaders: true,
    nav: [
      { text: '快速开始', link: '/' },
      { text: '常用模块', link: '/packages' },
      { text: '常见问题', link: '/qa' },
      { text: '安卓真机调试', link: '/debug' },
      { text: '开放平台', link: 'https://open.workplus.io/v4/' },
      { text: 'Cordova 文档', link: 'https://open.workplus.io/cordova/' },
    ],
    lastUpdated: '最后更新时间',
    repo: 'workplusfe/w6s-cli',
    search: false,
    docsDir: 'docs',
    docsBranch: 'master',
    editLinks: true,
    editLinkText: '帮助我们改善此页面！'
  },
}