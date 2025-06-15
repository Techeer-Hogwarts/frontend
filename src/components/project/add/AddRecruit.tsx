import { ChangeEvent } from 'react'
import RecruitInput from '../modal/RecruitInput'

interface AddRecruitProps {
  /** 'project' 또는 'study' 모드 지정 */
  variant: 'project' | 'study'
  /** 모집 중 여부 */
  isRecruited: boolean
  /** study variant 용 총 모집 인원 */
  recruitNum?: number
  /** project variant 용 각 역할별 모집 인원 */
  frontendNum?: number
  backendNum?: number
  devopsNum?: number
  fullStackNum?: number
  dataEngineerNum?: number
  /** 모집 설명 */
  recruitExplain: string
  /** 변경된 값을 상위로 전달 */
  onUpdate: (key: string, value: any) => void
}

export default function AddRecruit({
  variant,
  isRecruited,
  recruitNum,
  frontendNum,
  backendNum,
  devopsNum,
  fullStackNum,
  dataEngineerNum,
  recruitExplain,
  onUpdate,
}: AddRecruitProps) {
  const handleRecruitStatusChange = (status: string) => {
    const recruitFlag = status === '모집'
    onUpdate('isRecruited', recruitFlag)

    if (!recruitFlag) {
      if (variant === 'study') {
        onUpdate('recruitNum', 0)
      } else {
        onUpdate('frontendNum', 0)
        onUpdate('backendNum', 0)
        onUpdate('devopsNum', 0)
        onUpdate('fullStackNum', 0)
        onUpdate('dataEngineerNum', 0)
      }
      onUpdate('recruitExplain', '')
    }
  }

  const handleRecruitNumChange = (
    role: string,
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const value = Number(event.target.value)
    onUpdate(role, value)
  }

  const handleRecruitExplainChange = (
    event: ChangeEvent<HTMLTextAreaElement>,
  ) => {
    onUpdate('recruitExplain', event.target.value)
  }

  return (
    <div>
      {/* 모집 여부 선택 */}
      <div className="flex justify-between items-center">
        <p className="font-medium text-gray">
          인원 모집 여부<span className="text-primary">*</span>
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => handleRecruitStatusChange('모집')}
            className={`w-[10.875rem] h-[2.125rem] border ${
              isRecruited
                ? 'border-primary text-primary'
                : 'border-gray text-gray'
            } rounded-[0.1875rem]`}
          >
            모집
          </button>
          <button
            onClick={() => handleRecruitStatusChange('모집하지 않음')}
            className={`w-[10.875rem] h-[2.125rem] border ${
              isRecruited
                ? 'border-gray text-gray'
                : 'border-primary text-primary'
            } rounded-[0.1875rem]`}
          >
            모집하지 않음
          </button>
        </div>
      </div>

      {/* 모집 정보 입력 */}
      {isRecruited && (
        <div className="mt-6">
          <p className="font-medium text-gray mb-[1.22rem]">
            모집정보를 입력해주세요<span className="text-primary">*</span>
          </p>
          {variant === 'project' ? (
            <div className="flex gap-[0.84rem] flex-wrap">
              <RecruitInput
                role="Frontend"
                placeholder="1명"
                value={frontendNum || ''}
                onChange={(e) => handleRecruitNumChange('frontendNum', e)}
              />
              <RecruitInput
                role="Backend"
                placeholder="1명"
                value={backendNum || ''}
                onChange={(e) => handleRecruitNumChange('backendNum', e)}
              />
              <RecruitInput
                role="DevOps"
                placeholder="1명"
                value={devopsNum || ''}
                onChange={(e) => handleRecruitNumChange('devopsNum', e)}
              />
              <RecruitInput
                role="FullStack"
                placeholder="1명"
                value={fullStackNum || ''}
                onChange={(e) => handleRecruitNumChange('fullStackNum', e)}
              />
              <RecruitInput
                role="DataEngineer"
                placeholder="1명"
                value={dataEngineerNum || ''}
                onChange={(e) => handleRecruitNumChange('dataEngineerNum', e)}
              />
            </div>
          ) : (
            <RecruitInput
              role="인원 입력"
              placeholder="1명"
              value={recruitNum || ''}
              onChange={(e) => handleRecruitNumChange('recruitNum', e)}
            />
          )}

          <textarea
            value={recruitExplain || ''}
            onChange={handleRecruitExplainChange}
            maxLength={1000}
            className="w-full h-[11.375rem] border border-gray rounded-xl p-4 focus:outline-none resize-none"
            placeholder={`• Of the techeer, By the techeer, For the techeer
• 테커에서 사용할 수 있는 올인원 테커 포탈 서비스입니다
• 다양한 기술을 시도해보고 싶은 분들 환영합니다`}
          />
          <p className="text-right text-xs mt-1 text-gray">
            {recruitExplain.length}/1000
          </p>
        </div>
      )}
    </div>
  )
}
