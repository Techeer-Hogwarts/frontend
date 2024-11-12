import Image from 'next/image'

interface Comment {
  comments: Array<{ id: number; name: string; date: string; comment: string }>
}

export default function Comments({ comments }: Comment) {
  return (
    <div className="flex flex-col px-5 gap-5 mt-[10rem]">
      <span className="mr-3">
        댓글<span className="text-primary">{comments.length}</span>
      </span>
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="flex w-[47.5rem] h-auto py-3 border-2 border-transparent rounded-xl shadow-md gap-3"
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
            <span
              className="font-light text-[0.8rem]"
              style={{
                overflow: 'auto',
                scrollbarWidth: 'none',
              }}
            >
              {comment.comment}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
