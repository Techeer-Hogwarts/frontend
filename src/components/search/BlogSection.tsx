import Image from 'next/image'
import Section from './Section'

const BlogSection = () => {
  return (
    <Section id="blog" title="블로그">
      <div className="grid grid-cols-4 gap-[3rem]">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="w-[16.125rem]">
            <div className="mb-3">
              <Image
                src="/images/session/thumbnail.png"
                alt="thumbnail"
                width={258}
                height={136}
              />
            </div>
            <h4 className="text-xl font-semibold mb-2">
              프론트엔드 버추얼리제션
            </h4>
            <p className="text-[10px] text-gray mb-2">2024년 여름</p>
            <span className="text-xs text-pink bg-lightprimary py-1 px-2 rounded-md">
              Frontend
            </span>
            <div className="flex items-center mt-2">
              <Image src="/profile.png" alt="profile" width={20} height={20} />
              <span className="font-semibold text-xs ml-1">주영준</span>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

export default BlogSection
