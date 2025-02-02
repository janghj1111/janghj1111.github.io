


### 개인 프로젝트를 GitHub Pages에 배포하는 과정 

#### 1. GitHub 저장소 설정
- GitHub에 새 저장소를 생성하되 SEO 최적화를 위해서는 `{username}.github.io` 형식으로 저장소 이름을 지정하는 것이 좋다.
( 예: jang.github.io )
<br> 이렇게 하면 도메인이 `https://jang.github.io`로 설정됨.

- Settings > Pages 에서 배포 소스를 GitHub Actions로 설정.
- Settings > Actions > General에서 
Workflow permissions를 "Read and write permissions"로 설정


```bash
git init
git add --all
git commit -m "first commit"
git branch -M main
git remote add origin {깃허브 저장소 주소}
git push -u origin main
```

후에 Actions 탭에서 배포 확인 가능. <br>
배포가 완료가 된다면 `https://jang.github.io`에서 확인 가능함.


#### 2. 배포 스크립트 설정

깃에 변경점이 생길 때 마다 배포를 진행시킬 워크 플로우가 필요하다. <br>
`.github/workflows/deploy.yml` 파일을 생성한다. 

- `.github` 디렉토리는 프로젝트의 루트 디렉토리에 위치해야 한다.

```
프로젝트루트/
├─ docs/
│  ├─ .vitepress/
│  │  └─ config.mjs
│  └─ index.md
├─ .github/        👈 여기에 위치해야 함
│  └─ workflows/
│     └─ deploy.yml
└─ package.json
```

1. `.github` 디렉토리는 Git 저장소의 특별한 디렉토리로, GitHub의 기능들을 설정하는 공간임.
2. GitHub Actions는 저장소 루트의 `.github/workflows` 경로에서 워크플로우 파일을 찾음.
3. `docs` 디렉토리는 VitePress의 콘텐츠만을 위한 공간이며, GitHub 설정과는 분리되어야 한다.


<!-- 
### SEO 설정 
`docs/.vitepress/config.mjs`에 base와 SEO 관련 설정을 추가합니다:

```javascript:docs/.vitepress/config.mjs
export default defineConfig({
  title: "Today Jang Learn",
  description: "배우거나 이뤘던 것들을 기록합니다",
  
  // GitHub Pages 배포를 위한 base 설정
  base: '/',  // username.github.io 형식이면 '/'
              // 다른 저장소명이면 '/저장소명/'
  
  // SEO 최적화 설정
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }],
    // Open Graph
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Today Jang Learn' }],
    ['meta', { property: 'og:description', content: '배우거나 이뤘던 것들을 기록합니다' }],
    ['meta', { property: 'og:image', content: 'https://janghyun00.github.io/og-image.jpg' }],
    // Twitter Card
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'Today Jang Learn' }],
    ['meta', { name: 'twitter:description', content: '배우거나 이뤘던 것들을 기록합니다' }]
  ],

  // 기존 설정 유지
  themeConfig: {
    // ... 기존 설정들
  }
})
```


### SEO 추가 최적화
1. 각 마크다운 파일에 frontmatter로 메타 정보 추가:
```markdown
---
title: 페이지 제목
description: 페이지 설명
head:
  - - meta
    - name: keywords
      content: keyword1, keyword2
---
```

2. sitemap.xml 생성을 위해 VitePress 플러그인 설치:
```bash
npm install vitepress-plugin-sitemap -D
```

3. config.mjs에 sitemap 설정 추가:
```javascript
import { defineConfig } from 'vitepress'
import { generateSitemap } from 'vitepress-plugin-sitemap'

export default defineConfig({
  // ... 기존 설정
  buildEnd: generateSitemap({
    hostname: 'https://janghyun00.github.io/'
  })
})
```

이렇게 설정하면 GitHub Pages에 자동으로 배포되며 SEO도 최적화됩니다. 저장소 이름을 username.github.io로 설정하면 더 깔끔한 URL을 얻을 수 있지만, 필수는 아닙니다.
-->


### git ignore 적용 후 캐시 삭제제

이미 커밋된 파일들을 캐시에서 제거하고 `.gitignore`를 적용하기 위한 명령어

```bash
# 캐시 삭제
git rm -r --cached .

# 다시 파일 추가 (.gitignore 규칙 적용됨)
git add .

# 커밋
git commit -m "chore: Apply .gitignore"

# 원격 저장소에 push
git push
```



일반적인 작업 흐름:
1. 로컬에서 개발할 때 `npm run docs:dev` 실행
2. 변경사항을 커밋하고 GitHub에 push
3. GitHub Actions가 자동으로 빌드(`docs:build`)하고 배포
4. `https://jang.github.io`에서 배포된 사이트 확인



참고 블로그 : https://velog.io/@kang-bit/VitePress-Github-Pages%EB%A1%9C-%EB%B8%94%EB%A1%9C%EA%B7%B8-%EB%A7%8C%EB%93%A4%EA%B8%B0-%EB%B0%B0%ED%8F%AC
