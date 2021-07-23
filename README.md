# COMPOSE
KNU 해커톤 2021년 1학기 제출

### 팀원
  - 원인식: 개발 담당
  - 문지호: 기획 및 기타 담당
  

### 시연영상
  - https://youtu.be/GgkQ1ZXoZ3I

### 주제 및 기능
  요새 코로나가 심해지고 있다. 대면 만남도 좋지만 비대면 만남을 해야되는 요즘 세상, 이런 비대면 만남에도 즐겁게 놀 수 있는 방법을 생각하다 한 생각이 떠올랐습니다.
  비대면 만남에도 술게임처럼 여러명이서 즐겁게 할 수 있는 놀이 문화는 없을까?
  여러 레크레이션 게임에서 미션을 주고 점수를 획득하는 것에서 아이디어를 떠올려 
  줌, 페이스톡과 별개로 웹에서 사람들에게 재밌는 미션을 주고 점수를 받고 상품도 나눌 수 있는 게임을 만들어보기로 했습니다.
  
  - 파티방을 만들고 사람을 초대한 뒤 미리 설정한 미션을 랜덤으로 받아 안내하는 기능
  - 회원가입과 간단한 프로필 기능

### 테스트 방법
  - 이 레포지토리에서 프로젝트를 다운받은 뒤 npm install을 통해 모든 모듈을 다운로드 받고 client 폴더에도 가서 똑같은 행동을 해줍니다.
  - 그 다음 본문 폴더에 .env 파일을 만들고 MONGO_URI, PORT, NODE_ENV, JWT_SECRET, AWS_KEY_ID, AWS_PRIVATE_KEY, BUCKET_NAME(S3 버킷), REGION, DEFAULT_IMAGE_URL 환경설정을 해줍니다.
  - client 폴더에서도 .env 파일을 만들고 REACT_APP_BASIC_SERVER_URL 환경설정을 해줍니다.
  - 본문 폴더에서 npm run dev, 클라이언트에서 npm run start 명령어를 통해 실행합니다.

### 기타
  - 시간 분배를 잘못해 프로젝트가 미완성입니다. 
  - 미션 수행 여부는 심판이 맡거나 사람들의 투표로 이루어지며 기본 기능 외에 여러 기능을 추가해 확장을 꾀해볼 수 있습니다.
  
  
