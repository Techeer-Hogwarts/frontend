// app/resume/layout.tsx
'use client'
// import { useSearchParams } from 'next/navigation'
import { ReactNode } from 'react'

export default function ResumeLayout({
  children,
  modal, // 병렬 경로를 위한 필드
}: {
  children: ReactNode
  modal: ReactNode
}) {
  // const searchParams = useSearchParams() // URL의 쿼리 파라미터 가져오기
  // const isModalOpen = searchParams.get('modal') === 'true' // modal 파라미터 확인

  return (
    <div>
      {/* 메인 페이지 */}
      {children}

      {/* 모달이 병렬로 렌더링될 영역 */}
      {/* {isModalOpen && (
        <div className="modal-area fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          {modal}
        </div>
      )} */}
    </div>
  )
}
