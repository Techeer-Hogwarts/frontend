import Section from './Section'
import CardItem from './CardItem'

const items = [
  {
    id: '1',
    title: '프론트엔드 시각화',
    date: '2024년 여름',
    category: 'Frontend',
    author: '미영',
    authorImage: '/profile.png',
    thumbnail: '/images/session/thumbnail.png',
  },
  {
    id: '2',
    title: '백엔드 아키텍처',
    date: '2024년 가을',
    category: 'Backend',
    author: '철수',
    authorImage: '/profile.png',
    thumbnail: '/images/session/thumbnail.png',
  },
]

const BlogSection = () => {
  return (
    <Section id="blog" title="블로그">
      <div className="grid grid-cols-4 gap-[3rem]">
        {items.map((item) => (
          <CardItem key={item.id} {...item} />
        ))}
      </div>
    </Section>
  )
}

export default BlogSection
