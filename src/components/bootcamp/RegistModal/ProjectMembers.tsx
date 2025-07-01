import React from 'react'
import { BootcampMemberType } from '@/types/bootcamp/bootcamp'

const ProjectMembers = ({ members, setIsModalOpen }) => {
  return (
    <section>
      <div className="flex flex-row items-center gap-2">
        <label className="block text-lg font-medium">포지션 인원</label>
        <button
          onClick={() => setIsModalOpen(true)}
          className="border border-lightgray text-gray rounded-md p-1 text-xs shadow-sm hover:shadow-[0px_0px_4px_1px_rgba(138,138,138,0.73)]"
        >
          +
        </button>
      </div>
      <div className="mt-4 grid grid-cols-4 gap-4">
        {members.length > 0 ? (
          members.map((member) => (
            <div
              key={`${member.userId}-${member.position}`}
              className="flex flex-col items-center"
            >
              {' '}
              <p className="mt-1 text-base">{member.name}</p>
              <p className="text-xs text-gray">{member.position}</p>
              {member.isLeader && (
                <div className="text-[10px] text-white bg-black bg-opacity-40 rounded px-2 mt-1">
                  Leader
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="col-span-4 text-center text-gray">
            아직 추가된 멤버가 없습니다.
          </p>
        )}
      </div>
    </section>
  )
}

export default ProjectMembers
