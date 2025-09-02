export const demoUsers = [
  {
    id: '1',
    user: {
      id: '1',
      name: '김서연',
      membershipTier: 'PREMIUM',
      verified: true
    },
    bio: '안녕하세요! 여행과 요리를 좋아하는 28세 마케터입니다. 진솔한 관계를 찾고 있어요 ✨',
    age: 28,
    gender: 'FEMALE',
    location: '서울 강남구',
    occupation: '마케팅 매니저',
    education: '연세대학교',
    height: 165,
    interests: ['여행', '요리', '영화감상', '카페투어', '독서'],
    lookingFor: ['RELATIONSHIP', 'MARRIAGE'],
    photos: [{ url: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=400' }],
    compatibility: 94
  },
  {
    id: '2',
    user: {
      id: '2',
      name: '박지민',
      membershipTier: 'PLATINUM',
      verified: true
    },
    bio: '운동과 건강한 라이프스타일을 추구합니다. 함께 성장할 수 있는 파트너를 만나고 싶어요!',
    age: 30,
    gender: 'MALE',
    location: '서울 서초구',
    occupation: '소프트웨어 엔지니어',
    education: '서울대학교',
    height: 175,
    interests: ['헬스', '등산', '독서', '음악감상', '게임'],
    lookingFor: ['RELATIONSHIP', 'MARRIAGE'],
    photos: [{ url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400' }],
    compatibility: 87
  },
  {
    id: '3',
    user: {
      id: '3',
      name: '이하늘',
      membershipTier: 'DIAMOND',
      verified: true
    },
    bio: '예술과 문화를 사랑하는 크리에이티브 디렉터입니다. 감성적이고 깊이 있는 대화를 나누고 싶어요.',
    age: 26,
    gender: 'FEMALE',
    location: '서울 홍대',
    occupation: '크리에이티브 디렉터',
    education: '홍익대학교',
    height: 162,
    interests: ['미술', '전시회', '음악', '사진', '글쓰기'],
    lookingFor: ['DATING', 'RELATIONSHIP'],
    photos: [{ url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400' }],
    compatibility: 91
  },
  {
    id: '4',
    user: {
      id: '4',
      name: '최민호',
      membershipTier: 'PREMIUM',
      verified: true
    },
    bio: '스타트업을 운영하고 있습니다. 도전적이고 열정적인 삶을 함께할 동반자를 찾고 있어요.',
    age: 32,
    gender: 'MALE',
    location: '서울 강남구',
    occupation: 'CEO',
    education: 'KAIST',
    height: 180,
    interests: ['창업', '투자', '골프', '와인', '독서'],
    lookingFor: ['RELATIONSHIP', 'MARRIAGE'],
    photos: [{ url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400' }],
    compatibility: 89
  },
  {
    id: '5',
    user: {
      id: '5',
      name: '정수아',
      membershipTier: 'PLATINUM',
      verified: true
    },
    bio: '의사로 일하고 있어요. 따뜻하고 배려심 깊은 분과 만나고 싶습니다. 함께 건강한 관계를 만들어가요!',
    age: 29,
    gender: 'FEMALE',
    location: '서울 서대문구',
    occupation: '의사',
    education: '서울대학교 의과대학',
    height: 168,
    interests: ['의료봉사', '클래식음악', '요가', '독서', '여행'],
    lookingFor: ['RELATIONSHIP', 'MARRIAGE'],
    photos: [{ url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400' }],
    compatibility: 92
  }
]

export const demoMatches = [
  {
    id: 'm1',
    user: {
      id: '6',
      name: '김예린',
      age: 27,
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400'
    },
    compatibility: 95,
    matchedAt: '2시간 전',
    lastMessage: {
      content: '안녕하세요! 프로필 보고 연락드렸어요 😊',
      timestamp: '1시간 전'
    }
  },
  {
    id: 'm2', 
    user: {
      id: '7',
      name: '박준혁',
      age: 31,
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'
    },
    compatibility: 88,
    matchedAt: '어제',
    lastMessage: {
      content: '오늘 날씨가 정말 좋네요! 산책하기 좋은 것 같아요',
      timestamp: '6시간 전'
    }
  },
  {
    id: 'm3',
    user: {
      id: '8', 
      name: '최은지',
      age: 25,
      photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400'
    },
    compatibility: 91,
    matchedAt: '3일 전',
    lastMessage: {
      content: '같은 취미를 가지고 계시는군요! 언제 시간 되실 때 커피 한잔 어떠세요?',
      timestamp: '1일 전'
    }
  }
]

export const demoStats = {
  newMatches: 12,
  profileViews: 248,
  messages: 34,
  likeScore: 4.8,
  weeklyStats: {
    matchRate: 87,
    responseRate: 92,
    activityGrade: 'A+'
  }
}

export const demoMessages = [
  {
    id: '1',
    senderId: '6',
    content: '안녕하세요! 프로필 보고 연락드렸어요 😊',
    timestamp: new Date(Date.now() - 3600000), // 1시간 전
    read: true
  },
  {
    id: '2', 
    senderId: 'me',
    content: '안녕하세요! 반가워요 ^^',
    timestamp: new Date(Date.now() - 3000000), // 50분 전
    read: true
  },
  {
    id: '3',
    senderId: '6', 
    content: '취미가 비슷해서 더 관심이 가네요. 여행 자주 다니시나요?',
    timestamp: new Date(Date.now() - 2400000), // 40분 전
    read: true
  },
  {
    id: '4',
    senderId: 'me',
    content: '네! 한 달에 한 번 정도는 여행을 다니려고 해요. 어디 추천해주실 곳 있나요?',
    timestamp: new Date(Date.now() - 1800000), // 30분 전  
    read: true
  },
  {
    id: '5',
    senderId: '6',
    content: '제주도 한라산 등반 어떠세요? 요즘 날씨도 좋고 경치가 정말 예뻐요!',
    timestamp: new Date(Date.now() - 900000), // 15분 전
    read: false
  }
]