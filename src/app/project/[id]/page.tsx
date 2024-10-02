import Profile from '@/components/project/detail/Profile'
import RecommendedMember from '@/components/project/detail/RecommendedMember'
import Member from '@/components/project/detail/Member'
import Stack from '@/components/project/detail/Stack'
import FindMember from '@/components/project/detail/FindMember'
import Results from '@/components/project/detail/Results'

export default function ProjectDetailpage() {
  return (
    <div className="flex justify-between mt-[2.75rem]">
      <div>
        <Profile />
        <RecommendedMember />
      </div>
      <div className="flex flex-col gap-7">
        <Member />
        <Stack />
        <FindMember />
        <Results />
      </div>
    </div>
  )
}
