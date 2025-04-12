import Section from './Section'
import CardItem from './CardItem'
import { useState } from 'react'
import { Session } from '@/types/search'

type SessionProps = {
  session: Session[]
}

const SessionSection: React.FC<SessionProps> = ({ session }) => {
  const [showAll, setShowAll] = useState(false)

  // 처음에는 8개만 보여주고, 더보기 클릭 시 전체 데이터 보여주기
  const visibleSessions = showAll ? session : session.slice(0, 8)

  return (
    <Section id="session" title="세션">
      {visibleSessions.length > 0 ? (
        <div className="grid grid-cols-4 gap-[3rem]">
          {visibleSessions.map((item) => (
            <CardItem
              key={item.id}
              title={item.title}
              date={item.date}
              category="" // category 값을 고정하거나 다른 값으로 설정
              author={item.presenter} // author는 userName으로 설정
              authorImage={item.thumbnail} // authorImage는 userProfileImage로 설정
              thumbnail={item.thumbnail}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-darkgray">검색 결과가 없습니다</p>
      )}
      {/* 더보기 버튼 표시 */}
      {!showAll && session.length > 8 && (
        <div className="flex flex-col items-center mt-10">
          <button
            onClick={() => setShowAll(true)}
            className="px-6 py-2 text-primary text-sm border border-primary rounded-full hover:bg-primary hover:text-white transition-colors"
          >
            더보기 +
          </button>
        </div>
      )}
      <div className="w-[77rem] h-[1px] mt-10 bg-lightgray"></div>
    </Section>
  )
}

export default SessionSection
