const fs = require('fs');
const path = require('path');

const postPath = path.resolve(__dirname, '../post');

function getPostFileList() {
  try {
    const files = fs.readdirSync(postPath, 'utf-8');
    const getNumber = (name) => name.split('-').shift();
    return files.filter(file => file !== 'README.md').sort((a, b) => getNumber(a) < getNumber(b));
  } catch (error) {
    console.log(error);
    return [];
  }
}

console.log(getPostFileList())

module.exports = {
  title: 'FED',
  base: '/dev/',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],
  themeConfig: {
    logo: '/logo.png',
    displayAllHeaders: true,
    nav: [
      { text: '项目创建', link: '/' },
      { text: 'DevOps', link: '/DevOps/' },
      { text: 'w6s-cli', link: '/cli' },
      { text: '工具/库', link: '/packages' },
      { text: '文章', link: '/post/' },
      { text: '常见问题', link: '/qa' },
      {
        text: '其他',
        items: [
          { text: '开放平台', link: 'https://open.workplus.io/v4/' },
          { text: 'Cordova 文档', link: 'https://open.workplus.io/cordova/' },
          { text: 'GitHub', link: 'https://github.com/WorkPlusFE/' },
        ]
      },
    ],
    sidebar: {
      '/DevOps/': [
        {
          title: '资源发布',
          collapsable: false,
          sidebarDepth: 2,
          children: [
            '',
          ]
        }, {
          title: '日志埋点',
          collapsable: false,
          sidebarDepth: 2,
          children: [
            'sentry',
          ]
        }, {
          title: '持续集成',
          collapsable: false,
          sidebarDepth: 2,
          children: [
            'jenkins',
          ]
        }
      ],
      '/post/': [
        {
          title: '团队文章',
          collapsable: false,
          sidebarDepth: 0,
          children: getPostFileList()
        }
      ]
    },
    lastUpdated: '最后更新时间',
    search: false,

    docsRepo: 'WorkPlusFE/cli',
    docsDir: 'docs',
    docsBranch: 'master',
    editLinks: true,
    editLinkText: '帮助 WorkPlusFE 改善此页面！'
  },
}