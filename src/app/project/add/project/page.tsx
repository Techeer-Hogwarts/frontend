import AddMember from '@/components/project/add/AddMember'
import AddProfile from '@/components/project/add/AddProfile'
import AddRecruit from '@/components/project/add/AddRecruit'
import AddResults from '@/components/project/add/project/AddResults'
import AddStack from '@/components/project/add/project/AddStack'
import NecessaryQuestions from '@/components/project/add/NecessaryQuestions'

export default function page() {
  return (
    <div className="relative flex justify-between mt-[2.75rem]">
      <div>
        <AddProfile />
      </div>
      <div className="flex flex-col gap-7">
        <AddMember />
        <NecessaryQuestions />
        <AddRecruit />
        <AddStack />
        <AddResults />
        <button
          type="button"
          className="w-full h-[2.16044rem] rounded-[0.3125rem] text-primary border border-primary"
        > 
          등록하기
        </button>
      </div>
    </div>
  )
}
