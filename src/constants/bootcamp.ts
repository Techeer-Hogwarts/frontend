//임시 데이터와 상수 모음

export const BootCampTapOptions = [
  //Tap 옵션
  '전체보기',
  '역대 수상작',
  '10기',
  '9기',
  '8기',
  '7기',
  '6기',
  '5기',
  '4기',
  '3기',
  '2기',
  '1기',
]

export const allBootcampProject = [
  //임시 데이터
  {
    id: 1,
    year: 1,
    imageUrl: '/images/bootcamp/bootcampImage.svg',
    rank: 1,
  },
  {
    id: 2,
    year: 2,
    imageUrl: '/images/bootcamp/bootcampImage.svg',
    rank: 2,
  },
  {
    id: 3,
    year: 2,
    imageUrl: '/images/bootcamp/bootcampImage.svg',
    rank: 3,
  },
  {
    id: 4,
    year: 4,
    imageUrl: '/images/bootcamp/bootcampImage.svg',
    rank: 3,
  },
  {
    id: 5,
    year: 3,
    imageUrl: '/images/bootcamp/bootcampImage.svg',
    rank: 0,
  },
  {
    id: 6,
    year: 5,
    imageUrl: '/images/bootcamp/bootcampImage.svg',
    rank: 0,
  },
  {
    id: 7,
    year: 6,
    imageUrl: '/images/bootcamp/bootcampImage.svg',
    rank: 0,
  },
  {
    id: 8,
    year: 8,
    imageUrl: '/images/bootcamp/bootcampImage.svg',
    rank: 0,
  },
  {
    id: 9,
    year: 7,
    imageUrl: '/images/bootcamp/bootcampImage.svg',
    rank: 0,
  },
  {
    id: 10,
    year: 10,
    imageUrl: '/images/bootcamp/bootcampImage.svg',
    rank: 0,
  },
  {
    id: 11,
    year: 8,
    imageUrl: '/images/bootcamp/bootcampImage.svg',
    rank: 0,
  },
  {
    id: 12,
    year: 8,
    imageUrl: '/images/bootcamp/bootcampImage.svg',
    rank: 0,
  },
]

export const bootcampProjectDetail = {
  id: 1,
  name: 'Next-Page',
  team: 'A',
  year: 10,
  projectExplain: '상상을 현실로, 손끝에서 펼쳐지는 우리만의 세계',
  githubUrl: 'https://github.com/bootcamp/project',
  mediumUrl: 'https://medium.com/@bootcamp',
  webUrl: 'https://bootcamp.com',
  imageUrl: '/images/bootcamp/bootcampImage.svg',
  isOpen: true,
  rank: 1,
  members: [
    { userId: 1, position: 'BACKEND', name: '주영준', isLeader: false },
    { userId: 2, position: 'BACKEND', name: '권유리', isLeader: false },
    { userId: 3, position: 'BACKEND', name: '김진희', isLeader: false },
    { userId: 4, position: 'BACKEND', name: '윤정은', isLeader: false },
    { userId: 5, position: 'BACKEND', name: '최지혜', isLeader: false },
    { userId: 6, position: 'FRONTEND', name: '주영준', isLeader: false },
    { userId: 7, position: 'FRONTEND', name: '권유리', isLeader: false },
    { userId: 8, position: 'FRONTEND', name: '김진희', isLeader: false },
    { userId: 9, position: 'FRONTEND', name: '윤정은', isLeader: false },
    { userId: 10, position: 'FRONTEND', name: '최지혜', isLeader: false },
    { userId: 11, position: 'DEV', name: '주영준', isLeader: false },
    { userId: 12, position: 'DEV', name: '권유리', isLeader: false },
    { userId: 13, position: 'DEV', name: '김진희', isLeader: false },
    { userId: 14, position: 'DEV', name: '윤정은', isLeader: true },
    { userId: 15, position: 'DEV', name: '최지혜', isLeader: false },
  ],
}
