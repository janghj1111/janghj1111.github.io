
# Vue Router 가이드

Vue Router는 Vue.js의 공식 라우터입니다.    
Vue.js로 단일 페이지 애플리케이션(SPA)을 만들 때 사용되는 핵심 라이브러리입니다.

## 1. 기본 라우터 설정

### 1.1 라우터 설치

```bash
npm install vue-router@4
```

### 1.2 기본 라우터 구성

프로젝트의 라우터 구성은 다음과 합니다:

```
router/
├─ sampleRoutes.js  // 메인 라우트
├─ routes.js        // 라우트 목록 관리
└─ index.js         // 라우터 인스턴스 생성
```




```js
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    }
  ]
})

export default router
```

## 2. 라우터 가드 활용

### 2.1 전역 가드 (Global Guards)

현재 프로젝트에서는 인증 상태를 확인하기 위해 전역 가드를 사용하고 있습니다:

```js
router.beforeEach(async (to, from, next) => {
  const store = useStore()
  const isLoggedIn = computed(() => store.auth.isLoggedIn)
  
  // 로그인이 필요한 페이지 접근 시 체크
  if (to.meta.requiresAuth && !isLoggedIn.value) {
    next('/login')
  } else {
    next()
  }
})
```

### 2.2 라우트 메타 필드

각 라우트에 메타 정보를 추가하여 권한 관리를 할 수 있습니다:

```js
const routes = [
  {
    path: '/admin',
    component: AdminPanel,
    meta: { 
      requiresAuth: true,
      roles: ['admin']
    }
  }
]
```

## 3. 동적 라우팅

### 3.1 동적 라우트 매칭

URL 파라미터를 사용한 동적 라우팅 예시:

```js
const routes = [
  {
    path: '/user/:id',
    component: UserProfile,
    props: true
  }
]
```

### 3.2 프로그래매틱 네비게이션

컴포넌트에서 라우터를 사용하는 방법:

```js
// Options API
methods: {
  goToHome() {
    this.$router.push('/')
  }
}

// Composition API
const router = useRouter()
const goToHome = () => {
  router.push('/')
}
```

## 4. 중첩 라우트

현재 프로젝트의 중첩 라우트 구조:

```js
const routes = [
  {
    path: '/dashboard',
    component: DashboardLayout,
    children: [
      {
        path: '',
        component: DashboardHome
      },
      {
        path: 'profile',
        component: UserProfile
      }
    ]
  }
]
```

## 5. 라우터 모드

현재 프로젝트는 HTML5 History 모드를 사용하고 있습니다:

```js
const router = createRouter({
  history: createWebHistory(),
  routes: [...]
})
```

## 6. 주의사항

1. 라우터 가드에서 무한 리다이렉션이 발생하지 않도록 주의
2. 동적 라우트 매칭 시 와일드카드(*) 사용에 주의
3. 중첩 라우트 사용 시 부모 컴포넌트에 `<router-view>` 필수 배치

## 참고 자료

- [Vue Router 공식 문서](https://router.vuejs.org/)
- [Vue Router 4.0 가이드](https://router.vuejs.org/guide/)
```

이 문서는 Vue Router의 기본 개념과 실제 프로젝트에서의 활용 사례를 설명하고 있습니다. 필요에 따라 내용을 수정하거나 추가하실 수 있습니다.

현재 프로젝트의 사이드바에 이 문서를 추가하기 위해서는 config.mjs의 sidebar 설정을 참조하시면 됩니다:


```101:116:docs/.vitepress/config.mjs
      '/Front/Vue/': [
        {
          text: '📖 Vue 가이드',
          items: [
            { text: '시작하기', link: '/Front/Vue/', activeMatch: '/Front/Vue/' },
            {
              text: '프로젝트 설정',
              collapsed: false,
              items: [
                { text: 'Store', link: '/Front/Vue/store', activeMatch: '/Front/Vue/store' },
                { text: 'Router', link: '/Front/Vue/router', activeMatch: '/Front/Vue/router' },
              ]
            },
          ]
        },
      ],
```


## 출처

- vue3 공식문서 : https://v3-docs.vuejs-korea.org/guide/scaling-up/routing.html

- 상태관리 :  [Store](./store.md)  