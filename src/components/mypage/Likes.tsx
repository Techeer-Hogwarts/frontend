import { Session } from '@/app/session/page'
import TapBar from '../common/TapBar'
import SessionPost from '../session/SessionPost'

export default function Likes() {
  return (
    <div className="ml-10">
      <TapBar
        options={['이력서', '부트캠프', '파트너스']}
        placeholder="세션 제목 혹은 이름을 검색해보세요"
      />
      <div className="mt-5 grid grid-cols-2 gap-8">
        {Session.map((session, index) => (
          <SessionPost
            key={index}
            title={session.title}
            date={session.date}
            name={session.name}
          />
        ))}
      </div>
    </div>
  )
}
