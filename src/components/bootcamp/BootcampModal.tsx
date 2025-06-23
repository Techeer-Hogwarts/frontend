import React, { useState } from 'react'
import Image from 'next/image'
import Git from '@/../public/git.svg'
import Medium from '@/../public/medium.svg'
import Link from '@/../public/link.svg'
import FixIcon from '@/../public/images/Fixicon.svg'
import RegistModal from './RegistModal'
import { bootcampProjectDetail } from '@/constants/bootcamp'

interface BootcampModalProps {
  id: number
  onClose: () => void
}

const BootcampModal = ({ id, onClose }: BootcampModalProps) => {
  const [isEditing, setIsEditing] = useState(false)
  console.log('BootcampModal project ID:', id)

  if (isEditing) {
    return (
      <RegistModal
        mode="edit"
        onClose={() => setIsEditing(false)}
        initialData={bootcampProjectDetail}
      />
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-black/30">
      <div className="bg-white fixed top-1/2 left-1/2 w-[600px] h-[700px] z-50 -translate-x-1/2 -translate-y-1/2 rounded-xl border-lightgray border-2 flex flex-col items-center p-5 realtive gap-5">
        <header className="relative flex justify-end items-center w-full">
          <div className="absolute left-1/2 -translate-x-1/2 font-bold text-2xl">
            {bootcampProjectDetail.name}
          </div>
          <div className="flex flex-row gap-3">
            <button onClick={() => setIsEditing(true)}>
              <FixIcon />
            </button>
            <button onClick={onClose} className="text-2xl">
              ×
            </button>
          </div>
        </header>
        <div className="border-b border-lightgray w-full"></div>
        <section>
          <Image
            src={bootcampProjectDetail.image_url}
            alt="bootcamp project image"
            width={500}
            height={500}
            className="rounded-xl"
          />
        </section>
        <section className="w-[500px] flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <p className="text-2xl font-bold">소개</p>
            <p className="text-lg">{bootcampProjectDetail.project_explain}</p>
          </div>
          <div>
            <p className="text-2xl font-bold">
              Team {bootcampProjectDetail.team}
            </p>
            <div className="flex gap-5">
              <p className="font-bold text-xl text-primary w-[50px]">BE</p>
              <p className="text-lg">
                {bootcampProjectDetail.members
                  .filter((member) => member.position === 'BACKEND')
                  .map((member) => member.name)
                  .join(' ')}
              </p>
            </div>
            <div className="flex gap-5">
              <p className="font-bold text-xl text-primary w-[50px]">FE</p>
              <p className="text-lg">
                {bootcampProjectDetail.members
                  .filter((member) => member.position === 'FRONTEND')
                  .map((member) => member.name)
                  .join(' ')}
              </p>
            </div>
            <div className="flex gap-5">
              <p className="font-bold text-xl text-primary w-[50px]">DEV</p>
              <p className="text-lg">
                {bootcampProjectDetail.members
                  .filter((member) => member.position === 'DEV')
                  .map((member) => member.name)
                  .join(' ')}
              </p>
            </div>
          </div>

          <div className="flex flex-row gap-5 w-[500px] mt-5">
            <button>
              <Git />
            </button>
            <button>
              <Medium />
            </button>
            <button>
              <Link />
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default BootcampModal
