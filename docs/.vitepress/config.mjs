import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'ko-KR',
  title: "Today Jang Learn",
  description: "배우거나 이뤘던 것들을 기록합니다",
  base: '/', // github.io 형식이므로 '/'로 설정
  vite: {
    server: {
      port: 19999, // 원하는 포트 번호로 변경
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            :root {
              --vp-c-brand: #646cff;
              --vp-c-brand-light: #747bff;
              --vp-c-brand-lighter: #9499ff;
              --vp-c-brand-dark: #535bf2;
              --vp-c-brand-darker: #454ce1;
            }
          `
        }
      }
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    /********************************************** 
     **************** 상단 메뉴 ********************
     **********************************************/
    logo: '/logo.png',
    nav: [
      { text: '🏠 Home', link: '/' },
      { text: '💻 Project', link: '/Side/' },
      { 
        text: '🎨 Frontend',
        items: [
          { text: 'JavaScript', link: '/Front/JS/' },
          { text: 'Vue', link: '/Front/Vue' },
          { text: 'React', link: '/Front/React' },
        ]
      },
      {
        text: '📚 Study',
        items: [
          {
            text: '웹 개발',
            items: [
              { text: 'Web Dev', link: '/Study/WebDev/' },
            ]
          },
          {
            text: '백엔드',
            items: [
              { text: 'Spring MVC', link: '/Study/Spring/' },
              { text: 'JPA', link: '/Study/JPA' },
            ]
          },
          {
            text : 'Toss FF',
            link : '/Study/Toss',
            activeMatch : '/Study/Toss',
          },
        ]
      },
    ],

    /********************************************** 
     **************** 왼쪽 사이드바 ****************
     **********************************************/
    sidebar: {
      /****** Front *******/ 
      '/Front/JS/': [
        {
          text: '📖 JavaScript 가이드',
          items: [
            { text: '시작하기', link: '/Front/JS/', activeMatch: '/Front/JS/' },
            {
              text: '핵심 개념',
              collapsed: false,
              items: [
                { text: '기초 문법', link: '/Front/JS/hello', activeMatch: '/Front/JS/hello' },
                { text: '클래스', link: '/Front/JS/class', activeMatch: '/Front/JS/class' },
              ]
            }
          ]
        },
        // {
        //   text: '예시2',
        //   collapsed: false,
        //   items: [
        //     {text: '작업중1', link: '/guide/ready'},
        //     {text: '작업중2', link: '/guide/ready'},
        //   ]
        // },
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
        { text: 'Toss FF 시작하기', link: './', activeMatch : '/Study/Toss/', },
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
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present Jang'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/janghj1111' }
    ],
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '검색',
                buttonAriaLabel: '검색'
              },
              modal: {
                noResultsText: '검색 결과가 없습니다.',
                resetButtonTitle: '검색어 초기화',
                footer: {
                  selectText: '선택',
                  navigateText: '이동'
                }
              }
            }
          }
        }
      }
    }
  },
  appearance: 'dark',
})
