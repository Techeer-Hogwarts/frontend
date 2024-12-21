import { ChangeEvent } from 'react'

interface SessionFileUploadProps {
  readonly fileKey: string
  readonly selectedFile: File | null
  readonly handleFileChange: (
    event: ChangeEvent<HTMLInputElement>,
    fileKey: string,
  ) => void
  readonly label: string
}

export default function SessionFileUpload({
  fileKey,
  selectedFile,
  handleFileChange,
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
          placeholder={selectedFile ? selectedFile.name : `+ ${label}`}
          className="w-[330px] pl-2 text-sm outline-none h-[34px] border border-lightgray"
          readOnly
        />
        <input
          id={`file-upload-${fileKey}`}
          type="file"
          onChange={(e) => handleFileChange(e, fileKey)}
          className="hidden"
        />
        <label
          htmlFor={`file-upload-${fileKey}`}
          className="w-[77px] text-gray text-sm h-[34px] border flex justify-center items-center border-lightgray cursor-pointer"
        >
          + 첨부
        </label>
      </div>
    </div>
  )
}
