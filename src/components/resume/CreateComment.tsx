import Image from 'next/image'

export default function Create() {
  const handleClick = () => {}
  return (
    <div className="flex w-[50rem] h-auto px-7 gap-5 items-start">
      <Image
        src="/profile.png"
        width={50}
        height={50}
        style={{
          width: '45px',
          height: '45px',
          objectFit: 'contain',
          borderRadius: '50%',
        }}
        alt="ProfileIMG"
      />
      <textarea
        className="w-[45rem] h-[2.5rem] pl-3 pt-2 shadow-md rounded-xl font-extralight text-[0.8rem] text-gray focus:outline-primary focus:text-black resize-none over"
        placeholder="댓글을 작성해보세요."
        style={{
          overflow: 'auto',
          scrollbarWidth: 'none',
        }}
      ></textarea>
      <button
        className="flex justify-center items-center w-[2.5rem] h-[2.5rem] shadow-md outline-none rounded-2xl"
        type="button"
        onClick={handleClick}
      >
        <Image
          src="/send.png"
          width={25}
          height={25}
          alt="send"
          style={{
            width: '20px',
            height: '20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      </button>
    </div>
  )
}
