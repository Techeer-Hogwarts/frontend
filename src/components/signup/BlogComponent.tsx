import React from 'react'
import { BlogType } from '@/types/signup/signup.type'

const BlogComponent = ({
  label,
  value,
  handleChange,
  placeholder,
  name,
}: BlogType) => {
  return (
    <div className="flex justify-between space-x-5">
      <div className="flex items-center justify-center w-[10rem] h-10 rounded-[0.25rem] text-primary border border-primary">
        {label}
        <span className="text-primary"></span>
      </div>
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        className="w-full h-10 px-4 border border-gray rounded-[0.25rem] focus:outline-none focus:border-primary"
        value={value}
        onChange={handleChange}
      />
    </div>
  )
}

export default BlogComponent
