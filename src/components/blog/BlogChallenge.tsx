'use client'

import Tooltip from './Tip'
import Image from 'next/image'
import BlogPost from './BlogPost'
import toast from 'react-hot-toast'
import Dropdown from '../common/Dropdown'
import EmptyLottie from '../common/EmptyLottie'
import ParticipantProgressList from './ParticipantProgressList'
import { useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import {
  getBlogChallengeBlogsAPI,
  getBlogChallengeSummaryAPI,
  getBlogChallengeTermsAPI,
  postBlogChallengeAPI,
  getBlogChallengeAttendanceAPI,
} from '@/api/blog/blog'
import { useGetLikesAPI } from '@/api/likes/likes'
import { useInView } from 'react-intersection-observer'
import { BlogChallengeProps } from '@/types/blog/BlogProps'
import { useBlogChallengeState } from '@/hooks/blog/useBlogChallengeState'
import { useQuery } from '@tanstack/react-query'
import { useAuthStore } from '@/store/authStore'

const sortOptions = ['최신순', '조회순', '가나다순']

export function BlogChallenge() {
  const queryClient = useQueryClient()
  const { user } = useAuthStore()
  const {
    terms,
    setTerms,
    yearOptions,
    setYearOptions,
    timeOptions,
    setTimeOptions,
    selectedYear,
    setSelectedYear,
    selectedTime,
    setSelectedTime,
    selectedSort,
    setSelectedSort,
    selectedTermId,
    setSelectedTermId,
  } = useBlogChallengeState()

  const [blogs, setBlogs] = useState<BlogChallengeProps[]>([])
  const [nextCursor, setNextCursor] = useState(null)
  const [hasNext, setHasNext] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const { data: likeDate } = useGetLikesAPI('BLOG', 0, 50)
  const [ref, inView] = useInView({ threshold: 0.5 })

  // 현재 사용자의 참여 현황 조회
  const { data: userProgressList = [] } = useQuery({
    queryKey: ['attendance', selectedTermId],
    queryFn: () => getBlogChallengeAttendanceAPI(selectedTermId),
  })

  // 현재 사용자가 이미 참여 중인지 확인
  const isAlreadyParticipating = userProgressList.some(
    (userProgress) => userProgress.userId === user?.id,
  )

  // 현재 챌린지 기간인지 확인
  const isCurrentChallengePeriod = () => {
    const now = new Date()
    const month = now.getMonth() + 1
    const currentYear = now.getFullYear()

    let year: number = currentYear
    let firstHalf: boolean

    if (month >= 3 && month <= 8) {
      firstHalf = true
    } else if (month >= 9 && month <= 12) {
      firstHalf = false
    } else if (month >= 1 && month <= 2) {
      year = currentYear - 1
      firstHalf = false
    } else {
      year = currentYear
      firstHalf = false
    }

    // 선택된 기간이 현재 챌린지 기간과 일치하는지 확인
    if (selectedYear.length === 0) return true // 기간이 선택되지 않은 경우 (전체 보기)

    const selectedYearValue = parseInt(selectedYear[0])
    const selectedTimeValue = timeOptions.find((option) =>
      selectedTime.includes(option),
    )

    // 선택된 기간이 현재 챌린지 기간과 일치하는지 확인
    return (
      selectedYearValue === year &&
      ((firstHalf && selectedTimeValue === '상반기') ||
        (!firstHalf && selectedTimeValue === '하반기'))
    )
  }

  const resetBlogs = () => {
    setBlogs([])
    setNextCursor(null)
    setHasNext(true)
  }

  const dropdownHandlers = {
    year: (selectedNames) => {
      setSelectedYear(selectedNames)
      if (selectedNames.length === 0) {
        // 기간이 선택되지 않으면 selectedTermId를 null로 설정
        setSelectedTermId(null)
      } else {
        const selected = selectedNames[0]
        const foundTerm = terms.find((t) => t.termName === selected)
        if (foundTerm) setSelectedTermId(foundTerm.termId)
      }
    },
    time: (selectedNames) => setSelectedTime(selectedNames),
    sort: (selectedNames) => setSelectedSort(selectedNames),
  }

  const handleApplyClick = async () => {
    const result = await postBlogChallengeAPI()
    if (result.success) {
      toast.success(result.message)
      // 지원하기 완료 후 attendance 쿼리 무효화하여 참여 현황 업데이트
      queryClient.invalidateQueries({ queryKey: ['attendance'] })
    } else {
      toast.error(result.message)
    }
  }

  const handleDropdownSelect = (type, selectedNames) => {
    dropdownHandlers[type]?.(selectedNames)
    resetBlogs()
  }

  const getSortValue = (sortBy) => {
    return sortBy === '조회순'
      ? 'viewCount'
      : sortBy === '가나다순'
        ? 'name'
        : 'latest'
  }

  const fetchBlogs = async (cursor, sortBy = '최신순') => {
    if (isLoading || !hasNext) return

    setIsLoading(true)

    try {
      const sortByValue = getSortValue(sortBy)
      let roundId

      if (selectedTime.length > 0) {
        const index = timeOptions.findIndex((name) => name === selectedTime[0])
        roundId = index !== -1 ? index + 1 : undefined
      }

      const res = await getBlogChallengeBlogsAPI(
        sortByValue,
        12,
        cursor,
        selectedTermId,
        roundId,
      )

      setBlogs((prev) => {
        const existingIds = new Set(prev.map((b) => b.blogId))
        const newItems = (res.data || []).filter(
          (b) => !existingIds.has(b.blogId),
        )
        return [...prev, ...newItems]
      })
      setNextCursor(res.nextCursor)
      setHasNext(!!res.nextCursor && res.hasNext)
    } catch (err) {
      console.error('블로그 불러오기 실패:', err)
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getBlogChallengeTermsAPI().then((data) => {
      setTerms(data)
      setYearOptions(data.map((term) => term.termName))
    })
  }, [])

  useEffect(() => {
    if (selectedTermId !== null) {
      getBlogChallengeSummaryAPI(selectedTermId).then((data) => {
        setTimeOptions(data.rounds.map((round) => round.name))
        setSelectedTime([])
      })
    }
  }, [selectedTermId])

  useEffect(() => {
    resetBlogs()
    fetchBlogs(undefined, selectedSort[0])
  }, [selectedSort, selectedTermId, selectedTime])

  useEffect(() => {
    if (inView && hasNext && !isLoading) {
      fetchBlogs(nextCursor || undefined, selectedSort[0])
    }
  }, [
    inView,
    hasNext,
    isLoading,
    nextCursor,
    selectedSort,
    selectedTermId,
    selectedTime,
  ])

  const dropdownConfigs = [
    {
      type: 'year',
      title: selectedYear[0] || '기간',
      options: yearOptions,
      selected: selectedYear,
      visible: true,
    },
    {
      type: 'time',
      title: selectedTime[0] || '회차',
      options: timeOptions,
      selected: selectedTime,
      visible: !!selectedYear[0],
    },
    {
      type: 'sort',
      title: selectedSort[0] || '최신순',
      options: sortOptions,
      selected: selectedSort,
      visible: true,
    },
  ]

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex gap-3">
          {dropdownConfigs.map(
            ({ type, title, options, selected, visible }) =>
              visible && (
                <Dropdown
                  key={type}
                  title={title}
                  options={options}
                  selectedOptions={selected}
                  setSelectedOptions={(names) =>
                    handleDropdownSelect(type, names)
                  }
                  singleSelect={true}
                />
              ),
          )}
        </div>
        <Tooltip>
          <Image
            src="/images/question.svg"
            alt="question"
            width={20}
            height={20}
            className="cursor-pointer"
          />
        </Tooltip>
      </div>

      <div className="flex flex-col items-center">
        <div className="w-[1200px] mx-auto mt-5 flex items-center">
          <div className="flex-1"></div>
          <p className="text-2xl font-bold text-center text-[#FE9142] flex-1">
            블로깅 챌린지 참여 현황
          </p>
          <div className="flex-1 flex justify-end">
            {/* 현재 챌린지 기간이면서 아직 참여하지 않은 경우에만 버튼 표시 */}
            {isCurrentChallengePeriod() && !isAlreadyParticipating && (
              <button
                className="text-lg bg-[#FE9142] text-white px-9 py-1 rounded-xl hover:bg-darkPrimary flex items-center justify-center"
                onClick={handleApplyClick}
              >
                지원하기
              </button>
            )}
          </div>
        </div>
        <ParticipantProgressList selectedTermId={selectedTermId} />

        {blogs.length === 0 && !isLoading ? (
          <EmptyLottie
            text="블로그 데이터가 없습니다."
            text2="다시 조회해주세요"
          />
        ) : (
          <div className="w-full mt-10 grid grid-cols-4 gap-8">
            {blogs.map((blog, index) => (
              <BlogPost
                key={index}
                id={String(blog.blogId)}
                title={blog.title}
                url={blog.url}
                likeCount={blog.likeCount}
                authorName={blog.author}
                authorImage={
                  blog.authorImage || '/images/session/thumbnail.png'
                }
                date={blog.createdAt}
                image={blog.thumbnail}
                likeList={likeDate}
              />
            ))}
          </div>
        )}
        <div ref={ref} className="h-10 mt-4" />
      </div>
    </div>
  )
}
