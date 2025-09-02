'use client'

import { Line, Bar } from 'react-chartjs-2'
import { useAuthStore } from '@/store/authStore'
import { useGetStatisticsAPI } from '@/api/Statistics/statistics'
import Dropdown from '@/components/common/Dropdown'
import { useState, useMemo, useEffect } from 'react'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
)

const baseChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    title: { display: false },
    tooltip: { enabled: true, bodyFont: { size: 15 } },
  },
  scales: {
    x: {
      ticks: { font: { size: 15 } },
      grid: { display: false },
    },
    y: {
      min: 0,
      ticks: { font: { size: 15 } },
      grid: { color: '#eee', beginAtZero: true },
    },
  },
}

const blogChartOptions = {
  ...baseChartOptions,
  scales: {
    ...baseChartOptions.scales,
    y: {
      ...baseChartOptions.scales.y,
      min: 0,
      max: undefined,
      ticks: { ...baseChartOptions.scales.y.ticks, stepSize: 1 },
    },
  },
}

const commitChartOptions = {
  ...baseChartOptions,
  scales: {
    ...baseChartOptions.scales,
    y: {
      ...baseChartOptions.scales.y,
      min: 0,
      max: undefined,
      ticks: { ...baseChartOptions.scales.y.ticks, stepSize: 5 },
    },
  },
}

const zoomChartOptions = {
  ...baseChartOptions,
  scales: {
    ...baseChartOptions.scales,
    y: {
      ...baseChartOptions.scales.y,
      min: 0,
      max: undefined,
      ticks: { ...baseChartOptions.scales.y.ticks, stepSize: 1000 },
    },
  },
}

