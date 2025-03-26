import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Onboarding from '@/app/page'

// framer-motion을 Mock 처리
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children }) => <div>{children}</div>,
  },
}))

describe('Onboarding Component', () => {
  it('renders all sections correctly', async () => {
    render(<Onboarding />)
    const banner = await screen.findByTestId('banner')
    const techeer = await screen.findByTestId('techeer')

    expect(banner).toBeInTheDocument()
    expect(techeer).toBeInTheDocument()
    // expect(screen.getByTestId('animated-image')).toBeInTheDocument()
  })
})
