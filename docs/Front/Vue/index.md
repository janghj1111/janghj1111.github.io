
# Vue  

Vue 개발 중 개념이 부족했거나 공부한 부분을 정리하는 공간입니다.   
주요 개념과 문법은 간략하게만 다루고 적용 사례나 예시를 담을 계획입니다.    
해당 문서는 Vue3 Composition API 위주로 작성되었습니다.     
Options API 방식이나 자세한 내용은 API 공식 문서를 참고해주세요. 


## 프로젝트 생성 
<br>
필수 설치사항을 install하고 진행합니다.

::: info 필수 설치
- Node.js
:::


<!-- 
::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
::: -->


Vite를 통해 vue 프로젝트를 생성 하겠습니다.      


```bash
npm init vue@latest
```

생성과 동시에 아래 사항들을 추가로 설정해줍니다.      

> - router 생성
> - pinia store 생성 
> - ESLint 사용
> - Prettier 사용


설정 후 프로젝트 폴더로 이동 후 `npm install` 을 진행합니다.        
프로젝트에 node_modules 폴더가 생성되고, 필요한 JavaScript library들이 설치됩니다.

## 디렉터리 구조


### 1. 루트 디렉터리
- `public/`: 정적 파일들이 위치
- `src/`: 메인 소스 코드 디렉터리
- `node_modules` : npm install 과정에서 생성. package-lock.json의 모듈들이 설치되고
    package.json에 종속된 자바스크립트 라이브러리들이 있음.
- `package.json` : 프로젝트에 대한 정보. 프로젝트의 이름, 버전, private 여부, 배포 및 개발에서 사용할 모듈 정보, 실행 명령어, 지원할 브라우저에 대한 설정 등을 포함
    - dependencies: 배포 환경에서 사용되는 모듈
    - devDependencies: 개발 환경에서 사용되는 모듈
- `package-lock.json` : package.json의 모듈들이 동작하기 위해 필요로 하는 모듈들의 정보
    - package.json의 모듈들이 동작하기 위해 필요로 하는 모듈들의 정보
    - npm install 과정에서 npm이 package.json의 내용을 확인하고 package-lock.json 파일을 생성한다.
    - package.json이 수정되면 package-lock.json도 수정된다.
- `vite.config.js`: Vite 설정 파일. 프로젝트 설정 정보를 포함






### 2. src 디렉터리 구조

주요 사용될 디렉터리에 대해 설명하겠습니다.

```
src/
├── assets/
├── components/
├── modules/
├── router/
├── stores/
└── views/
```



1. **assets/**: 
   - SCSS 스타일시트와 이미지 등 정적 리소스 관리
   - 모듈화된 SCSS 구조 사용

2. **components/**: 
   - 재사용 가능한 Vue 컴포넌트들
   - layout/ : 레이아웃 관련 컴포넌트
   - popup/, toast/ 등 UI 컴포넌트

3. **modules/**: 
   - api/: API 통신 관련 모듈
   - plugin/: Vue 플러그인
   - utils/: 유틸리티 함수들

4. **router/**: 
   - Vue Router 설정 파일들
   - 각 섹션별 라우트 분리

5. **stores/**: 
   - Pinia 상태관리 스토어
   - 기능별로 분리된 스토어 모듈들

6. **views/**: 
   - 페이지 단위의 Vue 컴포넌트들
   - 섹션별로 구분된 뷰 컴포넌트






## 출처

- vue3 공식문서 : https://v3-docs.vuejs-korea.org/guide/introduction.html

- vue.js 프로젝트 생성하기 :    
 https://velog.io/@wooryung/Vue-3-Vite를-이용하여-Vue.js-프로젝트-생성하기