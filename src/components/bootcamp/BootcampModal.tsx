import React from 'react'
import Image from 'next/image'
import Git from '@/../public/git.svg'
import Medium from '@/../public/medium.svg'
import Link from '@/../public/link.svg'

const data = {
  id: 1,
  name: 'Next-Page',
  team: 'A',
  year: 10,
  project_explain: '상상을 현실로, 손끝에서 펼쳐지는 우리만의 세계',
  github_url: 'https://github.com/bootcamp/project',
  medium_url: 'https://medium.com/@bootcamp',
  web_url: 'https://bootcamp.com',
  image_url: '/images/bootcamp/bootcampImage.svg',
  isOpen: true,
  rank: 1,
  members: [
    {
      id: 1,
      user_id: 1,
      position: 'BE',
    },
    {
      id: 2,
      user_id: 2,
      position: 'FE',
    },
  ],
}

const BootcampModal = () => {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-black/30">
      <div className="bg-white fixed top-1/2 left-1/2 w-[600px] h-[700px] z-50 -translate-x-1/2 -translate-y-1/2 rounded-xl border-lightgray border-2 flex flex-col items-center p-5 realtive gap-5">
        <header className="relative flex justify-end items-center w-full">
          <div className="absolute left-1/2 -translate-x-1/2 font-bold text-2xl">
            Next Page
          </div>
          <button>x</button>
        </header>
        <div className="border-b border-lightgray w-full"></div>
        <section>
          <Image
            src={data.image_url}
            alt="bootcamp project image"
            width={500}
            height={500}
            className="rounded-xl"
          />
        </section>
        <section className="w-[500px] flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <p className="text-2xl font-bold">소개</p>
            <p className="text-lg">
              상상을 현실로, 손 끝에서 펼쳐지는 우리만의 세계
            </p>
          </div>
          <div>
            <p className="text-2xl font-bold">Team A</p>
            <div className="flex gap-5">
              <p className="font-bold text-xl text-primary w-[50px]">BE</p>
              <p className="text-lg">주영준 권유리 김진희 윤정은 최지혜</p>
            </div>
            <div className="flex gap-5">
              <p className="font-bold text-xl text-primary w-[50px]">FE</p>
              <p className="text-lg">주영준 권유리 김진희 윤정은 최지혜</p>
            </div>
            <div className="flex gap-5">
              <p className="font-bold text-xl text-primary w-[50px]">DEV</p>
              <p className="text-lg">주영준 권유리 김진희 윤정은 최지혜</p>
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
