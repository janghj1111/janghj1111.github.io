---
comments: false
---



## Git 필수 명령어



### 기본 명령어
- `git init`: 새로운 Git 저장소 생성
- `git clone <url>`: 원격 저장소 복제
- `git add <파일명>`: 변경사항을 스테이징 영역에 추가
- `git commit -m "메시지"`: 스테이징된 변경사항을 커밋

### 브랜치 관련
- `git branch`: 브랜치 목록 확인
- `git branch <브랜치명>`: 새 브랜치 생성
- `git checkout <브랜치명>`: 브랜치 전환
- `git merge <브랜치명>`: 현재 브랜치에 다른 브랜치를 병합

### 원격 저장소
- `git remote add origin <url>`: 원격 저장소 추가
- `git push origin <브랜치명>`: 원격 저장소에 푸시
- `git pull origin <브랜치명>`: 원격 저장소에서 풀
- `git fetch`: 원격 저장소의 정보 가져오기

### 상태 확인
- `git status`: 현재 저장소 상태 확인
- `git log`: 커밋 히스토리 확인
- `git diff`: 변경사항 확인



## A 브랜치를 B 브랜치에 덮어쓰기

dev 브랜치를 main 브랜치에 덮어쓰고 싶을 떄


### ✅ **Git에서 `dev` 브랜치의 내용을 `main` 브랜치에 덮어쓰는 방법**

**현재 `dev` 브랜치의 코드로 `main` 브랜치를 완전히 덮어쓰려면**, `main` 브랜치에서 `dev`의 변경 사항을 강제로 적용해야 합니다.

---

### **📌 1️⃣ `main` 브랜치로 이동**

```
git checkout main

```

또는 최신 Git에서는 `switch` 사용 가능

```
git switch main

```

---

### **📌 2️⃣ `dev` 브랜치의 최신 상태 가져오기**

먼저 `dev` 브랜치가 최신 상태인지 확인 후, 최신 커밋을 `pull` 합니다.

```
git checkout dev
git pull origin dev

```

---

### **📌 3️⃣ `main` 브랜치에 `dev`의 내용 강제 덮어쓰기**

```
git reset --hard dev

```

이 명령어는 **현재 `main` 브랜치의 모든 내용을 `dev` 브랜치와 동일하게 강제 변경**합니다.

---

### **📌 4️⃣ `main` 브랜치를 원격 저장소에 강제로 업데이트**

```
git push origin main --force

```

- `-force`를 사용하면 원격 `main` 브랜치의 기록을 `dev`와 동일하게 덮어씁니다.
- 기존 `main` 브랜치의 기록이 사라지므로, **이전 기록이 필요하다면 백업(`git branch backup-main`)을 먼저 생성하는 것이 안전합니다.**

---

### **📌 (선택) 기존 `main` 브랜치 백업**

혹시 모를 실수를 대비하여 기존 `main` 브랜치를 백업하는 것이 좋습니다.

```
git branch backup-main main

```

이제 `backup-main` 브랜치에 기존 `main` 상태가 저장되므로, 만약 실수하면 되돌릴 수 있습니다.

---

### **🚀 최종 정리**

1. `main` 브랜치로 이동 → `git checkout main`
2. `dev`의 최신 상태 확인 → `git checkout dev && git pull origin dev`
3. `main`을 `dev`로 덮어쓰기 → `git reset --hard dev`
4. 원격 `main`에 강제 푸시 → `git push origin main --force`
5. (선택) 기존 `main` 백업 → `git branch backup-main main`

✅ 이제 `dev` 브랜치의 코드가 완전히 `main` 브랜치에 덮어씌워집니다! 🚀
