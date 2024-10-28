import Image from 'next/image'

export default function Comments() {
  // 댓글 데이터 배열
  const comments = [
    {
      id: 1,
      name: '김미영',
      date: '2024.10.02',
      comment:
        '해당 사례에서는 PM 직무에서 발휘할 만한 역량이 보이지가 않습니다. PM 중요 직무 역량 중 질문에 쓰일만한 사례를 추리고 그 역량을 분명히 드러내야 합니다.',
    },
    {
      id: 2,
      name: '박철수',
      date: '2024.10.03',
      comment:
        '이 프로젝트는 협업과 커뮤니케이션에서 강점이 있었던 것 같습니다. 하지만 기술적으로 좀 더 개선할 부분이 있습니다.',
    },
  ]

  return (
    <div className="flex flex-col px-5 gap-5 mt-[10rem]">
      <span className="mr-3">
        댓글<span className="text-primary">{comments.length}</span>
      </span>
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="flex w-[47.5rem] h-[5rem] border-2 border-transparent rounded-xl shadow-md gap-3"
        >
          <Image
            src="/pro.png"
            width={50}
            height={50}
            style={{
              width: '55px',
              height: '55px',
              marginTop: '11px',
              marginLeft: '5px',
              objectFit: 'contain',
              borderRadius: '50%',
            }}
            alt="ProfileIMG"
          />
          <div className="flex flex-col px-3 mt-1">
            <div className="flex justify-between w-[41.25rem]">
              <span className="font-semibold text-[1.125rem]">
                {comment.name}
              </span>
              <span className="font-extralight text-[0.8rem] text-gray">
                {comment.date}
              </span>
            </div>
            <span className="font-light text-[0.8rem]">{comment.comment}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
