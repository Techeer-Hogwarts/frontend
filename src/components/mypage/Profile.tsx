'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import Select from '../signup/Select'
import ProfileInputField from './ProfileInputField'
import { AiOutlineSync } from 'react-icons/ai'
import { RxQuestionMarkCircled } from 'react-icons/rx'
import MyExperienceSection from './MyExperienceSection'
import { useRouter } from 'next/navigation'
import { deleteExperience } from '@/api/mypage/deleteExperience'
import { getProfileImg } from '@/api/mypage/getProfileImg'
import { updateProfile } from '@/api/mypage/updateProfile'

interface Experience {
  id?: number
  position: string
  companyName: string
  startDate: string
  endDate: string | null
  category?: string
  isCurrentJob?: boolean
  description?: string
  isFinished?: boolean
}

interface ProfileData {
  profileImage: string
  name: string
  email: string
  school: string
  grade: string
  year: number
  mainPosition: string
  subPosition: string
  githubUrl: string
  mediumUrl: string
  velogUrl: string
  tistoryUrl: string
  isLft: boolean
  experiences?: Experience[]
}

interface ProfileProps {
  profile: ProfileData | null
}

export default function Profile({ profile }: ProfileProps) {
  const router = useRouter()

  const [profileImage, setProfileImage] = useState(profile?.profileImage || '')
  const [name, setName] = useState(profile?.name || '')
  const [email, setEmail] = useState(profile?.email || '')
  const [school, setSchool] = useState(profile?.school || '')
  // "해당 없음"을 선택했을 때 사용자가 직접 입력한 학교명
  const [customSchool, setCustomSchool] = useState('')
  const [classYear, setClassYear] = useState(profile?.grade || '')
  const [year, setYear] = useState<number>(profile?.year || 6)
  const [githubUrl, setGithubUrl] = useState(profile?.githubUrl || '')
  const [mediumUrl, setMediumUrl] = useState(profile?.mediumUrl || '')
  const [velogUrl, setVelogUrl] = useState(profile?.velogUrl || '')
  const [tistoryUrl, setTistoryUrl] = useState(profile?.tistoryUrl || '')

  const [mainPosition, setMainPosition] = useState(profile?.mainPosition || '')
  const [subPosition, setSubPosition] = useState(profile?.subPosition || '')
  const [recommendation, setRecommendation] = useState<string>(
    profile && profile.isLft ? '예' : '아니요',
  )

  const internshipInitial =
    profile?.experiences?.filter((exp) => exp.category === '인턴') || []
  const fullTimeInitial =
    profile?.experiences?.filter((exp) => exp.category === '정규직') || []

  const [internshipExperience, setInternshipExperience] = useState<string>(
    internshipInitial.length > 0 ? '있어요' : '없어요',
  )
  const [jobExperience, setJobExperience] = useState<string>(
    fullTimeInitial.length > 0 ? '있어요' : '없어요',
  )

  const [internshipExperiences, setInternshipExperiences] = useState<
    Experience[]
  >(() => JSON.parse(JSON.stringify(internshipInitial)))

  const [fullTimeExperiences, setFullTimeExperiences] = useState<Experience[]>(
    () => JSON.parse(JSON.stringify(fullTimeInitial)),
  )

  const [deletedInternshipIds, setDeletedInternshipIds] = useState<number[]>([])
  const [deletedFullTimeIds, setDeletedFullTimeIds] = useState<number[]>([])
  const [syncMessage, setSyncMessage] = useState('')
  const [syncIsError, setSyncIsError] = useState(false)
  const [updateMessage, setUpdateMessage] = useState('')

  const bottomRef = useRef<HTMLDivElement>(null)

  // 프로필 사진 동기화
  const handleSync = async () => {
    setSyncMessage('')
    setSyncIsError(false)

    if (!email) {
      setSyncIsError(true)
      setSyncMessage('이메일 정보가 없습니다.')
      return
    }
    
    try {
      const data = await getProfileImg({ email })
      setProfileImage(data.profileImage)
      setSyncIsError(false)
      setSyncMessage('프로필 사진 동기화가 완료되었습니다.')
    } catch (err: any) {
      setSyncIsError(true)
      setSyncMessage('네트워크 오류가 발생했습니다.')
    }
  }

  const handleDeleteInternExp = (id: number) => {
    if (id && id > 0) {
      setDeletedInternshipIds((prev) => [...prev, id])
    }
    setInternshipExperiences((prev) => prev.filter((item) => item.id !== id))
  }

  const handleDeleteFullTimeExp = (id: number) => {
    if (id && id > 0) {
      setDeletedFullTimeIds((prev) => [...prev, id])
    }
    setFullTimeExperiences((prev) => prev.filter((item) => item.id !== id))
  }

  const handleProfileUpdate = async () => {
    setUpdateMessage('')

    if (school === '해당 없음' && !customSchool.trim()) {
      alert('학교명을 직접 입력해주세요.')
      return
    }

    if (!year) {
      alert('기수를 선택해주세요.')
      return
    }
    if (!classYear) {
      alert('학년을 선택해주세요.')
      return
    }

    if (!mainPosition) {
      alert('메인 포지션을 선택해주세요.')
      return
    }

    if (!githubUrl.trim()) {
      alert('깃허브 주소를 입력해주세요.')
      return
    }

    const finalSchool = school === '해당 없음' ? customSchool.trim() : school

    try {
      for (const delId of deletedInternshipIds) {
        await deleteExperience(delId)
      }
      for (const delId of deletedFullTimeIds) {
        await deleteExperience(delId)
      }
    } catch (err) {
      alert('경력 삭제 중 오류가 발생했습니다.')
      return
    }

    const finalInternships = internshipExperiences
      .filter((exp) => !deletedInternshipIds.includes(exp.id!))
      .map((exp) => {
        // 음수 ID => 새로 추가된 항목
        if (exp.id && exp.id < 0) {
          const { id, ...rest } = exp
          return {
            ...rest,
            category: '인턴',
          }
        } else {
          // 양수 ID => 기존 항목
          const { id, ...rest } = exp
          return {
            experienceId: id,
            ...rest,
            category: '인턴',
          }
        }
      })

    const finalFullTimes = fullTimeExperiences
      .filter((exp) => !deletedFullTimeIds.includes(exp.id!))
      .map((exp) => {
        if (exp.id && exp.id < 0) {
          // 새 항목
          const { id, ...rest } = exp
          return {
            ...rest,
            category: '정규직',
          }
        } else {
          // 기존 항목
          const { id, ...rest } = exp
          return {
            experienceId: id,
            ...rest,
            category: '정규직',
          }
        }
      })

    // PATCH "수정/추가" 처리
    const payload = {
      updateRequest: {
        year,
        isLft: recommendation === '예',
        school: finalSchool,
        grade: classYear,
        mainPosition,
        subPosition,
        githubUrl,
        ...(mediumUrl.trim() ? { mediumUrl } : {}),
        ...(velogUrl.trim() ? { velogUrl } : {}),
        ...(tistoryUrl.trim() ? { tistoryUrl } : {}),
      },
      experienceRequest: {
        experiences: [...finalInternships, ...finalFullTimes],
      },
    }

    try {
      await updateProfile(payload)
      setUpdateMessage('프로필 업데이트가 완료되었습니다.')
      window.location.reload()
    } catch (error: any) {
      setUpdateMessage('네트워크 오류가 발생했습니다.')
    }
  }

  // 포지션 옵션
  const positionOptions = [
    'FRONTEND',
    'BACKEND',
    'DEVOPS',
    'FULL_STACK',
    'DATA_ENGINEER',
  ]

  return (
    <div className="w-[890px] min-h-[1000px] flex flex-col gap-8">
      {/* 프로필 사진 */}
      <div className="flex">
        <h3 className="w-32 text-lg mt-[6px]">프로필 사진</h3>
        <Image
          src={profileImage}
          alt="profileImg"
          width={120}
          height={120}
          className="rounded-lg mr-3"
        />
        <div className="flex flex-col justify-end">
          <div className="flex justify-start gap-1 text-sm items-center text-gray">
            <RxQuestionMarkCircled />
            슬랙 사진과 동일하게 동기화 됩니다.
          </div>
          <div className="flex justify-start gap-2 text-sm items-center">
            <button
              onClick={handleSync}
              className="flex items-center justify-center text-primary w-[90px] h-8 border rounded-md border-primary"
            >
              <AiOutlineSync />
              동기화
            </button>
            {syncMessage && (
              <p
                className={`mt-1 text-sm ${
                  syncIsError ? 'text-red-500' : 'text-green'
                }`}
              >
                {syncMessage}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* 이름 */}
      <ProfileInputField
        title="이름"
        placeholder="이름을 입력해주세요"
        value={name}
        onChange={(e) => setName(e.target.value)}
        readOnly
      />

      {/* 학교 정보 */}
      <div className="flex items-start">
        <h3 className="flex w-[130px] h-[40px] items-center text-lg">
          학교 정보
        </h3>
        <div className="flex w-[420px] justify-start space-x-5">
          <div className="relative w-[200px]">
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
                '홍익대학교',
                '해당 없음',
              ]}
              value={school}
              onChange={(val) => setSchool(val)}
            />
            {/* "해당 없음" 선택 시, 직접 입력 필드 표시 */}
            {school === '해당 없음' && (
              <input
                type="text"
                placeholder="직접 입력"
                className="mt-2 w-[200px] h-10 px-4 border border-gray rounded-[0.25rem] focus:outline-none focus:border-primary"
                value={customSchool}
                onChange={(e) => setCustomSchool(e.target.value)}
              />
            )}
          </div>

          <div className="w-[200px]">
            <Select
              title="학년"
              options={[
                '1학년',
                '2학년',
                '3학년',
                '4학년',
                '졸업',
                '해당 없음',
              ]}
              value={classYear}
              onChange={(val) => setClassYear(val)}
            />
          </div>
        </div>
      </div>

      {/* 기수 */}
      <div className="flex items-center">
        <h3 className="w-[130px] text-lg mt-[6px]">기수</h3>
        <div className="flex w-[200px] justify-start space-x-5">
          <Select
            title="기수"
            options={[
              '1기',
              '2기',
              '3기',
              '4기',
              '5기',
              '6기',
              '7기',
              '8기',
              '9기',
            ]}
            value={year ? `${year}기` : ''}
            onChange={(val) => setYear(parseInt(val.replace('기', '')))}
          />
        </div>
      </div>

      {/* 메인/서브 포지션 */}
      <div className="flex items-center justify-between">
        <div className="flex">
          <h3 className="w-[130px] text-lg mt-[6px]">메인 포지션</h3>
          <div className="w-[200px]">
            <Select
              title="메인 포지션"
              options={positionOptions}
              value={mainPosition}
              onChange={(val) => setMainPosition(val)}
            />
          </div>
        </div>
        <div className="flex">
          <h3 className="w-[130px] text-lg mt-[6px]">서브 포지션</h3>
          <div className="w-[200px]">
            <Select
              title="서브 포지션"
              options={positionOptions.filter((pos) => pos !== mainPosition)}
              value={subPosition}
              onChange={(val) => setSubPosition(val)}
            />
          </div>
        </div>
      </div>

      {/* 링크 입력 */}
      <ProfileInputField
        title="깃허브"
        placeholder="깃허브 주소"
        value={githubUrl}
        onChange={(e) => setGithubUrl(e.target.value)}
      />
      <ProfileInputField
        title="미디엄"
        placeholder="Medium 주소"
        value={mediumUrl}
        onChange={(e) => setMediumUrl(e.target.value)}
      />
      <ProfileInputField
        title="벨로그"
        placeholder="Velog 주소"
        value={velogUrl}
        onChange={(e) => setVelogUrl(e.target.value)}
      />
      <ProfileInputField
        title="티스토리"
        placeholder="Tistory 주소"
        value={tistoryUrl}
        onChange={(e) => setTistoryUrl(e.target.value)}
      />

      {/* 추천 여부 */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg w-[130px]">프로필 추천</h3>
        <div className="flex gap-1">
          <button
            onClick={() => setRecommendation('예')}
            className={`flex text-sm h-10 items-center justify-center w-[90px] border rounded-md ${
              recommendation === '예'
                ? 'bg-primary text-white border-primary'
                : 'text-gray border-gray'
            }`}
          >
            예
          </button>
          <button
            onClick={() => setRecommendation('아니요')}
            className={`flex text-sm h-10 items-center justify-center w-[90px] border rounded-md ${
              recommendation === '아니요'
                ? 'bg-primary text-white border-primary'
                : 'text-gray border-gray'
            }`}
          >
            아니요
          </button>
        </div>
      </div>

      {/* 인턴 경험 */}
      <MyExperienceSection
        title="인턴 경험이 있나요?"
        experienceStatus={internshipExperience}
        setExperienceStatus={setInternshipExperience}
        experienceData={internshipExperiences}
        setExperienceData={setInternshipExperiences}
        experienceType="인턴"
        onDeleteItem={handleDeleteInternExp}
      />

      {/* 정규직 경험 */}
      <MyExperienceSection
        title="정규직 경험이 있나요?"
        experienceStatus={jobExperience}
        setExperienceStatus={setJobExperience}
        experienceData={fullTimeExperiences}
        setExperienceData={setFullTimeExperiences}
        experienceType="정규직"
        onDeleteItem={handleDeleteFullTimeExp}
      />

      {/* 업데이트 메시지 */}
      {updateMessage && <p className="text-green text-sm">{updateMessage}</p>}

      <div ref={bottomRef} className="border border-t-[1px] border-lightgray" />

      {/* 저장 버튼 */}
      <div className="flex justify-end">
        <button
          type="button"
          className="w-[90px] h-10 border rounded-md text-sm bg-primary text-white border-primary"
          onClick={handleProfileUpdate}
        >
          저장
        </button>
      </div>
    </div>
  )
}
