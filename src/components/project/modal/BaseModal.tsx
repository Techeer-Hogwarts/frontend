type BaseModalProps = {
  text: string
  btn: string
  onClose: () => void
  onClick: () => void
}

export default function BaseModal({ text, btn, onClose, onClick }: BaseModalProps) {
  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 text-center">
      <div className="flex flex-col p-6 w-[20rem] bg-white border rounded-lg shadow-lg">
        {/* 모달 텍스트 */}
        <p className="text-lg font-medium mb-6">{text}</p>

        {/* 버튼 영역 */}
        <div className="flex gap-4 mt-auto pt-4">
          <button
            type="button"
            onClick={onClose}
            className="w-[200px] rounded-md text-sm h-[34px] bg-white text-gray border border-lightgray"
          >
            취소
          </button>
          <button
            type="button"
            className={`w-[200px] rounded-md text-sm h-[34px] text-white bg-primary text-white' 'bg-lightgray `}
            onClick={onClick}
          >
            {btn}
          </button>
        </div>
      </div>
    </div>
  )
}
