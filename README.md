# 날씨앱

## 실행 방법

### 1. 깃허브에서 실행

```bash
npm install
npm run dev
```

.env 파일 생성 후 API 키 설정:

```
VITE_OPENWEATHER_API_KEY=your_key
```

API 키는 https://openweathermap.org 에서 발급

### 2. 배포 링크

- **Vercel**: https://weather-app-assignment-page.vercel.app/

## 구현 기능

### 1. 현재 위치 날씨 조회

- 브라우저 Geolocation API로 현재 위치 좌표 획득
- 좌표 기반으로 OpenWeatherMap API 호출해서 날씨 정보 표시
- 현재 기온, 최고/최저 기온, 체감온도, 습도, 풍속 표시
- 위치 권한 거부 시 안내 메시지 + 재시도 버튼

### 2. 지역 검색

- 제공된 korea_districts.json 파일로 지역 검색
- 시/도, 시/군/구, 읍/면/동 모든 단위 검색 가능
- 검색어 입력하면 매칭되는 지역 목록 드롭다운으로 표시
- 지역 선택하면 상세 페이지로 이동

### 3. 즐겨찾기

- 최대 6개까지 장소 저장 가능
- localStorage에 저장되어 새로고침해도 유지
- 즐겨찾기 카드에 현재 날씨, 최고/최저 기온 표시
- 카드 클릭하면 해당 지역 상세 페이지로 이동
- 별칭 수정 기능 (연필 아이콘 클릭)
- 삭제 기능 (휴지통 아이콘 클릭)

### 4. 시간대별 예보

- 3시간 간격으로 24시간(8개) 예보 표시
- 가로 스크롤로 확인 가능
- 시간, 날씨 아이콘, 기온 표시

### 5. 상세 페이지

- 선택한 지역의 상세 날씨 정보
- 체감온도, 습도, 풍속 추가 표시
- 즐겨찾기 추가/삭제 버튼
- 시간대별 예보

## 기술 스택

- React + TypeScript
- Vite
- TanStack Query - API 상태 관리
- Zustand - 즐겨찾기 상태
- Tailwind CSS

## 폴더 구조 (FSD)

```
src/
├── app/        # 앱 설정, 라우터
├── pages/      # 페이지
├── widgets/    # 조합된 UI
├── features/   # 기능 (검색, 날씨조회)
├── entities/   # 도메인 (위치, 날씨, 즐겨찾기)
└── shared/     # 공용 컴포넌트, 유틸
```

## 기술적 의사결정 및 이유

- **FSD**: 기능별로 파일 나눠서 찾기 쉽고, 나중에 기능 추가할 때도 어디에 넣을지 명확함
- **TanStack Query**: API 응답 캐싱해서 같은 지역 다시 볼 때 로딩 없이 바로 표시됨. 로딩/에러 상태 관리도 간편
- **Zustand**: Redux보다 보일러플레이트 적고, persist 미들웨어로 localStorage 연동 한 줄이면 됨
- **Geocoding API**: 제공된 json에 좌표가 없어서 지역명으로 좌표 조회. 동 단위로 못 찾으면 시/구 단위로 재시도하는 fallback 처리함
