import Image from 'next/image'
export default function Techeer() {
  const steps = [
    {
      title: 'Discovery',
      subtitle: '대학별 SW 동아리',
      description: '기초 코딩 교육 목표',
    },
    {
      title: 'Intensive',
      subtitle: '6주간 집중 부트캠프',
      description: 'End-To-End\n실무형 프로젝트',
    },
    {
      title: 'Discipline',
      subtitle: 'Techeer 선발 가입',
      description:
        '이력서 및 취업 준비\n팀 프로젝트 운영\n실무중심 기술 운영 세션',
    },
    {
      title: 'Experience',
      subtitle: '인턴쉽 경험',
      description: '실리콘밸리 글로벌\n프리-인턴쉽 경험\n소프트웨어 마에스트로',
    },
    {
      title: 'Career',
      subtitle: '개발자 취업',
      description: '지속적 자기개발',
    },
  ]
  return (
    <>
      <Image width={300} height={300} src="/bookmark.png" alt="bookmark" />
      <div className="flex flex-col justify-center items-center w-[1200px] h-[40rem] bg-black">
        <span className="font-logo text-[130px] text-white">THECEER</span>
        <span className="text-white">실리콘밸리에서 직접 운영하는</span>
        <span className="text-primary">
          {'{'}실리콘밸리식 프로젝트와 멘토 시스템{'}'}
          <span className="text-white">으로 운영되는 코딩스쿨</span>
        </span>
      </div>
      <div className="flex flex-col justify-center items-center w-[1200px] h-[40rem] bg-black relative">
        {/* 반원 이미지 배경 */}
        <Image
          width={1200}
          height={500}
          src="/halfcircle.png"
          alt="halfcircle"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />

        {/* 메인 타이틀과 서브 타이틀 */}
        <div className="flex flex-col text-white items-center absolute top-1/3 transform -translate-y-1/3">
          <span className="font-bold text-[40px]">단계별 코딩 교육 모델</span>
          <span className="font-medium text-center mt-2">
            테커 부트캠프는 소프트웨어 전문가로 성장할 수 있는
            Intensive(집중적인) 경험을 제공을 목표로 설계
          </span>
        </div>

        {/* 단계별 구성 - 이미지 아래 위치 */}
        <div className="flex items-center justify-center mt-[16rem] w-full">
          <div className="flex flex-col items-center space-y-6">
            <div className="flex space-x-12 relative">
              {steps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center relative mb-4">
                    {index < steps.length && (
                      <div className="absolute inset-x-0 top-2 border-t-2 border-dotted border-white w-full"></div>
                    )}
                    <div className="flex items-center justify-center w-4 h-4 bg-darkPrimary rounded-full text-white font-bold">
                      {`step${index + 1}`}
                    </div>
                  </div>
                  <div className="flex justify-center items-center w-[160px] h-[30px] bg-primary text-white py-2 px-4 rounded-lg">
                    {step.title}
                  </div>
                  <div className="flex justify-center items-center w-[160px] h-[40px] mt-2 bg-gray font-semibold rounded-t-md">
                    {step.subtitle}
                  </div>
                  <div className="flex justify-center items-center w-[160px] h-[100px] bg-lightgray font-semibold text-sm whitespace-pre-line rounded-b-md">
                    {step.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
