export interface CSProblem {
  problemId: number
  content: string
  isAnswered: boolean
}

export const getLatestCSProblem = async (): Promise<CSProblem> => {
  try {
    const response = await fetch('/api/v1/today-cs/today', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    throw error
  }
}
