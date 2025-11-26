import { GoogleLoginButton } from '@/components/block/auth/google/GoogleLoginButton'
import LogoutButton from '@/components/block/auth/LogoutButton'
import MobilePageHeader from '@/components/block/mobile/MobilePageHeader'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { useAuthStore } from '@/stores/authStore'

export default function SettingsPage() {
  const { user, isAuthenticated } = useAuthStore()

  return (
    <div className="flex h-screen flex-col">
      <MobilePageHeader title="설정" />
      <div className="flex flex-1 flex-col items-center space-y-6 p-4">
        {isAuthenticated && user && (
          <>
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="font-semibold">프로필</CardTitle>
              </CardHeader>
              <CardContent className="flex gap-3">
                <Avatar className="flex h-16 w-16 items-center justify-center rounded-lg">
                  <AvatarImage src={user.user_metadata.avatar_url} alt="AvatarImage" />
                  <AvatarFallback>
                    <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gray-200">
                      <span className="text-xl font-bold text-gray-600">
                        {user.user_metadata.full_name[0].toUpperCase()}
                      </span>
                    </div>
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{user.user_metadata.full_name}</p>
                  <p className="text-sm font-medium text-gray-700">{user.email}</p>
                </div>
              </CardContent>
            </Card>
          </>
        )}
        <Card className="w-full">
          <CardHeader className="font-semibold">앱 설정</CardHeader>
          <CardContent>
            <ul className="flex w-full flex-col gap-3">
              <li className="flex items-center justify-between">
                <span>다크 모드</span>
                <Switch className="data-[state=checked]:bg-orange-400" />
              </li>
              <li className="flex items-center justify-between">
                <span>통화</span>
                <Select defaultValue="KRW">
                  <SelectTrigger className="w-1/2 md:w-1/4">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="KRW">₩ 대한민국 원</SelectItem>
                      <SelectItem value="USD">$ 미국 달러</SelectItem>
                      <SelectItem value="JPY">¥ 일본 엔</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </li>
              <li className="flex items-center justify-between">
                <span>언어 설정</span>
                <Select defaultValue="KR">
                  <SelectTrigger className="w-1/2 md:w-1/4">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="KR">한국어</SelectItem>
                      <SelectItem value="US">영어</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </li>
              <li className="flex items-center justify-between">
                <span>버전 정보</span>
                <span className="text-orange-400">0.0.1</span>
              </li>
              {user && isAuthenticated ? (
                <li className="flex items-center justify-between">
                  <span>로그아웃</span>
                  <LogoutButton className="w-1/2 md:w-1/4" />
                </li>
              ) : (
                <li className="flex items-center justify-between">
                  <span>로그인</span>
                  <GoogleLoginButton className="w-1/2 text-xs md:w-1/4" />
                </li>
              )}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
