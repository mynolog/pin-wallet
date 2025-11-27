export interface Trip {
  id: string
  user_id: string
  title: string
  description: string | null
  start_date: string
  end_date: string
  created_at: string
  updated_at: string | null
}
