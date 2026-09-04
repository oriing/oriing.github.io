# Jeongsik Park Portfolio

한국어와 영어를 지원하는 정적 포트폴리오입니다.

## 페이지

- `#/`: 다섯 장의 슬라이드형 섹션으로 구성된 메인. 스크롤 위치는 보정하지 않으며 브라우저 기본 스크롤을 사용합니다.
- `#/profile`: 프로필 사진, 학위·경력 타임라인, 기술 기반
- `#/archive`: 한국어·영어 검색, 형식·상태·랜덤 순서 태그 필터
- `#/work/[slug]`: 기록별 상세 페이지, 관련 링크, 사진 0~2장
- `#/contact`: 공개 연락 채널

상단의 `KO / EN` 버튼으로 언어를 바꿉니다. 선택한 언어는 브라우저에 저장됩니다.

## 데이터 수정

화면 콘텐츠는 모두 [`data`](data) 폴더의 JSON으로 관리합니다.
* 내용 추가·수정: `data/*.json`
* 태그 이름: `data/tags.json`
* 형식·상태: `lib/portfolio-data.ts`
* 필터: `components/archive-explorer.tsx`

| 파일 | 내용 |
|---|---|
| 이름, 소개, 좌우명, 연락처, 대표 작업 | `data/main.json`                       |
| 학력·경력 타임라인              | `data/timeline.json`                   |
| 기술·연구·교육 역량             | `data/skills.json`                     |
| 선별한 주요 연구·프로젝트       | `data/works.json`                      |
| 연구·프로젝트                   | `data/notion-research-projects.json`   |
| 활동·운영·봉사                | `data/notion-activities.json`          |
| 교육이수·자격증                | `data/notion-learning.json`            |
| 대회·수상·미디어               | `data/notion-competitions-awards.json` |
| 태그의 한영 표시명              | `data/tags.json`                       |


한국어·영어 문구는 항상 다음 형식을 사용합니다.

```json
{ "ko": "한국어 문구", "en": "English copy" }
```

### 새 기록 추가

`data/works.json` 또는 성격에 맞는 `data/notion-*.json` 배열에 아래 형식의 항목을 추가하면 아카이브 카드와 상세 페이지가 함께 생성됩니다. 카드 순서는 `sortDate`의 최신순입니다. 노션 이관 파일은 선별 전 원본 목록이므로 필요 없는 항목을 JSON 객체 단위로 삭제하면 됩니다.

```json
{
  "slug": "unique-english-slug",
  "sortDate": "20XX-0X-0X",
  "kind": "research",
  "status": "completed",
  "period": "2026 — Present",
  "title": { "ko": "작업 제목", "en": "Work title" },
  "summary": { "ko": "카드 요약", "en": "Card summary" },
  "featured": false,
  "tags": ["security", "python"],
  "links": [
    { "label": { "ko": "논문", "en": "Paper" }, "href": "https://example.com/paper" },
    { "label": { "ko": "GitHub", "en": "GitHub" }, "href": "https://github.com/user/repository" }
  ],
  "images": [
    {
      "src": "./images/works/example-01.jpg",
      "alt": { "ko": "사진 대체 설명", "en": "Image alt text" },
      "caption": { "ko": "선택 캡션", "en": "Optional caption" }
    }
  ],
  "detail": {
    "context": { "ko": "시작한 문제", "en": "Problem context" },
    "role": { "ko": "담당한 일", "en": "My role" },
    "approach": [{ "ko": "진행 단계", "en": "Approach step" }],
    "outcomes": [{ "ko": "남긴 결과", "en": "Output" }],
    "takeaways": [{ "ko": "배운 점", "en": "Takeaway" }]
  }
}
```

- `kind`: `research`, `project`, `teaching`, `leadership`, `experience`, `competition`, `award`, `certificate`, `media`, `volunteer`
- `status`: `ongoing`, `completed`, `presented`, `published`
- `links`, `images`, `detail`은 선택 사항입니다.
- `images`는 앞의 두 장까지만 표시됩니다. 파일은 `public/images/works`에 넣으세요.
- 새 태그 ID를 만들면 `data/tags.json`에도 한국어·영어 이름을 한 번 추가해야 합니다.
- 메인 대표 기록은 `data/main.json`의 `featuredSlugs`에 slug를 넣어 지정합니다.

프로필 사진은 `public/images/profile.webp`를 교체하면 됩니다.
