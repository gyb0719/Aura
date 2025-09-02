'use client'

import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from 'recharts'
import { motion } from 'framer-motion'

const matchingData = [
  { day: '월', matches: 4, likes: 12, views: 45 },
  { day: '화', matches: 7, likes: 18, views: 52 },
  { day: '수', matches: 5, likes: 15, views: 38 },
  { day: '목', matches: 9, likes: 22, views: 67 },
  { day: '금', matches: 12, likes: 28, views: 78 },
  { day: '토', matches: 15, likes: 35, views: 89 },
  { day: '일', matches: 8, likes: 20, views: 56 }
]

const compatibilityData = [
  { range: '90-100%', count: 12, color: '#10b981' },
  { range: '80-90%', count: 25, color: '#3b82f6' },
  { range: '70-80%', count: 18, color: '#8b5cf6' },
  { range: '60-70%', count: 8, color: '#f59e0b' },
  { range: '50-60%', count: 3, color: '#ef4444' }
]

export function WeeklyActivityChart() {
  return (
    <div className="h-80">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        주간 활동 통계
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={matchingData}>
          <defs>
            <linearGradient id="matchGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#ec4899" stopOpacity={0.1}/>
            </linearGradient>
            <linearGradient id="likeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="day" 
            stroke="#6b7280"
            fontSize={12}
          />
          <YAxis stroke="#6b7280" fontSize={12} />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
            }}
          />
          <Area
            type="monotone"
            dataKey="matches"
            stroke="#ec4899"
            fillOpacity={1}
            fill="url(#matchGradient)"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="likes"
            stroke="#8b5cf6"
            fillOpacity={1}
            fill="url(#likeGradient)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export function CompatibilityDistribution() {
  return (
    <div className="h-80">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        매칭 호환성 분포
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={compatibilityData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            dataKey="count"
            label={({ range, count }) => `${range}: ${count}명`}
          >
            {compatibilityData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export function SuccessRateChart() {
  const successData = [
    { month: '1월', rate: 78 },
    { month: '2월', rate: 82 },
    { month: '3월', rate: 85 },
    { month: '4월', rate: 88 },
    { month: '5월', rate: 91 },
    { month: '6월', rate: 87 }
  ]

  return (
    <div className="h-80">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        월별 매칭 성공률
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={successData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
          <YAxis stroke="#6b7280" fontSize={12} />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px'
            }}
          />
          <Bar 
            dataKey="rate" 
            fill="url(#barGradient)"
            radius={[4, 4, 0, 0]}
          />
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ec4899" stopOpacity={0.9}/>
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.9}/>
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}