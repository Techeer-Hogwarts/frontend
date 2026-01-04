import React, { useEffect } from 'react'
import FixIcon from '@/../public/images/Fixicon.svg'
import Trash from '@/../public/images/bootcamp/trash.svg'
import { deleteBootcamp } from '@/api/bootcamp/deleteBootcamp'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'

const ModalHeader = ({ ProjectDetail, setIsEditing, onClose }) => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { user } = useAuthStore()

  const Myteam = ProjectDetail.members?.map((member) => member.userId)

  return (
    <header className="flex justify-between items-start w-full gap-4">
      <div className="flex-1 min-w-0">
        <h2 className="text-2xl font-bold text-darkgray leading-tight break-keep">
            {ProjectDetail.name}
        </h2>
        <p className="text-sm text-gray-500 font-medium mt-1">
            {ProjectDetail.year}기
        </p>
      </div>
      
      <div className="flex flex-row items-center gap-2 flex-shrink-0">
        {Myteam?.includes(user?.id) && (
          <>
            <button
              className="p-2 hover:bg-red-50 rounded-full transition-colors text-red-500"
              title="프로젝트 삭제"
              onClick={async () => {
                try {
                  const confirmed = confirm('정말 삭제하시겠습니까?')
                  if (!confirmed) return

                  await deleteBootcamp(ProjectDetail.id)
                  queryClient.invalidateQueries({ queryKey: ['bootcampList'] })
                  onClose()
                  router.refresh()
                } catch (err) {
                  alert(err.message || '삭제 중 오류 발생')
                }
              }}
            >
              <Trash className="w-5 h-5" />
            </button>
            <button 
                onClick={() => setIsEditing(true)}
                className="p-2 hover:bg-blue-50 rounded-full transition-colors text-blue-500"
                title="프로젝트 수정"
            >
              <FixIcon className="w-5 h-5" />
            </button>
          </>
        )}
        <button 
            onClick={onClose} 
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-black"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </header>
  )
}

export default ModalHeader
