'use client'

import Image from 'next/image'
import CategoryBtn from './CategoryBtn'
import { ChangeEvent, useState } from 'react'
import SessionDropdown from './SessionDropdown'
import SessionFileUpload from './SessionFileUpload'
import ModalInputField from '../common/ModalInputField'

interface ModalProps {
  position: string
  modal: string
  onClose: () => void
}
type SelectedFilesState = {
  file1: File | null
  file2: File | null
}
export default function AddSessionModal({
  position,
  modal,
  onClose,
}: ModalProps) {
  const [formData, setFormData] = useState({
    userId: 1, // 추후 삭제 예정
    thumbnail: 'https://medium.com',
    title: '',
    presenter: '',
    date: '',
    position: '',
    category: position,
    videoUrl: '',
    fileUrl: '',
  })
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [image, setImage] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedFiles, setSelectedFiles] = useState<SelectedFilesState>({
    file1: null,
    file2: null,
  })
  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>,
    fileKey: string,
  ) => {
    const file = event.target.files?.[0] || null
    setSelectedFiles((prev) => ({
      ...prev,
      [fileKey]: file,
    }))
  }
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    console.log(value)
  }
  const handlePositionChange = (category: string) => {
    setSelectedCategory(category)
    setFormData({
      ...formData,
      position: category,
    })
  }
  const handleDropdownChange = (value: string) => {
    setFormData({
      ...formData,
      date: value,
    })
  }
  // const postSession = async () => {
  //   try {
  //     const payload = {
  //       userId: formData.userId,
  //       thumbnail: formData.thumbnail,
  //       title: formData.title,
  //       presenter: formData.presenter,
  //       date: formData.date,
  //       position: formData.position,
  //       category: formData.category,
  //       videoUrl: selectedFiles.file1,
  //       fileUrl: selectedFiles.file2,
  //     }

  //     const response = await fetch(
  //       'https://api.techeerzip.cloud/api/v1/sessions',
  //       {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(payload),
  //       },
  //     )
  //     if (!response.ok) {
  //       throw new Error('세션 데이터를 업로드하는 데 실패했습니다.')
  //     }
  //     const result = await response.json()
  //     console.log('세션이 성공적으로 추가되었습니다:', result)
  //     onClose() // 성공적으로 추가되면 모달 닫기
  //   } catch (err) {
  //     console.error('세션 데이터 업로드 중 오류 발생:', err)
  //   }
  // }
  const postSession = async () => {
    try {
      const formDataToSend = new FormData()
      formDataToSend.append('userId', formData.userId.toString())
      formDataToSend.append('thumbnail', formData.thumbnail)
      formDataToSend.append('title', formData.title)
      formDataToSend.append('presenter', formData.presenter)
      formDataToSend.append('date', formData.date)
      formDataToSend.append('position', formData.position)
      formDataToSend.append('category', formData.category)

      // 파일 추가
      if (selectedFiles.file1) {
        formDataToSend.append('videoUrl', selectedFiles.file1) // File 객체 그대로 전송
      }
      if (selectedFiles.file2) {
        formDataToSend.append('fileUrl', selectedFiles.file2) // File 객체 그대로 전송
      }

      const response = await fetch(
        'https://api.techeerzip.cloud/api/v1/sessions',
        {
          method: 'POST',
          body: formDataToSend,
        },
      )

      if (!response.ok) {
        throw new Error('세션 데이터를 업로드하는 데 실패했습니다.')
      }

      // 서버에서 URL을 반환한다고 가정
      const result = await response.json()

      // 서버 응답에 포함된 videoUrl과 fileUrl을 formData에 업데이트
      setFormData({
        ...formData,
        videoUrl: result.videoUrl, // 서버에서 반환된 videoUrl
        fileUrl: result.fileUrl, // 서버에서 반환된 fileUrl
      })

      console.log('세션이 성공적으로 추가되었습니다:', result)
      onClose() // 모달 닫기
    } catch (err) {
      console.error('세션 데이터 업로드 중 오류 발생:', err)
    }
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black/50 fixed inset-0">
      <div className="w-[486px] min-h-[740px] h-auto flex flex-col items-center bg-white rounded-lg">
        <div>
          <p className="text-2xl text-center mt-9 mb-3 font-semibold">
            세션 영상 등록
          </p>
          {pdfUrl ? (
            <div>
              <embed
                src={pdfUrl}
                type="application/pdf"
                width="220px"
                height="150px"
                className="border rounded-md overflow-hidden"
              />
            </div>
          ) : (
            <Image
              src="/thumbnail.png"
              alt="thumbnail"
              width={220}
              height={150}
            />
          )}
          {/* <div className="mt-4">
            {image && (
              <Image
                src={image}
                alt="PDF First Page Preview"
                className="w-full h-auto"
                width={220}
                height={150}
              />
            )}
          </div> */}
        </div>
        <div className="flex flex-col relative mx-8 mt-8">
          <ModalInputField
            title="세션 제목을 입력해주세요"
            placeholder="세션 제목"
            name="title"
            value={formData.title}
            handleInputChange={handleInputChange}
          />
          <ModalInputField
            title="발표자를 입력해주세요"
            placeholder="발표자"
            name="presenter"
            value={formData.presenter}
            handleInputChange={handleInputChange}
          />
          <div className="flex justify-between mt-1 mb-3 items-start">
            <span>
              기간을 입력해주세요 <span className="text-primary">*</span>
            </span>
            {modal === '1' && (
              <SessionDropdown
                titles={[
                  '1기',
                  '2기',
                  '3기',
                  '4기',
                  '5기',
                  '6기',
                  '7기',
                  '8기',
                ]}
                options={[
                  'FIRST',
                  'SECOND',
                  'THIRD',
                  'FOURTH',
                  'FIFTH',
                  'SIXTH',
                  'SEVENTH',
                  'EIGHTH',
                ]}
                onSelect={handleDropdownChange}
              />
            )}
            {modal === '2' && (
              <SessionDropdown
                titles={[
                  '2022년 여름',
                  '2022년 겨울',
                  '2023년 여름',
                  '2023년 겨울',
                  '2024년 여름',
                ]}
                options={[
                  'SUMMER_2022',
                  'WINTER_2022',
                  'SUMMER_2023',
                  'WINTER_2023',
                  'SUMMER_2024',
                ]}
                onSelect={handleDropdownChange}
              />
            )}
          </div>

          <p>
            카테고리를 선택해주세요 <span className="text-primary">*</span>
          </p>
          <div className="flex gap-3 mt-1 mb-3">
            <CategoryBtn
              title="Frontend"
              isSelected={selectedCategory === 'FRONTEND'}
              onSelect={() => handlePositionChange('FRONTEND')}
            />
            <CategoryBtn
              title="Backend"
              isSelected={selectedCategory === 'BACKEND'}
              onSelect={() => handlePositionChange('BACKEND')}
            />
            <CategoryBtn
              title="DevOps"
              isSelected={selectedCategory === 'DEVOPS'}
              onSelect={() => handlePositionChange('DEVOPS')}
            />
            <CategoryBtn
              title="Others"
              isSelected={selectedCategory === 'OTHERS'}
              onSelect={() => handlePositionChange('OTHERS')}
            />
          </div>
          <SessionFileUpload
            fileKey="file1"
            selectedFile={selectedFiles.file1}
            handleFileChange={handleFileChange}
            label="영상을 첨부해 주세요"
          />
          {/* <input
            type="file"
            accept="application/pdf"
            onChange={handlePdfChange}
            className="mb-4"
          /> */}
          <SessionFileUpload
            fileKey="file2"
            selectedFile={selectedFiles.file2}
            handleFileChange={handleFileChange}
            label="발표 자료를 첨부해주세요"
          />
        </div>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={onClose}
            className="w-[200px] rounded-md text-sm h-[34px] bg-white text-gray border border-lightgray"
          >
            취소
          </button>
          <button
            type="button"
            onClick={postSession}
            className="w-[200px] rounded-md text-sm h-[34px] bg-primary text-white"
          >
            등록
          </button>
        </div>
      </div>
    </div>
  )
}
