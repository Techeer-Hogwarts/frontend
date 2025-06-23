import React from 'react'
import { BootcampMemberType } from '@/types/bootcamp/bootcamp'

const ProjectMembers = ({ members, setIsModalOpen, handleRemoveMember }) => {
  return (
    <section>
      <div className="flex flex-row items-center gap-2 mb-5">
        <label className="block text-lg font-medium">포지션 인원</label>
        <button
          onClick={() => setIsModalOpen(true)}
          className="border border-lightgray text-gray rounded-md p-1 text-xs shadow-sm hover:shadow-[0px_0px_4px_1px_rgba(138,138,138,0.73)]"
        >
          +
        </button>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex gap-5">
          <p className="font-bold text-xl text-primary">Leader</p>
          <p className="flex gap-2 flex-wrap">
            {members
              .filter((member) => member.isLeader)
              .map((member) => (
                <span
                  key={member.userId}
                  className="bg-gray-200 text-sm px-3 py-1 rounded-full flex items-center gap-1 border border-gray"
                >
                  {member.name}
                  <button
                    onClick={() => handleRemoveMember(member.userId)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </span>
              ))}
          </p>
        </div>
        <div className="flex gap-5">
          <p className="font-bold text-xl text-primary">FE</p>
          <p className="flex gap-2 flex-wrap">
            {members
              .filter((member) => member.position == 'FRONTEND')
              .map((member) => (
                <span
                  key={member.userId}
                  className="bg-gray-200 text-sm px-3 py-1 rounded-full flex items-center gap-1 border border-gray"
                >
                  {member.name}
                  <button
                    onClick={() => handleRemoveMember(member.userId)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </span>
              ))}
          </p>
        </div>
        <div className="flex gap-5">
          <p className="font-bold text-xl text-primary">BE</p>
          <p className="flex gap-2 w-[100px] flex-wrap">
            {members
              .filter((member) => member.position == 'BACKEND')
              .map((member) => (
                <span
                  key={member.userId}
                  className="bg-gray-200 text-sm px-3 py-1 rounded-full flex items-center gap-1 border border-gray"
                >
                  {member.name}
                  <button
                    onClick={() => handleRemoveMember(member.userId)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </span>
              ))}
          </p>
        </div>
      </div>
    </section>
  )
}

export default ProjectMembers
