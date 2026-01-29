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

  const ensureHttps = (url: string | null | undefined) => {
    if (!url) return ''
    const trimmed = url.trim()
    if (/^https?:\/\//i.test(trimmed)) {
      return trimmed
    }
    return `https://${trimmed}`
  }

  return (
    <div className="flex flex-col gap-3 w-full">
      <a
        href={ensureHttps(ProjectDetail.githubUrl)}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseButtonClass} bg-zinc-300 hover:bg-zinc-400`}
      >
        <Git className="w-5 h-5 text-black" />
        <span>Github</span>
      </a>

      {/* Medium Button - White */}
      {ProjectDetail.mediumUrl && (
        <a
          href={ensureHttps(ProjectDetail.mediumUrl)}
          target="_blank"
          rel="noopener noreferrer"
          className={`${baseButtonClass} border border-zinc-200 hover:bg-gray-50`}
        >
          <Medium className="w-5 h-5 text-black" />
          <span>Medium</span>
        </a>
      )}

      {/* Website Button - Primary */}
      {ProjectDetail.webUrl && (
        <a
          href={ensureHttps(ProjectDetail.webUrl)}
          target="_blank"
          rel="noopener noreferrer"
          className={`${baseButtonClass} bg-primary hover:brightness-95`}
        >
          <Links className="w-5 h-5 text-black" />
          <span>Website</span>
        </a>
      )}
    </div>
  )
}

export default ModalFooter
