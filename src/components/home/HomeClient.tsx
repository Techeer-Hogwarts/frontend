'use client'

import BlogResumeSection from './BlogResumeSection'
import CsSection from './CsSection'
import HallOfFameSection from './HallOfFameSection'
import HomeNavBar from './HomeNavBar'
import MainSearchSection from './HomeSearchSection'
import ProjectStudySection from './ProjectStudySection'
import ScheduleSection from './ScheduleSection'

export default function HomeClient() {
  return (
    <>
      <HomeNavBar />
      <div className="w-full max-w-[1400px] mx-auto px-4">
        <MainSearchSection />
        <BlogResumeSection />
        <ProjectStudySection />
        <HallOfFameSection />
        <CsSection link="/cs" />
        <ScheduleSection />
      </div>
    </>
  )
}
