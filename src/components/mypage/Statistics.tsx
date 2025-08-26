import { Line, Bar } from 'react-chartjs-2'
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

const resumeStats = {
  total: 5,
  avg: 2,
  date: '2025.05.05',
}

const commitData = {
  labels: ['4월', '5월', '6월', '7월', '8월', '9월', '10월'],
  datasets: [
    {
      label: '월별 커밋 개수',
      data: [100, 80, 60, 40, 20, 10, 0],
      borderColor: '#71D7BA',
      backgroundColor: '#00C2FF33',
      pointRadius: 6,
      pointBackgroundColor: '#71D7BA',
      borderWidth: 3,
    },
  ],
}

const blogData = {
  labels: [
    '2024-04',
    '2024-05',
    '2024-06',
    '2024-07',
    '2024-08',
    '2024-09',
    '2024-10',
    '2024-11',
    '2024-12',
    '2025-01',
    '2025-02',
    '2025-03',
  ],
  datasets: [
    {
      label: '월별 블로그 글 개수',
      data: [3, 2, 1, 2, 3, 45, 2, 1, 2, 12, 1, 2],
      backgroundColor: '#F57601',
      borderRadius: 8,
      barPercentage: 0.7,
      categoryPercentage: 0.7,
    },
  ],
}

const zoomData = {
  labels: [
    '2024-04',
    '2024-05',
    '2024-06',
    '2024-07',
    '2024-08',
    '2024-09',
    '2024-10',
    '2024-11',
    '2024-12',
    '2025-01',
    '2025-02',
    '2025-03',
  ],
  datasets: [
    {
      label: '월별 줌 접속시간',
      data: [3, 2, 1, 2, 3, 45, 2, 1, 2, 12, 1, 2],
      backgroundColor: '#F57601',
      borderRadius: 8,
      barPercentage: 0.7,
      categoryPercentage: 0.7,
    },
  ],
}

const chartOptions = {
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
      ticks: { font: { size: 15 } },
      grid: { color: '#eee', beginAtZero: true },
    },
  },
}

export default function Statistics() {
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
                {resumeStats.total}
              </div>
              <div
                className="ml-2 text-xs text-black/50"
                style={{ fontWeight: 400 }}
              >
                {resumeStats.date}
              </div>
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
              7기 평균 이력서 개수
            </div>
            <div className="flex items-end">
              <div className="text-3xl font-bold text-gray-900">
                {resumeStats.avg}
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
              <Line data={commitData} options={chartOptions} height={300} />
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
              <Bar data={blogData} options={chartOptions} height={300} />
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
              월별 줌 접속시간
            </div>
            <div style={{ flex: 1, width: '100%', minWidth: 0 }}>
              <Bar data={zoomData} options={chartOptions} height={300} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
