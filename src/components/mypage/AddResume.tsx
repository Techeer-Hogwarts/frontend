'use client'

import React, { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Select from '../signup/Select'
import InputField from '../common/InputField'

interface AddResumeProps {
  readonly setModal: (value: boolean) => void
  fetchData: () => void
}

export default function AddResume({ setModal, fetchData }: AddResumeProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [fileName, setFileName] = useState<string>('')
  const [addError, setAddError] = useState<string>('')
  const router = useRouter()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFileName(file.name)
    }
  }

  const [formData, setFormData] = useState({
    resumeTitle: '',
    // 이력서 추가 정보
    resumeFile: null as File | null,
    resumeCategory: 'RESUME',
    resumeIsMain: true,
    resumePosition: '',
  })

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAddResume = async () => {
    const requestPayload = {
      createResumeRequest: {
        category: formData.resumeCategory,
        position: formData.resumePosition,
        title: formData.resumeTitle,
        isMain: formData.resumeIsMain,
      },
    }

    try {
      const formDataToSend = new FormData()
      if (formData.resumeFile) {
        formDataToSend.append('file', formData.resumeFile)
      }

      // JSON.stringify() 대신 일반 데이터를 추가
      formDataToSend.append('category', formData.resumeCategory)
      formDataToSend.append('position', formData.resumePosition)
      formDataToSend.append('title', formData.resumeTitle)
      formDataToSend.append('isMain', formData.resumeIsMain.toString())

      formDataToSend.append(
        'createUserWithResumeRequest',
        JSON.stringify(requestPayload),
      )

      const response = await fetch('/api/v1/resumes', {
        method: 'POST',
        body: formDataToSend,
        credentials: 'include',
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)

        if (response.status === 400) {
          setAddError('존재하지 않는 카테고리입니다.')
          return
        }

        // if (response.status === 500) {
        //   setAddError('이미 등록된 이메일입니다.')
        //   return
        // }

        if (response.status === 401) {
          setAddError(errorData.message)
          return
        }
      }

      // router.push('/mypage')
      fetchData()
      setModal(false)
    } catch (err: any) {
      setAddError('네트워크 오류가 발생했습니다.')
    }
  }

  const formRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={formRef}
      className="w-screen h-screen flex items-center justify-center bg-black/50 fixed inset-0"
    >
      <div className="w-[486px] h-[500px] flex flex-col items-center bg-white rounded-lg">
        <div>
          <p className="text-2xl text-center mt-7 mb-1 font-semibold">
            이력서 추가
          </p>
          <Image src="/folder.png" alt="folder" width={100} height={100} />
        </div>
        <div className="relative mx-5 mt-4">
          <InputField
            label="이력서 제목"
            name="resumeTitle"
            placeholder="ex) 홍길동_이력서"
            required={true}
            value={formData.resumeTitle}
            onChange={handleChange}
          />
          <div>
            <label className="block text-lg mb-2.5">
              이력서 파일 <span className="text-primary">*</span>
            </label>
            <input
              type="file"
              name="resumeFile"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const file = e.target.files?.[0] ?? null
                setFormData((prev) => ({
                  ...prev,
                  resumeFile: file,
                }))
              }}
              className="w-full"
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                name="resumeIsMain"
                checked={formData.resumeIsMain}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    resumeIsMain: e.target.checked,
                  }))
                }
                className="w-4 h-4 mr-2 border border-gray rounded"
              />
              <label className="text-sm text-gray mt-1">
                메인 이력서로 사용
              </label>
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-lg mb-2.5">
                이력서 카테고리 <span className="text-primary">*</span>
              </label>
              <Select
                title="카테고리"
                options={['RESUME', 'PORTFOLIO', 'ICT', 'OTHER']}
                value={formData.resumeCategory}
                onChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    resumeCategory: value,
                  }))
                }
              />
            </div>
            <div className="w-1/2">
              <label className="block text-lg mb-2.5">
                이력서 포지션 <span className="text-primary">*</span>
              </label>
              <Select
                title="포지션"
                options={[
                  'FRONTEND',
                  'BACKEND',
                  'DEVOPS',
                  'FULL_STACK',
                  'DATA_ENGINEER',
                ]}
                value={formData.resumePosition}
                onChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    resumePosition: value,
                  }))
                }
              />
            </div>
          </div>
        </div>
        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            onClick={() => {
              setModal(false)
            }}
            className="w-[200px] rounded-md text-sm h-[34px] bg-white text-gray border border-lightgray "
          >
            취소
          </button>
          <button
            type="submit"
            className="w-[200px] rounded-md text-sm h-[34px] bg-primary text-white"
            onClick={handleAddResume}
          >
            등록
          </button>
        </div>
      </div>
    </div>
  )
}
