import Image from 'next/image'

interface CardItemProps {
  title: string
  date: string
  category: string
  author: string
  authorImage: string
  thumbnail: string
}

const CardItem: React.FC<CardItemProps> = ({
  title,
  date,
  category,
  author,
  authorImage,
  thumbnail,
}) => {
  const formattedDate = new Date(date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })

  return (
    <div className="w-[16.125rem]">
      <div className="mb-3">
        <Image src={thumbnail} alt="thumbnail" width={258} height={136} />
      </div>
      <h4 className="text-xl font-semibold mb-2">{title}</h4>
      <p className="text-[10px] text-gray mb-2">{formattedDate}</p>
      <span className="text-xs text-pink bg-lightprimary py-1 px-2 rounded-md">
        {category}
      </span>
      <div className="flex items-center mt-2">
        <Image src={authorImage} alt="author" width={20} height={20} />
        <span className="font-semibold text-xs ml-1">{author}</span>
      </div>
    </div>
  )
}

export default CardItem
