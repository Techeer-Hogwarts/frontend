import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface CardItemProps {
  id: string
  title: string
  date: string
  category: string
  author: string
  authorImage: string
  thumbnail: string
}

const CardItem: React.FC<CardItemProps> = ({
  id,
  title,
  date,
  category,
  author,
  authorImage,
  thumbnail,
}) => {
  const router = useRouter()

  return (
    <div className="w-[16.125rem]">
      <div className="mb-3">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt="thumbnail"
            width={379}
            height={199}
            onClick={() => {
              router.push(`/session/video/${id}`)
            }}
            className="w-full h-[155px] z-1 object-cover cursor-pointer"
          />
        ) : (
          <button
            onClick={() => {
              router.push(`/session/video/${id}`)
            }}
            className="w-full flex items-center justify-center px-5 h-[155px] truncate text-white bg-gradient-to-b from-[#FF8B20] to-[#FFC14F]"
          >
            {title}
          </button>
        )}
      </div>
      <h4 className="text-xl font-semibold mb-2">{title}</h4>
      <p className="text-[10px] text-gray mb-2">{date}</p>
      {/* <span className="text-xs text-pink bg-lightprimary py-1 px-2 rounded-md">
        {category}
      </span> */}
      <div className="flex items-center mt-2">
        {/* <Image src={authorImage} alt="author" width={20} height={20} /> */}
        <span className="font-semibold text-xs ml-1">{author}</span>
      </div>
    </div>
  )
}

export default CardItem
