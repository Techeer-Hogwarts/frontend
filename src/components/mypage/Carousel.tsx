'use client'

import React, { useState } from 'react'
import Slider from 'react-slick'
import Image from 'next/image'
import { HiMiniChevronLeft, HiMiniChevronRight } from 'react-icons/hi2'
import { FaRegImage } from 'react-icons/fa6'
import Link from 'next/link'

interface Team {
  id: number
  name: string
  resultImages?: string[]
  mainImage?: string
}

interface CarouselProps {
  teams: Team[]
  routePrefix: string
}

// 캐러셀에 사용하는 화살표
function NextArrow(props: any) {
  const { onClick } = props
  return (
    <HiMiniChevronRight
      className="w-10 h-8 absolute right-0 top-[52px] text-black/20 cursor-pointer"
      onClick={onClick}
    />
  )
}

function PrevArrow(props: any) {
  const { onClick } = props
  return (
    <HiMiniChevronLeft
      className="w-10 h-8 absolute left-0 top-[52px] text-black/20 cursor-pointer"
      onClick={onClick}
    />
  )
}

// 이미지 혹은 대체 아이콘을 렌더링하는 컴포넌트
function ImageOrIcon({ src, alt }: { src?: string; alt: string }) {
  const [imgError, setImgError] = useState(false)

  // src가 없거나 빈 문자열, 혹은 onError 발생 시 => 아이콘 표시
  if (!src || imgError) {
    return (
      <div className="w-[64px] h-[64px] flex items-center justify-center bg-lightgray text-gray rounded">
        <FaRegImage size={32} />
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={64}
      height={64}
      className="rounded object-cover w-[64px] h-[64px] "
      unoptimized
      onError={() => setImgError(true)}
    />
  )
}

const Carousel: React.FC<CarouselProps> = ({ teams, routePrefix }) => {
  const settings = {
    dots: false,
    infinite: teams.length > 10,
    speed: 300,
    slidesToShow: 10, // 한 줄에 보일 아이템 개수
    slidesToScroll: 1, // 한 번에 스크롤될 아이템 개수
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  }

  // 10개 이하인 경우에는 일반 리스트 형태로 표시
  if (teams.length <= 10) {
    return (
      <div className="flex relative h-[140px] px-10 w-[890px] gap-[17px] items-center justify-start border border-lightgray rounded-lg">
        {teams.map((team) => (
          <Link
            key={team.id}
            href={`${routePrefix}/${team.id}`}
            className="relative group cursor-pointer"
          >
            <ImageOrIcon src={team.mainImage} alt={team.name} />
            <div className="absolute w-[64px] h-[64px] top-0 bg-black bg-opacity-60 text-white text-xs flex items-center justify-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded">
              {team.name}
            </div>
          </Link>
        ))}
      </div>
    )
  }

  // 10개 초과 시 캐러셀(slick)로 표시
  return (
    // @ts-ignore
    <Slider
      {...settings}
      className="flex relative h-[140px] px-10 w-[890px] gap-3 overflow-x-auto items-center justify-start border border-lightgray rounded-lg"
    >
      {teams.map((team) => (
        <div key={team.id}>
          <Link
            href={`${routePrefix}/${team.id}`}
            className="relative group cursor-pointer"
          >
            <ImageOrIcon src={team.mainImage} alt={team.name} />
            <div className="absolute w-[64px] h-[64px] top-0 bg-black bg-opacity-60 text-white text-xs flex items-center justify-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded">
              {team.name}
            </div>
          </Link>
        </div>
      ))}
    </Slider>
  )
}

export default Carousel
