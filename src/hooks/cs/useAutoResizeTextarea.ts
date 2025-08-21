'use client'

import { useRef, useEffect } from 'react'

/**
 * textarea의 높이를 내용에 맞게 자동으로 조절하는 훅
 * @param value textarea의 현재 값
 * @param enabled textarea가 활성화되어 있는지 여부 (편집 모드 등)
 * @returns textarea ref
 */
export const useAutoResizeTextarea = (
  value: string,
  enabled: boolean = true,
) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current && enabled) {
      // 높이를 자동으로 설정
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [value, enabled])

  return textareaRef
}
