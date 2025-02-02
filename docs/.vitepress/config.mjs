import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Today Jang Learn",
  description: "배우거나 이뤘던 것들을 기록합니다",
  base: '/', // github.io 형식이므로 '/'로 설정
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
      { text: 'Project', link: '/Side/' },
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
      '/sample/': [
        {
          text: '예시',
          collapsed: false,
          items: [
            {text: '작업중1', link: '/guide/ready'},
            {text: '작업중2', link: '/guide/ready'},
          ]
        },
        {
          text: '예시2',
          collapsed: false,
          items: [
            {text: '작업중1', link: '/guide/ready'},
            {text: '작업중2', link: '/guide/ready'},
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
                {text: '작업중1', link: '/guide/ready'},
                {text: '작업중2', link: '/guide/ready'},
              ]
            },
          ]
        }
      ],
      /****** 사이드 프로젝트 기록용용 *******/ 
      '/Side/': [
        {
          text: '개인 블로그',
          collapsed: false,
          items: [
            { text: 'vitePress', link: '/guide/ready' },
          ]
        },
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
                {text: '작업중1', link: '/guide/ready'},
                {text: '작업중2', link: '/guide/ready'},
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
