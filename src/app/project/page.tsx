import Card from '@/components/project/Card'

export default function project() {
  return (
    <div className="max-w-[1200px] w-[1200px] mt-[3.56rem] items-center">
      <div className="flex justify-between mb-[2.84rem] ">
        {/* 왼쪽 텍스트 영역 */}
        <div>
          <div className="text-[2.5rem] font-bold">프로젝트</div>
          <p className="text-[1.25rem]">
            모든 테커인들의 프로젝트와 스터디를 확인해보세요.
          </p>
        </div>

        {/* 오른쪽 버튼 영역 */}
        <div>
          <button className="w-[13.1875rem] h-[3.3125rem] border text-center border-gray-300 rounded-lg justify-center items-center text-[1.125rem] flex items-center hover:shadow-md">
            내 프로젝트 확인하기
            <span className="ml-2">✨</span> {/* 이모지 추가 */}
          </button>
        </div>
      </div>

      <div className="flex gap-[1rem] flex-wrap ">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((el) => (
          <Card key={el} />
        ))}
      </div>
    </div>
  )
}
