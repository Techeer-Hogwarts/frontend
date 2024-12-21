export default function page() {
  return (
    <div className="flex flex-col h-[calc(100vh-100px)] justify-center items-center">
      <div className="w-[700px] text-left mb-7">
        <p className="text-2xl mb-5 font-bold">회원탈퇴</p>
        <p className="text-lg text-gray">
          <span className="font-bold">주영준</span>님, TECHEER.ZIP를
          이용해주셔서 감사합니다.
        </p>
        <div className="w-full h-[87px] border mt-2 text-sm border-gray bg-lightgray/50 flex flex-col justify-center px-4 gap-1">
          <p>불편한 사항이 있으시면 언제든 TECHEER.ZIP에게 알려주세요.</p>
          <p>Techeer.zip@gmail.com</p>
        </div>
        <div className="flex justify-end gap-2 mt-16">
          <button
            type="button"
            className="w-[90px] h-10 border rounded-md text-gray border-lightgray"
          >
            돌아가기
          </button>
          <button
            type="button"
            className="w-[90px] h-10 border rounded-md bg-primary text-white border-primary"
          >
            회원탈퇴
          </button>
        </div>
      </div>
    </div>
  )
}
