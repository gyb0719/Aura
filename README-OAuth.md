# OAuth 연동 가이드

## 실제 프로덕션 환경에서 OAuth 연동하기

### 1. Google OAuth 설정

1. **Google Cloud Console**에서 프로젝트 생성
2. **OAuth 2.0 클라이언트 ID** 생성:
   - 애플리케이션 유형: 웹 애플리케이션
   - 승인된 JavaScript 원본: `http://localhost:3000`, `https://yourdomain.com`
   - 승인된 리디렉션 URI: `http://localhost:3000/api/auth/callback/google`

3. **.env.local** 업데이트:
```bash
GOOGLE_CLIENT_ID=your_actual_google_client_id
GOOGLE_CLIENT_SECRET=your_actual_google_client_secret
```

### 2. 카카오 OAuth 설정

1. **Kakao Developers**에서 앱 생성
2. **카카오 로그인** 활성화
3. **Redirect URI** 설정: `http://localhost:3000/api/auth/callback/kakao`

```bash
npm install @next-auth/kakao-provider
```

**app/api/auth/[...nextauth]/route.ts**에 추가:
```typescript
import KakaoProvider from '@next-auth/kakao-provider'

// providers 배열에 추가
KakaoProvider({
  clientId: process.env.KAKAO_CLIENT_ID!,
  clientSecret: process.env.KAKAO_CLIENT_SECRET!,
})
```

### 3. 현재 데모 상태
- 포트폴리오 목적으로 OAuth 버튼들은 알림만 표시
- 실제 연동을 위해서는 위 설정 필요
- 현재 이메일/비밀번호 로그인은 데모 버전으로 작동

### 4. 실제 구현 시 고려사항
- 사용자 프로필 정보 매핑
- 이메일 중복 처리
- 세션 관리
- 보안 설정 (CSRF, JWT 등)