# car-price-v0

중고차 판매가 예측을 위한 Next.js 프런트엔드와 FastAPI 백엔드가 함께 들어 있는 프로젝트입니다.

## 구조

```text
app/                 Next.js 앱 라우터
components/screens/  화면 단위 프런트엔드 컴포넌트
backend/             FastAPI API, 전처리 코드, 학습된 모델 파일
public/              아이콘 등 정적 자산
```

## 실행 방법

### 1. 프런트엔드

```bash
npm install
copy .env.example .env.local
npm run dev
```

기본 API 주소는 `http://127.0.0.1:8000` 입니다.

### 2. 백엔드

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r backend/requirements.txt
copy backend\.env.example backend\.env
npm run backend:dev
```

`OPENAI_API_KEY`는 선택 사항입니다. 값이 없으면 가격 설명은 기본 문구로 반환됩니다.

## 주요 파일

- `app/page.tsx`: 프런트엔드 전체 플로우를 관리합니다.
- `components/screens/`: 환영, 입력, 요약, 결과 화면을 분리해 둔 UI 컴포넌트입니다.
- `backend/main.py`: 예측 API와 가격 설명 생성 로직이 들어 있습니다.
- `backend/preprocess.py`: 입력값을 모델 피처 형태로 변환합니다.
- `backend/models/`: 예측에 필요한 학습 결과물입니다.

## 비고

- 저장소에는 실행에 필요한 모델 파일만 남기고, 생성 산출물과 사용하지 않는 v0 보일러플레이트는 제거했습니다.
- 현재 패키지 매니저는 `npm` 기준으로 정리되어 있습니다.
