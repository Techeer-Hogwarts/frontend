jest.mock('framer-motion', () => ({
  motion: {
    div: jest.fn(({ children }) => children),
  },
}))
