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

      {ProjectDetail.mediumUrl ? (
        <Link
          href={ProjectDetail.mediumUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Medium />
        </Link>
      ) : (
        <Medium style={{ opacity: 0.5, cursor: 'not-allowed' }} />
      )}

      {ProjectDetail.webUrl ? (
        <Link
          href={ProjectDetail.webUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Links />
        </Link>
      ) : (
        <Links style={{ opacity: 0.5, cursor: 'not-allowed' }} />
      )}
    </div>
  )
}

export default ModalFooter
