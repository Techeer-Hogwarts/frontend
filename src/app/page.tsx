import FolderSVG from '../../public/folder.svg'
import GitSVG from '../../public/git.svg'
import BlogSVG from '../../public/blog.svg'
import PositionTag from '@/components/common/PositionTag'
import CareerTag from '@/components/common/CareerTag'
import UpadateModal from '@/components/resume/UpdateModal'

interface Profile {
  position: string
  career: string
}

export default function ProfileBox() {
  return (
    <div className="realtive flex w-[19rem] h-[23rem]">
      <UpadateModal />
    </div>
  )
}
