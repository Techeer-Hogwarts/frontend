import { useRouter } from 'next/navigation'
import { useState, useCallback } from 'react'
import { postBlogAPI } from '@/api/blog/blog'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const ADD_BLOG_KEY = 'addBlog'
const BLOGS_QUERY_KEY = 'blogs'

export const usePostBlog = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [blogLink, setBlogLink] = useState('')

  const { mutate: postBlog } = useMutation({
    mutationKey: [ADD_BLOG_KEY],
    mutationFn: postBlogAPI,
    onSuccess: () => {
      setBlogLink('')
      alert('블로그 글을 추가하였습니다.')
      queryClient.invalidateQueries({ queryKey: [BLOGS_QUERY_KEY] })
      window.location.href = '/blog'
    },
    onError: (err) => {
      console.error('블로그 글 추가 실패:', err.message)
      alert(`블로그 글 추가에 실패했습니다: ${err.message}`)
    },
  })

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setBlogLink(e.target.value)
    },
    [],
  )

  const handlePostBlog = useCallback(() => {
    if (blogLink) {
      postBlog(blogLink)
    } else {
      alert('블로그 링크를 입력해주세요.')
    }
  }, [blogLink, postBlog])

  const handleBack = useCallback(() => {
    router.back()
  }, [router])

  return {
    blogLink,
    handleInputChange,
    handlePostBlog,
    handleBack,
  }
}
