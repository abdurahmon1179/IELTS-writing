export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          created_at: string
          email: string
          full_name: string | null
          plan: 'free' | 'mastery'
          essays_graded: number
          band_score_start: number | null
          band_score_current: number | null
          avatar_url: string | null
          is_active: boolean
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          plan?: 'free' | 'mastery'
          essays_graded?: number
          band_score_start?: number | null
          band_score_current?: number | null
          avatar_url?: string | null
          is_active?: boolean
        }
        Update: {
          full_name?: string | null
          plan?: 'free' | 'mastery'
          essays_graded?: number
          band_score_start?: number | null
          band_score_current?: number | null
          avatar_url?: string | null
          is_active?: boolean
        }
      }
    }
    Views: { [_ in never]: never }
    Functions: { [_ in never]: never }
    Enums: { [_ in never]: never }
  }
}
