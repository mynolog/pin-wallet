import { Spinner } from '@/components/ui/spinner'

export default function GoogleCallbackPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center gap-4">
      <Spinner className="h-8 w-8 animate-spin text-orange-300" />
      <span className="text-sm font-semibold text-gray-700">로그인 처리 중입니다...</span>
    </div>
  )
}
