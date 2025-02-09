
# Vue Router 가이드

Vue Router는 Vue.js의 공식 라우터입니다.    
Vue.js로 단일 페이지 애플리케이션(SPA)을 만들 때 사용되는 핵심 라이브러리입니다.

## 1. 기본 라우터 설정

현재 목표는 아래와 같습니다. 

::: info 목표
1. '/sample' url 접근 시 샘플페이지 표시
2. 페이지들의 라우팅 관리 용이
3. 네비게이션 가드를 이용한 페이지 접근 제어 
:::


### 기본 라우터 구성



#### index.js

아래는 기존 index.js입니다.    

```js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/sample',
      name: 'sample',
      component: () => import('../views/SampleView.vue'),
    },
  ],
})

export default router

```

기본적으로 제공되는 router 설정이지만 이렇게 관리되면 발생하는 문제점이 있습니다.
1. 늘어나는 페이지 수만큼 index.js가 길어지고 복잡해짐.
2. 페이지 이동 시마다 페이지에 대한 제어가 불가함. (인증이나 에러 핸들링 등등)



그래서 프로젝트의 라우터 구성은 다음과 같이 합니다:

```
router/
├─ sampleRoutes.js  // 특정 페이지들에 대한 라우트 정보
├─ routes.js        // 라우트 목록 관리
└─ index.js         // 라우터 인스턴스 생성
```


#### sampleRoutes.js

```js

const defaultPath = '/sample';
const getMeta = (name) => {
    return {
        name : name,
        layout : 'SampleLayout',
    }
}
const sampleRoutes = {
    path: defaultPath,
    meta: getMeta('Sample Home'),
    children: [
      {
        path: defaultPath,
        name : "SampleHome",
        component: () => import("@/views/sample/SampleHome.vue"),
        meta: getMeta('Sample Home1'),
      },
    ],
  };
export default sampleRoutes;
``` 

- sample페이지로 이동하기 위한 라우팅 정보들입니다.
- `getMeta` 함수는 라우트의 메타 정보를 생성하는 헬퍼 함수입니다.
- 동적 임포트(`import()`)를 사용하여 지연 로딩됩니다.



#### routes.js

```js
import sampleRoutes from "./sampleRoutes";

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue'),
  },
]

routes.push(sampleRoutes);

export default routes;

``` 

- 라우터 인스턴스에서 사용될 routes를 따로 빼놓습니다.    
routes에 추가로 sampleRoutes를 포함시킵니다.    


#### 변경된 router/index.js

```js
import { createRouter, createWebHistory } from 'vue-router'
import routes from "./routes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
```

기존보다 훨씬 간결하게 변경되었습니다.    
페이지가 늘어나게 되면 index.js가 복잡해질 것 없이 routes 파일에 모든 라우트 정보를 관리하면 됩니다.    
변경된 index.js에서는 라우터 인스턴스 생성 후 페이지 제어에 필요한 
**라우터 가드**에 집중할 수 있습니다.


<!---------------------------- 0209 jhj ---------------------------->

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



## 출처

- vue3 공식문서 : https://v3-docs.vuejs-korea.org/guide/scaling-up/routing.html

- 상태관리 :  [Store](./store.md)  