import Section from './Section'
import CardItem from './CardItem'
import { useState } from 'react'
import BlogCard from './BlogCard'

type BlogProps = {
  id: string
  title: string
  url: string
  date: string
  userID: string
  userName: string
  userProfileImage: string
  thumbnail: string
  stack: string[]
}

const BlogSection: React.FC<{ blog: BlogProps[] }> = ({ blog }) => {
  const [showAll, setShowAll] = useState(false)

  // 처음에는 8개만 보여주고, 더보기 클릭 시 전체 데이터 보여주기
  const visibleBlogs = showAll ? blog : blog.slice(0, 8)

  return (
    <Section id="blog" title="블로그">
      {visibleBlogs.length > 0 ? (
        <div className="grid grid-cols-4 gap-[3rem]">
          {visibleBlogs.map((blog) => (
            // <CardItem
            //   key={item.id}
            //   title={item.title}
            //   date={item.date}
            //   category="" // category 값을 고정하거나 다른 값으로 설정
            //   author={item.userName} // author는 userName으로 설정
            //   authorImage={item.userProfileImage} // authorImage는 userProfileImage로 설정
            //   thumbnail={item.thumbnail}
            // />
            <BlogCard key={blog.id} blog={blog}></BlogCard>
          ))}
        </div>
      ) : (
        <p className="text-center text-darkgray">검색 결과가 없습니다</p>
      )}
      {/* 더보기 버튼 표시 */}
      {!showAll && blog.length > 8 && (
        <div className="flex flex-col items-center mt-10">
          <button
            onClick={() => setShowAll(true)}
            className="px-6 py-2 text-primary text-sm border border-primary rounded-full hover:bg-primary hover:text-white transition-colors"
          >
            더보기 +
          </button>
        </div>
      )}
      <div className="w-[62.5rem] h-[1px] mt-10 bg-lightgray"></div>
    </Section>
  )
}

export default BlogSection
