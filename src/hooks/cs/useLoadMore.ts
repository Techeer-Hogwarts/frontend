'use client'

interface UseLoadMoreProps {
  fetchNextPage: () => void
  hasNextPage: boolean | undefined
  isFetchingNextPage: boolean
}

export const useLoadMore = ({
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: UseLoadMoreProps) => {
  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }

  return {
    handleLoadMore,
    hasNextPage,
    isFetchingNextPage,
  }
}
