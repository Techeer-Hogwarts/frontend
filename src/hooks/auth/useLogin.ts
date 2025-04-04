'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { loginUser } from '../../api/auth/auth'
import { useForm } from 'react-hook-form'

export const useLogin = () => {
  const {
    handleSubmit,
    register,
    setError,
    watch,
    formState: { errors },
  } = useForm()

  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const { setIsLoggedIn } = useAuthStore()
  const router = useRouter()

  const [redirectPath, setRedirectPath] = useState<string | null>(null)
  const [form, setForm] = useState<string | null>(null)

  const password = watch('password')
  const email = watch('email')

  const isFormValid = password != '' && email != ''

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      setRedirectPath(params.get('redirect'))
      setForm(params.get('form'))
    }
  }, [])

  const handleLogin = async (data: { email: string; password: string }) => {
    try {
      await loginUser(data)
      setIsLoggedIn(true)
      if (redirectPath) {
        router.replace(redirectPath)
      } else if (form === 'signup') {
        router.replace('/')
      } else {
        router.back()
      }
    } catch (error) {
      if (error.message == 404) {
        setError('root', {
          message: '가입되지 않은 사용자입니다.',
        })
      } else if (error.message == 401) {
        setError('root', {
          message: '비밀번호가 틀렸습니다.',
        })
      } else {
        setError('root', {
          message: '로그인에 실패했습니다. 잠시 후 다시 시도해주세요.',
        })
      }
    } finally {
      setIsLoggingIn(false)
    }
  }

  return {
    handleSubmit,
    register,
    handleLogin,
    errors,
    isFormValid,
    isLoggingIn,
  }
}
