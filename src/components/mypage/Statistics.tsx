import { Line, Bar } from 'react-chartjs-2'
import { useAuthStore } from '@/store/authStore'
import { useGetStatisticsAPI } from '@/api/Statistics/statistics'

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
  if (data?.weeklyGitHubContributions) {
    // 1~12월 라벨 생성
    const labels = Array.from({ length: 12 }, (_, i) => `${i + 1}월`)
    // 월별 합계 구하기
    const monthlyMap: { [month: number]: number } = {}
    data.weeklyGitHubContributions.forEach((item: any) => {
      if (!monthlyMap[item.month]) monthlyMap[item.month] = 0
      monthlyMap[item.month] += item.contributionCount
    })
    // 각 월별 데이터(없는 달은 0)
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
  if (data?.monthlyBlog) {
    const monthlyMap: { [month: number]: number } = {}
    data.monthlyBlog.forEach((item: any) => {
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
      <h2 className="text-2xl font-bold mb-8 text-black">통계</h2>
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
        <div>
          <div className="text-lg font-semibold mb-3 text-black/70">블로그</div>
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
          <div className="text-lg font-semibold mb-3 text-black/70">
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
    </div>
  )
}
