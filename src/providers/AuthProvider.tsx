import { useSupabaseAuthSync } from '@/hooks/auth/useSupabaseAuthSync'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  useSupabaseAuthSync()

  return children
}
