import React from 'react'
import Git from '@/../public/git.svg'
import Medium from '@/../public/medium.svg'
import Links from '@/../public/link.svg'
import Link from 'next/link'
import { BootcampDetailType } from '@/types/bootcamp/bootcamp'

interface ModalFooterProps {
  ProjectDetail: BootcampDetailType
}

const ModalFooter = ({ ProjectDetail }: ModalFooterProps) => {
  const baseButtonClass =
    'flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all shadow-sm hover:shadow-md active:scale-95 font-semibold text-sm text-black'
  const disabledButtonClass =
    'flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-gray-400 cursor-not-allowed'

  return (
    <div className="flex flex-col gap-3 w-full">
      <Link
        href={ProjectDetail.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseButtonClass} bg-zinc-300 hover:bg-zinc-400`}
      >
        <Git className="w-5 h-5 text-black" />
        <span>Github</span>
      </Link>

      {/* Medium Button - White */}
      {ProjectDetail.mediumUrl && (
        <Link
          href={ProjectDetail.mediumUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${baseButtonClass} border border-zinc-200 hover:bg-gray-50`}
        >
          <Medium className="w-5 h-5 text-black" />
          <span>Medium</span>
        </Link>
      )}

      {/* Website Button - Primary */}
      {ProjectDetail.webUrl && (
        <Link
          href={ProjectDetail.webUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${baseButtonClass} bg-primary hover:brightness-95`}
        >
          <Links className="w-5 h-5 text-black" />
          <span>Website</span>
        </Link>
      )}
    </div>
  )
}

export default ModalFooter