export default function Statistics() {
  const userId = useAuthStore((state) => state.user?.id)
  const year = useAuthStore((state) => state.user?.year)

  const { data, isLoading, error } = useGetStatisticsAPI(userId, year)

  // 연도 options 추출 (블로그, 커밋 데이터에서 year만 추출, 중복 제거, 내림차순 정렬)
  const yearOptions = useMemo(() => {
    const blogYears = data?.monthlyBlog?.map((b: any) => b.year) || []
    const commitYears =
      data?.weeklyGitHubContributions?.map((c: any) => c.year) || []
    return Array.from(new Set([...blogYears, ...commitYears]))
      .sort((a, b) => b - a)
      .map(String)
  }, [data])

  // 선택된 연도 state (기본값: yearOptions[0] 또는 현재 year)
  const [selectedYear, setSelectedYear] = useState<string[]>([])

  useEffect(() => {
    if (yearOptions.length > 0 && !selectedYear.length) {
      setSelectedYear([String(yearOptions[0])])
    }
  }, [yearOptions])

  // 연도별로 필터링된 데이터
  const filteredBlog =
    data?.monthlyBlog?.filter((b: any) =>
      selectedYear.includes(String(b.year)),
    ) || []
  const filteredCommits =
    data?.weeklyGitHubContributions?.filter((c: any) =>
      selectedYear.includes(String(c.year)),
    ) || []

  let commitChartData = {
    labels: [],
    datasets: [
      {
        label: '월별 커밋 개수',
        data: [],
        borderColor: '#71D7BA',
        backgroundColor: '#00C2FF33',
        pointRadius: 6,
        pointBackgroundColor: '#71D7BA',
        borderWidth: 3,
      },
    ],
  }

  // weeklyGitHubContributions에서 월별로 합산
  if (filteredCommits.length > 0) {
    const labels = Array.from({ length: 12 }, (_, i) => `${i + 1}월`)
    const monthlyMap: { [month: number]: number } = {}
    filteredCommits.forEach((item: any) => {
      if (!monthlyMap[item.month]) monthlyMap[item.month] = 0
      monthlyMap[item.month] += item.contributionCount
    })
    const chartData = labels.map((_, idx) => {
      const value = monthlyMap[idx + 1] || 0
      return value < 0 ? 0 : value
    })
    commitChartData = {
      labels,
      datasets: [
        {
          label: '월별 커밋 개수',
          data: chartData,
          borderColor: '#71D7BA',
          backgroundColor: '#00C2FF33',
          pointRadius: 6,
          pointBackgroundColor: '#71D7BA',
          borderWidth: 3,
        },
      ],
    }
  }

  // 월별 줌 접속시간 차트 데이터 생성
  let zoomData = {
    labels: Array.from({ length: 12 }, (_, i) => `${i + 1}월`),
    datasets: [
      {
        label: '월별 줌 접속시간(분)',
        data: Array(12).fill(0),
        backgroundColor: '#F57601',
        borderRadius: 8,
        barPercentage: 0.7,
        categoryPercentage: 0.7,
      },
    ],
  }
  if (data?.zoomStatistics) {
    const monthlyMap: { [month: number]: number } = {}
    data.zoomStatistics.forEach((item: any) => {
      monthlyMap[item.month] = item.totalMinutes
    })
    zoomData = {
      labels: Array.from({ length: 12 }, (_, i) => `${i + 1}월`),
      datasets: [
        {
          label: '월별 줌 접속시간(분)',
          data: Array.from({ length: 12 }, (_, i) => monthlyMap[i + 1] || 0),
          backgroundColor: '#F57601',
          borderRadius: 8,
          barPercentage: 0.7,
          categoryPercentage: 0.7,
        },
      ],
    }
  }

  // monthlyBlog에서 월별 블로그 글 개수 차트 데이터 생성
  let blogData = {
    labels: Array.from({ length: 12 }, (_, i) => `${i + 1}월`),
    datasets: [
      {
        label: '월별 블로그 글 개수',
        data: Array(12).fill(0),
        backgroundColor: '#F57601',
        borderRadius: 8,
        barPercentage: 0.7,
        categoryPercentage: 0.7,
      },
    ],
  }
  if (filteredBlog.length > 0) {
    const monthlyMap: { [month: number]: number } = {}
    filteredBlog.forEach((item: any) => {
      monthlyMap[item.month] = item.blogCount
    })
    blogData = {
      labels: Array.from({ length: 12 }, (_, i) => `${i + 1}월`),
      datasets: [
        {
          label: '월별 블로그 글 개수',
          data: Array.from({ length: 12 }, (_, i) => monthlyMap[i + 1] || 0),
          backgroundColor: '#F57601',
          borderRadius: 8,
          barPercentage: 0.7,
          categoryPercentage: 0.7,
        },
      ],
    }
  }

  return (
    <div
      style={{
        padding: '32px 0',
        maxWidth: 1250,
        margin: '0 auto',
        width: '100%',
      }}
    >
      {/* 필터(드롭다운) + 통계 제목 가로 배치 */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-black">통계</h2>
        <Dropdown
          title={selectedYear[0] ? `${selectedYear[0]}년` : '연도 선택'}
          options={yearOptions}
          selectedOptions={selectedYear}
          setSelectedOptions={setSelectedYear}
          singleSelect
        />
      </div>
      <div className="text-lg font-semibold mb-3 text-black/70">이력서</div>
      <div className="flex gap-6 mb-8">
        {/* 총 이력서 개수 카드 */}
        <div className="flex-1 flex items-center justify-center">
          <div
            style={{
              background: '#fff',
              borderRadius: 14,
              boxShadow: '0 2px 8px #0001',
              padding: 28,
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div className="mt-2 text-sm font-semibold text-black">
              총 이력서 개수
            </div>
            <div className="flex items-end justify-start">
              <div className="text-3xl font-bold text-gray-800">
                {data?.userResume?.resumeCount ?? 0}
              </div>
              {/* 날짜는 API에 없으므로 생략 */}
            </div>
          </div>
        </div>
        {/* 7기 평균 이력서 개수 카드 */}
        <div className="flex-1 flex items-center justify-center">
          <div
            style={{
              background: '#fff',
              borderRadius: 14,
              boxShadow: '0 2px 8px #0001',
              padding: 28,
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div className="mt-2 text-sm font-semibold text-black">
              {year}기 평균 이력서 개수
            </div>
            <div className="flex items-end">
              <div className="text-3xl font-bold text-gray-900">
                {data?.userResume?.averageResumeCount !== undefined
                  ? Number(data.userResume.averageResumeCount)
                      .toFixed(2)
                      .replace(/\.?0+$/, '') // 소수점 이하 0 제거
                  : 0}
              </div>
              <div
                className="ml-2 text-xs text-gray-400"
                style={{ fontWeight: 400, minWidth: 60 }}
              >
                &nbsp;
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 잔디 */}
      {/*
      <div className="w-full mb-8 flex flex-col gap-6">
        <div>
          <div className="text-lg font-semibold mb-3 text-black/70">잔디</div>
          <div
            style={{
              background: '#fff',
              borderRadius: 14,
              boxShadow: '0 2px 8px #0001',
              padding: 24,
              width: '100%',
              minWidth: 0,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
            }}
          >
            <div className="text-lg font-medium text-black mb-3 pl-1 pt-1">
              월별 커밋 개수
            </div>
            <div style={{ flex: 1, width: '100%', minWidth: 0 }}>
              {isLoading ? (
                <div>잔디 데이터를 불러오는 중...</div>
              ) : error ? (
                <div>잔디 데이터를 불러오지 못했습니다.</div>
              ) : commitChartData.datasets[0].data.some((v) => v > 0) ? (
                <Line
                  data={commitChartData}
                  options={commitChartOptions}
                  height={300}
                />
              ) : (
                <div
                  style={{
                    padding: '40px 0',
                    textAlign: 'center',
                    color: '#aaa',
                  }}
                >
                  월별 커밋 데이터가 없습니다.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      */}
      <div>
        <div className="text-lg font-semibold mb-3 text-black/70 mt-10">
          블로그
        </div>
        <div
          style={{
            background: '#fff',
            borderRadius: 14,
            boxShadow: '0 2px 8px #0001',
            padding: 24,
            width: '100%',
            minWidth: 0,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
          }}
        >
          <div className="text-lg font-medium text-black mb-3 pl-1 pt-1">
            월별 블로그 글 개수
          </div>
          <div style={{ flex: 1, width: '100%', minWidth: 0 }}>
            {blogData.datasets[0].data.some((v) => v > 0) ? (
              <Bar data={blogData} options={blogChartOptions} height={300} />
            ) : (
              <div
                style={{
                  padding: '40px 0',
                  textAlign: 'center',
                  color: '#aaa',
                }}
              >
                월별 블로그 데이터가 없습니다.
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        <div className="text-lg font-semibold mb-3 text-black/70 mt-10">
          테커 24시간 줌
        </div>
        <div
          style={{
            background: '#fff',
            borderRadius: 14,
            boxShadow: '0 2px 8px #0001',
            padding: 24,
            width: '100%',
            minWidth: 0,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
          }}
        >
          <div className="text-lg font-medium text-black mb-3 pl-1 pt-1">
            월별 줌 접속시간(분)
          </div>
          <div style={{ flex: 1, width: '100%', minWidth: 0 }}>
            <Bar data={zoomData} options={zoomChartOptions} height={300} />
          </div>
        </div>
      </div>
    </div>
  )
}
