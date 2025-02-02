import { ChangeEvent } from 'react'

interface SessionFileUploadProps {
  readonly fileKey: string
  readonly label: string
}

export default function SessionFileUpload({
  fileKey,
  label,
}: SessionFileUploadProps) {
  return (
    <div>
      <p>
        {label} <span className="text-primary">*</span>
      </p>
      <div className="flex gap-2 mt-1 mb-3">
        <input
          type="text"
          placeholder={label}
          className="w-[330px] pl-2 text-sm outline-none h-[34px] border border-lightgray"
        />
        <input id={`file-upload-${fileKey}`} type="text" className="hidden" />
      </div>
    </div>
  )
}
