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
  return (
    <div className="flex flex-row gap-5 w-[500px] mt-5">
      <Link
        href={ProjectDetail.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Git />
      </Link>
      <Link
        href={ProjectDetail.mediumUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Medium />
      </Link>
      <Link
        href={ProjectDetail.webUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Links />
      </Link>
    </div>
  )
}

export default ModalFooter
