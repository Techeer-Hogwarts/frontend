import React from 'react'
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

  const leader = ProjectDetail.members?.find((member) => member.isLeader)

  return (
    <header className="relative flex justify-between items-center w-full">
      <div className="flex flex-row gap-3"></div>
      <div className="absolute left-1/2 -translate-x-1/2 max-w-[70%] truncate text-center font-bold text-2xl">
        {ProjectDetail.name}
      </div>
      <div className="flex flex-row gap-3">
        {user?.id === leader?.userId && (
          <>
            <button
              className="flex items-center justify-center"
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
              <Trash />
            </button>
            <button onClick={() => setIsEditing(true)}>
              <FixIcon />
            </button>
          </>
        )}
        <button onClick={onClose} className="text-2xl">
          ×
        </button>
      </div>
    </header>
  )
}

export default ModalHeader
