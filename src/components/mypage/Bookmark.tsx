import TapBar from '../common/TapBar'
import SessionPost from '../session/SessionPost'

export default function Bookmark() {
  const Session = [
    {
      title: '왜 웹소켓을 사용하는가',
      name: '주영준',
      date: '2024년 9월',
    },
    {
      title: '왜 웹소켓을 사용하는가',
      name: '우아한',
      date: '2019년 11월',
    },
    {
      title: '흑백요리사 심사위원으로 출현한 소감, 흑백요리사 시즌2에 대하여',
      name: '백종원',
      date: '2032년 1월',
    },
    {
      title: '왜 웹소켓을 사용하는가',
      name: '우아한',
      date: '2019년 11월',
    },
  ]
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
