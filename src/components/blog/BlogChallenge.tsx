'use client'

import Tooltip from './Tip'
import Image from 'next/image'
import Dropdown from '../common/Dropdown'
import ParticipantProgressList from './ParticipantProgressList'
import { useEffect, useState } from 'react'
import {
  getBlogChallengeBlogsAPI,
  getBlogChallengeSummaryAPI,
  getBlogChallengeTermsAPI,
  postBlogChallengeAPI,
} from '@/api/blog/blog'
import EmptyLottie from '../common/EmptyLottie'
import BlogPost from './BlogPost'
import { useGetLikesAPI } from '@/api/likes/likes'
import { useInView } from 'react-intersection-observer'

const sortOptions = ['최신순', '조회순', '가나다순']

export function BlogChallenge() {
  const [terms, setTerms] = useState([])
  const [yearOptions, setYearOptions] = useState([])
  const [timeOptions, setTimeOptions] = useState([])
  const [selectedYear, setSelectedYear] = useState([])
  const [selectedTime, setSelectedTime] = useState([])
  const [selectedSort, setSelectedSort] = useState(['최신순'])
  const [selectedTermId, setSelectedTermId] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [nextCursor, setNextCursor] = useState(null)
  const [hasNext, setHasNext] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const { data: likeDate } = useGetLikesAPI('BLOG', 0, 50)
  const [ref, inView] = useInView({ threshold: 0.5 })

  // 공통 초기화 함수
  const resetBlogs = () => {
    setBlogs([])
    setNextCursor(null)
    setHasNext(true)
  }

  // 드롭다운 선택 핸들러 통합
  const handleDropdownSelect = (type, selectedNames) => {
    const selected = selectedNames[0]

    switch (type) {
      case 'year':
        setSelectedYear([selected])
        const foundTerm = terms.find((t) => t.termName === selected)
        if (foundTerm) setSelectedTermId(foundTerm.termId)
        break
      case 'time':
        setSelectedTime(selectedNames)
        break
      case 'sort':
        setSelectedSort(selectedNames)
        break
      default:
        break
    }

    resetBlogs()
  }

  useEffect(() => {
    getBlogChallengeTermsAPI().then((data) => {
      setTerms(data)
      const termNames = data.map((term) => term.termName)
      setYearOptions(termNames)
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

  const fetchBlogs = async (cursor, sortBy: string = '최신순') => {
    const sortByValue =
      sortBy === '조회순'
        ? 'viewCount'
        : sortBy === '가나다순'
          ? 'name'
          : 'latest'

    if (isLoading || !hasNext) return
    setIsLoading(true)
    try {
      let roundId
      if (selectedTime.length > 0 && timeOptions.length > 0) {
        const roundObj = timeOptions
          .map((name, idx) => ({ name, idx }))
          .find((item) => item.name === selectedTime[0])
        if (roundObj) roundId = roundObj.idx + 1
      }

      const res = await getBlogChallengeBlogsAPI(
        sortByValue,
        5,
        cursor,
        selectedTermId ? selectedTermId : undefined,
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
      setHasNext(res.nextCursor !== null && res.hasNext)
    } catch (err) {
      console.error('블로그 불러오기 실패:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    resetBlogs()
    fetchBlogs(undefined, selectedSort[0])
  }, [selectedSort, selectedTermId, selectedTime])

  useEffect(() => {
    if (inView && hasNext && !isLoading) {
      fetchBlogs(nextCursor || undefined, selectedSort[0])
    }
  }, [inView, hasNext, nextCursor, selectedSort, selectedTermId, selectedTime])

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex gap-3">
          <Dropdown
            title="기간"
            options={yearOptions}
            selectedOptions={selectedYear}
            setSelectedOptions={(names) => handleDropdownSelect('year', names)}
            singleSelect={true}
          />
          {selectedYear[0] && (
            <Dropdown
              title="회차"
              options={timeOptions}
              selectedOptions={selectedTime}
              setSelectedOptions={(names) =>
                handleDropdownSelect('time', names)
              }
              singleSelect={true}
            />
          )}
          <Dropdown
            title={selectedSort[0] || '최신순'}
            options={sortOptions}
            selectedOptions={selectedSort}
            setSelectedOptions={(names) => handleDropdownSelect('sort', names)}
            singleSelect={true}
          />
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
        <Image
          src="/images/blog/blogchallengebanner.png"
          alt="blog-challenge"
          width={1200}
          height={200}
          className="mt-5 object-cover"
        />
        <button
          className="bg-[#FE9142] text-white px-9 py-1 rounded-xl hover:bg-[#FE9142]/80"
          onClick={postBlogChallengeAPI}
        >
          지원하기
        </button>

        <ParticipantProgressList />

        {blogs.length === 0 && !isLoading ? (
          <EmptyLottie
            text="블로그 데이터가 없습니다."
            text2="다시 조회해주세요"
          />
        ) : (
          <div className="mt-8 grid grid-cols-4 gap-8">
            {blogs.map((blog, index) => (
              <BlogPost
                key={index}
                id={String(blog.blogId)}
                title={blog.title}
                url={blog.url}
                likeCount={blog.likeCount}
                authorName={blog.author}
                likeList={likeDate || []}
                userName={null}
                userImage={null}
                image={null}
                authorImage={null}
                category={null}
                date={null}
                onDelete={null}
              />
            ))}
          </div>
        )}
        <div ref={ref} className="h-10 mt-4" />
      </div>
    </div>
  )
}
