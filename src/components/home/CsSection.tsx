'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTodayCsQuery } from '@/api/home/queries'

interface CSProps {
  question?: string
  link: string
}

export default function CsSection({ question, link }: CSProps) {
  const { data: csProblem, isLoading: loading, error } = useTodayCsQuery()

  const displayQuestion =
    csProblem?.content || question || 'CS 문제를 불러오는 중입니다...'

  return (
    <section className="w-full mt-16 mb-24">
      <div className="relative border border-primary rounded-xl max-w-[1200px] w-full mx-auto px-6 py-5">
        <div className="absolute -top-3 left-4 bg-white px-2 flex items-center">
          <Image
            src="/images/home/Pencil.svg"
            alt="CS 아이콘"
            width={20}
            height={20}
          />
          <h2 className="text-xl text-black ml-2">금주의 CS</h2>
          <div className="flex-1 h-[1px] bg-primary ml-2" />
        </div>

        <div className="flex justify-between items-center gap-4 flex-wrap">
          <div className="text-base text-black leading-relaxed break-words flex-1 min-w-[200px]">
            {loading ? (
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ) : error ? (
              <span className="text-gray-500">• {displayQuestion}</span>
            ) : (
              <span>• {displayQuestion}</span>
            )}
          </div>

          <Link
            href={link}
            className="text-white bg-primary px-4 py-2 rounded-md text-sm hover:opacity-90 whitespace-nowrap mt-1"
          >
            CS 풀기
          </Link>
        </div>
      </div>
    </section>
  )
}
