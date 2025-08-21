import React from 'react'

interface ProjectSaveProps {
  mode: 'register' | 'edit'
  onClose: () => void
  onSubmit: () => Promise<void>
}

const ProjectSave: React.FC<ProjectSaveProps> = ({
  mode,
  onClose,
  onSubmit,
}) => {
  return (
    <div className="flex justify-end gap-4 mt-4">
      <button
        onClick={onClose}
        className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
      >
        취소
      </button>
      <button
        onClick={onSubmit}
        className="px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/80"
      >
        {mode === 'edit' ? '수정' : '등록'}
      </button>
    </div>
  )
}

export default ProjectSave
