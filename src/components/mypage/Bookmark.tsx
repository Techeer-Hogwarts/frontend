import TapBar from '../common/TapBar'
import SessionPost from '../session/SessionPost'

export default function Bookmark() {
  return (
    <div className="ml-10">
      <TapBar
        options={['이력서', '부트캠프', '파트너스']}
        placeholder="세션 제목 혹은 이름을 검색해보세요"
        width="w-[855px]"
      />
      <div className="mt-5 grid grid-cols-2 gap-8">
        <SessionPost />
        <SessionPost />
        <SessionPost />
      </div>
    </div>
  )
}