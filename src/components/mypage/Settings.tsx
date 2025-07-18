import Link from 'next/link'
import { FaChevronRight } from 'react-icons/fa6'

export default function Settings() {
  return (
    <div className="flex flex-col w-[890px] items-center justify-start mt-10 px-[128px]">
      <Link href="/changepassword" className="flex w-full py-6 justify-between">
        비밀번호 재설정
        <FaChevronRight className="text-gray" />
      </Link>
      <div className="border-t-[0.5px] w-[640px] border border-lightgray" />
      <Link
        href="/mypage/leave"
        type="button"
        className="flex w-full py-6 justify-between"
      >
        회원 탈퇴
        <FaChevronRight className="text-gray" />
      </Link>
      <div className="border-t-[0.5px] w-[640px] border border-lightgray" />
    </div>
  )
}
