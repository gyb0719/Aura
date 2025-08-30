import { requireAuth } from '@/lib/auth/utils'
import { Heart, Users, MessageCircle, Star } from 'lucide-react'
import Card from '@/components/ui/Card'

export default async function DashboardPage() {
  const user = await requireAuth()

  const stats = [
    { label: '새로운 매치', value: '12', icon: Heart, color: 'text-pink-600' },
    { label: '프로필 조회', value: '248', icon: Users, color: 'text-purple-600' },
    { label: '받은 메시지', value: '34', icon: MessageCircle, color: 'text-blue-600' },
    { label: '호감도 점수', value: '4.8', icon: Star, color: 'text-yellow-600' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            안녕하세요, {user.email?.split('@')[0]}님
          </h1>
          <p className="text-gray-600 mt-2">
            오늘도 좋은 인연을 만나보세요
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                오늘의 추천 매치
              </h2>
              <div className="space-y-4">
                <p className="text-gray-600">
                  프로필을 완성하면 AI가 최적의 매치를 추천해드립니다.
                </p>
              </div>
            </Card>
          </div>

          <div>
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                프로필 완성도
              </h2>
              <div className="space-y-4">
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-purple-600 bg-purple-200">
                        진행중
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-purple-600">
                        30%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-purple-200">
                    <div style={{ width: '30%' }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-600"></div>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  프로필을 완성하면 매칭률이 3배 증가합니다!
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}