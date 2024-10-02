import React from 'react'

export default function Stack() {
  //더미값
  const backendStack = ['Go Lang', 'PostgreSQL', 'Nest.JS', 'Python']
  const frontendStack = ['Zustand', 'Next.js', 'TS']
  const devopsStack = ['Jenkins CI', 'GCP', 'Terraform', 'Github Actions']
  return (
    <div>
      <div className="text-[1.125rem] font-[600] mb-3">기술 스택</div>
      <div className="flex flex-col w-[52.5rem] p-4 rounded-2xl bg-filterbg gap-4 ">
        <StackCategory title="Backend" stack={backendStack} />
        <StackCategory title="Frontend" stack={frontendStack} />
        <StackCategory title="DevOps" stack={devopsStack} />
      </div>
    </div>
  )
}

interface BoxProps {
  text: string
}

const Box = ({ text }: BoxProps) => {
  return (
    <div className="flex items-center justify-center bg-lightprimary px-4 rounded-md h-[1.6rem] text-pink text-[0.9375rem]">
      {text}
    </div>
  )
}

interface StackCategoryProps {
  title: string
  stack: string[]
}

const StackCategory = ({ title, stack }: StackCategoryProps) => {
  return (
    <div className="flex gap-[1rem]">
      <div className="text-darkPrimary w-[4.76319rem] text-lg font-semibold">
        {title}
      </div>
      <div className="flex flex-wrap gap-2">
        {stack.map((tech, idx) => (
          <Box key={idx} text={tech} />
        ))}
      </div>
    </div>
  )
}
