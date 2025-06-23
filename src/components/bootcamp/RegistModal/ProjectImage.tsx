import React from 'react'
import Image from 'next/image'

const ProjectImage = ({ formData, handleFileChange }) => {
  return (
    <div>
      <label className="block text-lg font-medium mb-2">
        프로젝트 대표 이미지
      </label>
      <div className="flex flex-col gap-2 items-center">
        <label htmlFor="image-upload" className="cursor-pointer w-fit">
          <Image
            src={
              formData.imageUrl
                ? URL.createObjectURL(formData.imageUrl)
                : '/images/bootcamp/placeholder.svg'
            }
            alt="이미지 업로드"
            width={500}
            height={500}
          />
        </label>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        {formData.imageUrl && (
          <p className="text-xs text-gray-600 mt-1">
            선택된 파일: {formData.imageUrl.name}
          </p>
        )}
      </div>
    </div>
  )
}

export default ProjectImage
