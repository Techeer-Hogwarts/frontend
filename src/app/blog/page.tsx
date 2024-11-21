import TapBar from '@/components/common/TapBar'
import AddBtn from '@/components/common/AddBtn'
import BlogPost from '@/components/blog/BlogPost'

let blog = [
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

export default function page() {
  return (
    <div className="flex justify-center h-auto min-h-screen">
      <div className="flex flex-col">
        <div className="w-[1200px] text-left mt-14 mb-7">
          <p className="text-4xl mb-5 font-bold">블로그</p>
          <p className="text-xl">테커인들의 블로그를 확인해보세요.</p>
        </div>
        <TapBar
          options={[
            '전체보기',
            'Frontend',
            'Bakcend',
            'DevOps',
            'Coding Test',
            'Others',
          ]}
          placeholder="블로그 제목 혹은 이름을 검색해보세요"
        />
        <div className="grid grid-cols-3 gap-8 mt-8">
          {blog.map((blog, index) => (
            <BlogPost
              key={index}
              title={blog.title}
              date={blog.date}
              name={blog.name}
            />
          ))}
        </div>
      </div>
      <AddBtn />
    </div>
  )
}
