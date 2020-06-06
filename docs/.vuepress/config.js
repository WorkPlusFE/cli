module.exports = {
  title: 'WorkPlusFE 开发手册',
  base: '/w6s-cli',
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
      { text: 'H5 SDK', link: 'https://github.com/WorkPlusFE/sdk.js' },
      { text: 'Cordova 文档', link: 'https://workplusfe.github.io/cordova-docs/' },
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