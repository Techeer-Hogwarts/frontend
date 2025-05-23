import SectionItem from './SectionItem'

export default function Section2() {
  return (
    <div className="relative min-w-[1200px] z-20 h-fit left-1/2 mt-20 mb-60 -translate-x-1/2">
      {/* <div className="sticky top-1/3 left-0 w-full h-[300px] pointer-events-none">
        <AnimatePresence>
          {hasEntered && inView && (
            <motion.div
              key="sticky-images"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={fadeVariants}
            >
              <Image
                src="/images/onboarding/right.png"
                alt="right"
                className="absolute right-0"
                width={280}
                height={300}
              />
              <Image
                src="/images/onboarding/left.png"
                alt="left"
                className="absolute left-0"
                width={280}
                height={300}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div> */}
      <div className="gap-32 flex flex-col">
        <SectionItem
          title={['함께 몰입하고 함께 성장하는', '팀과 개인의 배움의 여정']}
          description={[
            '실전 프로젝트 기반의 협업을 통해',
            '집중도 높은 환경에서 실력을 키우고',
            '개인과 팀이 함께 성장하는 과정을 경험합니다.',
          ]}
          imageSrc="/images/onboarding/section2Table.png"
          reverse={true}
        />

        <SectionItem
          title={['실무 기반 학습과 함께하는', '깊이 있는 네트워킹']}
          description={[
            '실무 중심의 내부 세션과 초청 강연이 정기적으로 열립니다.',
            '온라인에 머무르지 않고, 오프라인에서도 교류하며',
            '지속 가능한 성장을 함께 만들어갑니다.',
          ]}
          imageSrc="/images/onboarding/section2Meeting.png"
          reverse={false}
        />
        <SectionItem
          title={[
            '언제든 함께할 수 있는 사람들과',
            '늘 연결되어 있는 성장의 공간',
          ]}
          description={[
            '같은 목표를 가진 사람들과 소통하고',
            '현업에서 활동 중인 실무자 멘토와 함께 고민을 나누며',
            '혼자서가 아닌 방식으로 성장할 수 있습니다.',
          ]}
          imageSrc="/images/onboarding/section2Party.png"
          reverse={true}
        />
      </div>
    </div>
  )
}
