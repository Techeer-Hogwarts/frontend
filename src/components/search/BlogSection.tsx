import Section from './Section'
import CardItem from './CardItem'

const BlogSection = () => {
  return (
    <Section id="blog" title="블로그">
      <div className="grid grid-cols-4 gap-[3rem]">
        {[...Array(8)].map((_, index) => (
          <CardItem
            key={index}
            title="프론트엔드 시각화"
            date="2024년 여름"
            category="Frontend"
            author="미영"
            authorImage="/profile.png"
            thumbnail="/images/session/thumbnail.png"
          />
        ))}
      </div>
    </Section>
  )
}

export default BlogSection
