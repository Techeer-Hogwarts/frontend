'use client'

import Image from 'next/image'
import Select from '../signup/Select'
import { useRef, useState } from 'react'
import { AiOutlineSync } from 'react-icons/ai'
import ProfileInputField from './ProfileInputField'
import PositionSelect from '../signup/PositionSelect'
import { RxQuestionMarkCircled } from 'react-icons/rx'
import MyExperienceSection from './MyExperienceSection'

export default function Profile() {
  const [selectedPositions, setSelectedPositions] = useState<string[]>([])
  const [internshipExperience, setInternshipExperience] = useState<
    string | null
  >(null) // 인턴 경험 yes or no
  const [jobExperience, setJobExperience] = useState<string | null>(null) // 취업 경험 yes or no
  const [internshipItems, setInternshipItems] = useState<number[]>([]) // 인턴 경력 아이템 배열
  const [jobItems, setJobItems] = useState<number[]>([]) // 정규직 경력 아이템 배열

  const addInternshipExperience = () => {
    setInternshipItems([...internshipItems, internshipItems.length + 1])
  }

  // 정규직 경력 추가
  const addJobExperience = () => {
    setJobItems([...jobItems, jobItems.length + 1])
  }
  const removeInternshipExperience = (index: number) => {
    setInternshipItems(internshipItems.filter((_, i) => i !== index))
  }

  // 정규직 경력 삭제
  const removeJobExperience = (index: number) => {
    setJobItems(jobItems.filter((_, i) => i !== index))
  }
  const handlePositionSelect = (position: string) => {
    if (selectedPositions.includes(position)) {
      // 이미 선택된 포지션이면 해제
      setSelectedPositions(
        selectedPositions.filter((item) => item !== position),
      )
    } else if (selectedPositions.length < 2) {
      // 2개 미만 선택된 경우 추가
      setSelectedPositions([...selectedPositions, position])
    }
  }
  const bottomRef = useRef<HTMLDivElement>(null)
  return (
    <div className="w-[750px] min-h-[1000px] flex flex-col gap-8">
      <div className="flex">
        <h3 className="w-32 text-lg mt-[6px]">프로필 사진</h3>
        <Image
          src="/pro.png"
          alt="profileImg"
          width={120}
          height={120}
          className="rounded-lg mr-3"
        />
        <div className="flex flex-col justify-end">
          <div className="flex justify-center gap-1 text-sm items-center text-gray">
            <RxQuestionMarkCircled />
            슬랙 사진과 동일하게 동기화 됩니다.
          </div>
          <button className="flex items-center justify-center  text-primary w-[90px] h-8 border rounded-md border-primary">
            <AiOutlineSync />
            동기화
          </button>
        </div>
      </div>
      <ProfileInputField
        title="이름"
        placeholder="이름을 입력해주세요(시니어멘토는 영어 이름 입력 가능)"
      />

      <div className="flex justify-between items-center">
        <h3 className="text-lg w-[130px]">이메일</h3>
        <div className="flex">
          <input
            type="text"
            placeholder="example@gmail.com"
            className="w-[520px] h-10 px-4 border border-gray rounded-[0.25rem] focus:outline-none focus:border-primary mr-2"
          />
          <button className="flex text-sm h-10 items-center justify-center text-white bg-primary w-[90px] border rounded-md border-primary">
            인증하기
          </button>
        </div>
      </div>
      <div className="flex items-center">
        <h3 className="w-[130px] text-lg">학교 정보</h3>
        <div className="flex w-72 justify-start space-x-5">
          <Select
            title="대학교"
            options={[
              '강원대학교',
              '가톨릭대학교',
              '가천대학교',
              '광운대학교',
              '단국대학교',
              '대구가톨릭대학교',
              '덕성여자대학교',
              '동덕여자대학교',
              '서강대학교',
              '성결대학교',
              '세종대학교',
              '안양대학교',
              '연세대학교',
              '이화여자대학교',
              '인천대학교',
              '인하대학교',
              '중앙대학교',
              '창원대학교',
              '충남대학교',
              '충북대학교',
              '평택대학교',
              '부산대학교',
              '한국공학대학교',
              '한서대학교',
              '한성대학교',
              '호서대학교',
              '해당 없음',
            ]}
          />
          <Select
            title="학년"
            options={['1학년', '2학년', '3학년', '4학년', '해당 없음']}
          />
        </div>
      </div>
      <div className="flex items-center">
        <h3 className="w-[130px] text-lg mt-[6px]">기수</h3>
        <div className="flex w-72 justify-start space-x-5">
          <Select
            title="기수"
            options={['1기', '2기', '3기', '4기', '5기', '6기', '7기', '8기']}
          />
        </div>
      </div>
      <div className="flex items-center">
        <h3 className="w-[130px] text-lg mt-[6px]">포지션</h3>
        <div className="w-[520px]">
          <PositionSelect
            selectedPositions={selectedPositions}
            handlePositionSelect={handlePositionSelect}
          />
        </div>
      </div>
      <ProfileInputField title="깃허브" placeholder="깃허브 주소" />
      <ProfileInputField title="블로그" placeholder="블로그 주소" />
      <div className="flex justify-between">
        <h3 className="text-lg mt-[6px]">
          프로필을 다른 사람들에게 추천하여 프로젝트에 참여할 기회를 늘릴까요?
        </h3>
        <div className="flex gap-1">
          <button className="flex text-sm h-10 items-center justify-center text-white bg-primary w-[90px] border rounded-md border-primary">
            예
          </button>
          <button className="flex text-sm h-10 items-center justify-center text-gray  w-[90px] border rounded-md border-gray">
            아니요
          </button>
        </div>
      </div>

      <MyExperienceSection
        title="인턴 경험이 있나요?"
        experienceStatus={internshipExperience}
        setExperienceStatus={setInternshipExperience}
        items={internshipItems}
        addExperience={addInternshipExperience}
        removeExperience={removeInternshipExperience}
      />

      <MyExperienceSection
        title="정규직 경험이 있나요?"
        experienceStatus={jobExperience}
        setExperienceStatus={setJobExperience}
        items={jobItems}
        addExperience={addJobExperience}
        removeExperience={removeJobExperience}
      />

      <div
        ref={bottomRef}
        className=" border border-t-[1px] border-lightgray"
      />
      <div className="flex justify-end">
        <button
          type="button"
          className="w-[90px] h-10 border rounded-md text-sm bg-primary text-white border-primary"
        >
          저장
        </button>
      </div>
    </div>
  )
}
