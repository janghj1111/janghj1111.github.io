import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Today Jang Learn",
  description: "배우거나 이뤘던 것들을 기록합니다",
  vite: {
    server: {
      port: 19999 // 원하는 포트 번호로 변경
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    /********************************************** 
     **************** 상단 메뉴 ********************
     **********************************************/
    nav: [
      // { text: 'Backend', link: '/back/' },
      // { text: 'Project', link: '/side/' },
      // { text: 'CodingTest', link: '/vue/' },
      { text: 'Frontend',
        items : [
          {
            text : 'JavaScript',
            link : '/Front/JS',
          },
          {
            text : 'Vue',
            link : '/Front/Vue',
          },
          {
            text : 'React',
            link : '/Front/React',
          },
        ]
      },
      { text: 'Study',
        items : [
          {
            text : 'Web Dev',
            items : [
              {
                text : 'Web Dev',
                link : '/Study/WebDev/',
              },
            ]
          },
          {
            text : 'Spring',
            items : [
              {
                text : 'Spring MVC',
                link : '/Study/Spring/',
              },
              {
                text : 'JPA',
                link : '/Study/JPA',
              },
            ]
          },
          {
            text : 'Toss FF',
            link : '/Study/Toss',
          },
        ]
      },
    ],

    /********************************************** 
     **************** 왼쪽 사이드바 ****************
     **********************************************/
    sidebar: {
      /****** sample *******/ 
      '/': [
        {
          text: '예시',
          collapsed: false,
          items: [
            { text: '마크다운 예시', link: '/markdown-examples' },
            { text: 'API 예시', link: '/api-examples' }
          ]
        },
        {
          text: '예시2',
          collapsed: false,
          items: [
            { text: '마크다운 예시', link: '/sectionA/sectionA1' },
            { text: 'API 예시', link: '/sectionA/sectionA2' }
          ]
        },
        {
          text: '예시3',
          collapsed: false,
          items: [
            { 
              text: '예시3-1', 
              collapsed: false, 
              items: [
                {text: '예시3-1-1', link: '/sectionA/sectionA1'},
                {text: '예시3-1-2', link: '/sectionA/sectionA2'},
              ]
            },
          ]
        }
      ],
      /****** 공부 *******/ 
      '/Study/WebDev/': [
        { text: '웹 개발 연습', link: './' },
        {
          text: 'FRONT',
          collapsed: false,
          items: [
            { text: 'HTML/CSS', link: './css' },
            { 
              text: 'JavaScript', link: './js'
              /* collapsed: false, 
              items: [
                {text: '예시3-1-1', link: '/sectionA/sectionA1'},
                {text: '예시3-1-2', link: '/sectionA/sectionA2'},
              ] */
            },
          ]
        },
        {
          text: 'BACK',
          collapsed: false,
          items: [
            { 
              text: 'Node', 
              collapsed: false, 
              items: [
                {text: '작업중1', link: '/guide/ready'},
                {text: '작업중2', link: '/guide/ready'},
              ]
            },
          ]
        }
      ],
      '/Study/Toss/': [
        { text: 'Toss FF 시작하기', link: './' },
        {
          text: '가독성',
          collapsed: false,
          items: [
            { 
              text: '가독성1', 
              collapsed: false, 
              items: [
                {text: '작업중1', link: '/guide/ready'},
                {text: '작업중2', link: '/guide/ready'},
              ]
            },
          ]
        }
      ],
      '/guide/': [],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
