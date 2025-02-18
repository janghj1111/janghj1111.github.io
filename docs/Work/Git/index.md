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



## dev 브랜치를 main 브랜치에 적용하기

### ✅ **`dev` 브랜치에서 개발한 내용을 `main` 브랜치에 적용하는 방법**
보통 **개발(`dev`) 브랜치에서 작업한 내용을 `main` 브랜치에 반영하려면** 두 가지 방법을 사용합니다.

1. **`merge`** → `dev`의 변경 사항을 `main`에 합치기 (기본 방식)  
2. **`rebase`** → `main` 브랜치의 최신 변경 사항을 `dev`에 적용 후, `main`에 반영 (히스토리 정리)

---

## **🔥 1. `merge` 방식 (가장 일반적인 방법)**
> **`dev`에서 개발 후, `main` 브랜치로 병합하는 기본적인 방법**

### **📌 `dev`를 `main`에 병합하는 방법**
```sh
# 1️⃣ main 브랜치로 이동
git checkout main  # 또는 git switch main

# 2️⃣ 최신 상태로 업데이트
git pull origin main

# 3️⃣ dev 브랜치를 main에 병합 (merge)
git merge dev

# 4️⃣ 병합된 내용 푸시
git push origin main
```

### **✅ `merge` 방식의 특징**
- 기존 `dev` 브랜치의 **모든 커밋이 유지됨** (히스토리가 남음)
- `main` 브랜치에 새로운 **병합(commit) 기록**이 생성됨
- **`main`과 `dev`의 커밋 로그가 유지되므로 추적이 쉬움**

---

## **🔥 2. `rebase` 방식 (히스토리를 깔끔하게 유지)**
> `rebase`는 `dev`의 커밋을 `main` 브랜치의 최신 커밋 위로 정리하는 방식

### **📌 `dev`를 `main` 위로 재정렬하는 방법**
```sh
# 1️⃣ main 브랜치로 이동
git checkout main  # 또는 git switch main

# 2️⃣ 최신 상태로 업데이트
git pull origin main

# 3️⃣ dev 브랜치로 이동
git checkout dev  # 또는 git switch dev

# 4️⃣ main 브랜치의 변경 사항을 dev에 적용 (rebase)
git rebase main

# 5️⃣ dev 브랜치를 다시 main에 병합 (Fast-forward 방식)
git checkout main
git merge dev

# 6️⃣ 깔끔한 히스토리로 push
git push origin main
```

### **✅ `rebase` 방식의 특징**
- `main` 브랜치가 항상 **깨끗한 선형 히스토리**를 유지함
- `merge` 방식보다 **히스토리가 간결**해짐
- **주의:** `dev` 브랜치에 이미 Push한 커밋을 `rebase` 하면 충돌이 발생할 가능성이 있음

---

## **🚀 3. `Pull Request (PR)` 또는 `Merge Request (MR)` 방식 (협업 시 추천)**
> **팀 협업 시 가장 많이 사용하는 방법**  
GitHub, GitLab, Bitbucket 등의 플랫폼을 사용하면 `dev`에서 `main`으로 병합하는 **Pull Request (PR)** 또는 **Merge Request (MR)** 를 활용할 수 있습니다.

### **📌 PR/MR 진행 순서**
1. **`dev` 브랜치에서 작업을 완료하고 Push**
```sh
git checkout dev
git add .
git commit -m "feat: 새로운 기능 추가"
git push origin dev
```
2. GitHub/GitLab에서 `dev` → `main` 브랜치로 **Pull Request (PR) 생성**
3. 팀원 리뷰 후 **"Merge" 버튼 클릭**
4. `dev` 브랜치가 `main`에 반영됨

### **✅ PR/MR 방식의 특징**
- **코드 리뷰가 가능**하여 안정적인 배포가 가능
- 협업에 적합하고, GitHub/GitLab에서 자동 테스트 및 코드 품질 검사를 수행 가능
- `dev` 브랜치에서 계속 새로운 기능 개발이 가능

---

## **🚀 최종 정리 (어떤 방법을 선택해야 할까?)**
| 방법 | 특징 | 추천 상황 |
|------|------|------|
| **`merge`** | 기존 커밋 기록 유지, 충돌 발생 가능 | 가장 일반적인 방식, 협업 가능 |
| **`rebase`** | 히스토리 깔끔함, 충돌 가능성 있음 | 개인 프로젝트, 깔끔한 커밋 로그 유지 필요 시 |
| **PR/MR** | 코드 리뷰 가능, 협업 최적화 | 팀 협업 시 필수 |

**💡 결론:**  
✅ **개인 프로젝트** → `rebase` 사용하여 히스토리 정리 후 병합  
✅ **팀 협업** → `Pull Request (PR)` 또는 `Merge Request (MR)` 활용  
✅ **빠르게 병합이 필요하면** → `merge` 사용

🚀 **대부분의 협업 프로젝트에서는 "PR/MR → merge" 방식이 가장 많이 사용됩니다!**



**추가 이슈**

git merge dev를 하려니까 아래같은 에러 발생
fatal: refusing to merge unrelated histories

이럴때는 아래 명령어 실행


이 에러는 두 Git 저장소의 히스토리가 서로 관련이 없을 때 발생합니다. 주로 다음과 같은 상황에서 발생합니다:
- 새로운 저장소를 생성하고 원격 저장소와 연결할 때
- 두 개의 다른 프로젝트를 병합하려고 할 때

해결하기 위해서는 `--allow-unrelated-histories` 옵션을 사용하면 됩니다:

```bash
git merge dev --allow-unrelated-histories
```

하지만 주의하실 점:
1. 이 명령어를 실행하기 전에 현재 작업 내용을 백업해두시는 것이 좋습니다
2. 병합 후에 충돌이 발생할 수 있으므로, 충돌 해결 준비를 하시는 것이 좋습니다
3. 이는 일반적인 상황에서는 권장되지 않는 방법이므로, 정말 필요한 경우에만 사용하시기 바랍니다

만약 이것이 새로운 프로젝트라면, 아래와 같은 대안도 고려해보세요:
1. 저장소를 새로 클론하기
2. 원격 저장소를 다시 설정하기
3. git pull을 먼저 실행한 후 작업 시작하기




