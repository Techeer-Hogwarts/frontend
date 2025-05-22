import Image from 'next/image'

export default function Footer() {
  return (
    <div className="text-darkgray h-24 mt-[2rem] p-4">
      <div className="flex items-center justify-between">
        {/* 로고 영역 */}
        <Image
          src="/images/techeerlogo.png"
          alt="techeer"
          width={160}
          height={60}
        />

        {/* 링크 영역 */}
        <div className="flex space-x-8 text-[0.8rem] ">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.instagram.com/techeer_in_sv/?igsh=NG03bjZ6ODdvN3Fi"
            className="hover:text-gray-400 text-[0.8rem] font-logo"
          >
            INSTAGRAM
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://blog.techeer.net/"
            className="hover:text-gray-400 text-[0.8rem] font-logo"
          >
            MEDIUM
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/techeer-sv"
            className="hover:text-gray-400 text-[0.8rem] font-logo"
          >
            GITHUB
          </a>
        </div>
      </div>
    </div>
  )
}
