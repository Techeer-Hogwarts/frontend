import Section from './Section'
import CardItem from './CardItem'

const sessionItems = [
  {
    id: '1',
    title: '백엔드 기초',
    date: '2024년 가을',
    category: 'Backend',
    author: '주영준',
    authorImage: '/profile.png',
    thumbnail: '/images/session/thumbnail.png',
  },
  {
    id: '2',
    title: '데이터베이스 설계',
    date: '2024년 여름',
    category: 'Database',
    author: '김미영',
    authorImage: '/profile.png',
    thumbnail: '/images/session/thumbnail.png',
  },
  {
    id: '3',
    title: 'DevOps 기초',
    date: '2024년 겨울',
    category: 'DevOps',
    author: '박명수',
    authorImage: '/profile.png',
    thumbnail: '/images/session/thumbnail.png',
  },
  // 더 많은 항목을 추가할 수 있습니다.
]

const SessionSection = () => {
  return (
    <Section id="session" title="세션">
      <div className="grid grid-cols-4 gap-[3rem]">
        {sessionItems.map((item) => (
          <CardItem key={item.id} {...item} />
        ))}
      </div>
    </Section>
  )
}

export default SessionSection
