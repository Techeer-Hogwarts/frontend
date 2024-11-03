import Section from './Section'
import CardItem from './CardItem'

const SessionSection = () => {
  return (
    <Section id="session" title="세션">
      <div className="grid grid-cols-4 gap-[3rem]">
        {[...Array(8)].map((_, index) => (
          <CardItem
            key={index}
            title="백엔드 기초"
            date="2024년 가을"
            category="Backend"
            author="주영준"
            authorImage="/profile.png"
            thumbnail="/images/session/thumbnail.png"
          />
        ))}
      </div>
    </Section>
  )
}

export default SessionSection
