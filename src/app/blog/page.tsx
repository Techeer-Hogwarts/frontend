import BlogPost from '@/components/blog/BlogPost'
import AddBtn from '@/components/common/AddBtn'
import TapBar from '@/components/common/TapBar'

export default function page() {
  return (
    <div className="flex justify-center h-screen">
      <div className="flex flex-col">
        <div className="w-[1200px] text-left mt-14 mb-[2.84rem]">
          <p className="text-[2.5rem] font-bold">블로그</p>
          <p className="text-[1.25rem]">테커인들의 블로그를 확인해보세요.</p>
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
          <BlogPost />
          <BlogPost />
          <BlogPost />
        </div>
      </div>
      <AddBtn />
    </div>
  )
}
