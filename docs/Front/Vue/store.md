---
comments: false
---

# Vue  

Vue 개발 중 개념이 부족했거나 공부한 부분을 정리하는 공간입니다.   
주요 개념과 문법은 간략하게만 다루고 적용 사례나 예시를 담을 계획입니다.    
해당 문서는 Vue3 Composition API 위주로 작성되었습니다.     
Options API 방식이나 자세한 내용은 API 공식 문서를 참고해주세요. 


<!-- - 페이지 이동 :  [예시](./index.md)  -->


2. 로고 이미지 파일은 `docs/public` 디렉토리에 위치해야 합니다. 다음과 같은 구조로 되어있어야 합니다:

```
docs/
├─ public/
│  └─ logo.png
├─ .vitepress/
│  └─ config.mjs
└─ index.md
```



## 출처

- vue3 공식문서 : https://v3-docs.vuejs-korea.org/guide/introduction.html


Pinia 스토어 가이드 문서를 작성해드리겠습니다.

# Pinia 스토어 가이드

## 1. Pinia 소개

Pinia는 Vue.js 애플리케이션을 위한 상태 관리 라이브러리입니다. Vue 3의 Composition API와 완벽하게 호환되며, TypeScript를 기본적으로 지원합니다.

### Vuex와 비교했을 때 Pinia의 장점:

- 더 간단한 API와 보일러플레이트 감소
- TypeScript 지원 개선
- 모듈 시스템 제거 (스토어 자체가 모듈)
- 더 가벼운 패키지 크기
- DevTools 지원 개선
- Hot Module Replacement(HMR) 지원
- Composition API와의 더 나은 통합

## 2. 현재 프로젝트의 Pinia 구조

### 2.1 스토어 구성


```1:16:src/stores/index.js
import { useAuthStore } from "./auth/useAuth.js";
import { useClassStore } from "./main/useClass.js";
import { useChatStore } from "./main/useChat.js";
import { useLayoutStore } from "./main/useLayout.js";
import { useLocalStore } from "./main/useLocal.js";
import { useStatus } from "./util/useStatus.js";


const useStore = () => ({
  auth: useAuthStore(),
  class: useClassStore(),
  chat: useChatStore(),
  layout: useLayoutStore(),
  local : useLocalStore(),
  status : useStatus(),
});
```


우리 프로젝트는 다음과 같이 스토어를 구성했습니다:

- auth: 인증 관련 상태 관리
- class: 수업 관련 상태 관리
- chat: 채팅 관련 상태 관리
- layout: 레이아웃 상태 관리
- local: 로컬 상태 관리
- status: 유틸리티 상태 관리

### 2.2 스토어 예시

#### 인증 스토어 (useAuth)

```8:23:src/stores/auth/useAuth.js
export const useAuthStore = defineStore(
  "userAuth",
  () => {
    const isLoggedIn = ref(false);  // 로그인 상태 체크
    /* 유저 정보 */
    const userInfo = ref({});       
    const deviceInfo = ref({});
    /* 토큰 */
    const accessToken = ref(null);  
    const refreshToken = ref(null); 
    /* 아이디 기억 하기 */ 
    const rememberYn = ref(false);  
    const loginId = ref('');


    // 0131 jhj // 초기화 시 localStorage에서 로그인 상태 복구
```


- 로그인 상태, 사용자 정보, 토큰 관리
- 로컬 스토리지와 연동하여 영속성 유지

#### 채팅 스토어 (useChat)

```6:32:src/stores/main/useChat.js
export const useChatStore = defineStore(
  "useChat",
  () => {
    /* 채팅 관리 */
    const msgList = ref([]);        // 채팅 화면에 쌓이는 모든 문자들
    const newMsgList = ref([]);     // 안읽은 문자들
    const sideTab = ref("info");    // 현재 바라보고 있는 사이드바 탭
    const isNavOpened = ref(true);  // 현재 사이드바가 열려있는지 여부
    const chatMarker = {            // 마지막으로 읽은 곳 표시 마커
      class : 'chat-marker',
      log : true,
      content : '여기까지 읽으셨습니다.',
    }
    // 채팅탭 메세지 추가 로직
    const setMsgList = (param) => {
      // msgList는 화면에 보여줄 리스트기 때문에 전부 push한다.
      msgList.value.push(param); 
      // 안 읽은 메세지 체크 (사이드바가 닫혀있거나 사이드탭이 chat이 아니면 newMsgList에 push한다.)
      if(!isNavOpened.value || sideTab.value !== 'chat'){ 
        // 로그성 채팅을 제외한 채팅들만 담을 것.
        if(!param.log){                       
          newMsgList.value.push(param); 
          //removeChatMarker(); // 남아있는 마커 삭제 
          //msgList.value.push(chatMarker); // 여기까지 읽었다는 마커 추가 
        }
      }
    };
```


- 채팅 메시지 관리
- 읽지 않은 메시지 처리
- 사이드바 상태 관리

## 3. Pinia 사용 사례

### 3.1 상태 관리
```javascript
const store = useStore();
const isLoggedIn = computed(() => store.auth.isLoggedIn);
```

### 3.2 액션 사용

```116:131:src/stores/auth/useAuth.js
    /* 로그아웃 */
    const logout = async (params = null) => {
      try {
        // params가 있을 때만 API 호출
        if (params !== null) {
          await auth._logout(params);
        }
      } catch (e) {
        console.log('logout Error : ', e);
      } finally {
        // 0131 jhj // isLoggedIn.value = false;
        localStorage.clear();
        removeAuth();
        router.push('/login'); 
      }
    };
```


### 3.3 영속성 관리

```6:23:src/stores/main/useLocal.js
export const useLocalStore = defineStore(
  "userLocal",
  () => {
    const chatAllLock = ref(true);    // 채팅 전체 잠금 여부 
    const topCardArr = ref([]); // 핀 체크 리스트
    const actLockList = ref([]); // 화면 잠금/해제

    return { 
      chatAllLock, topCardArr, actLockList,
    };
  },
  {
    // 화면 초기화하더라도 로컬스토리지에 있으니까 값을 가져옴.
    persist: {
      storage: localStorage,
    },
  }
);
```


## 4. 모범 사례

1. 스토어 모듈화
   - 기능별로 스토어 분리
   - 관심사 분리 원칙 준수

2. Composition API 활용
   - `setup` 함수 내에서 스토어 사용
   - `computed` 속성을 통한 반응형 상태 관리

3. TypeScript 활용
   - 타입 안정성 확보
   - 자동 완성 지원

4. 지속성 관리
   - `pinia-plugin-persistedstate` 플러그인 사용
   - 필요한 상태만 선택적으로 저장

## 5. 주의사항

1. 상태 변경은 항상 스토어 내에서 수행
2. 비동기 작업은 액션으로 처리
3. 컴포넌트에서 직접 상태 변경 지양
4. 필요한 상태만 저장소에 보관

## 6. 결론

Pinia는 Vue 3 생태계에서 가장 권장되는 상태 관리 솔루션입니다. Vuex보다 더 현대적이고 유연한 API를 제공하며, TypeScript 지원이 우수합니다. 우리 프로젝트에서도 이러한 장점들을 활용하여 효율적인 상태 관리를 구현했습니다.
