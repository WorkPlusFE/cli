module.exports = {
  title: 'WorkPlusFE 开发手册',
  base: '/dev/',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],
  themeConfig: {
    sidebar: 'auto',
    displayAllHeaders: true,
    nav: [
      { text: '快速开始', link: '/' },
      { text: 'w6s-cli', link: '/cli' },
      { text: '使用 Sentry', link: '/sentry' },
      { text: '项目发布', link: '/deploy' },
      { text: '工具/库', link: '/packages' },
      { text: '常见问题', link: '/qa' },
      {
        text: '其他',
        items: [
          { text: '开放平台', link: 'https://open.workplus.io/v4/' },
          { text: 'Cordova 文档', link: 'https://open.workplus.io/cordova/' },
          { text: 'GitHub', link: 'https://github.com/WorkPlusFE/cli' },
        ]
      },
    ],
    lastUpdated: '最后更新时间',
    search: true,

    docsRepo: 'WorkPlusFE/cli',
    docsDir: 'docs',
    docsBranch: 'master',
    editLinks: true,
    editLinkText: '帮助 WorkPlusFE 改善此页面！'
  },
}