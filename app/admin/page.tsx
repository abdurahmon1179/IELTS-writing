import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import AdminClient from './AdminClient'

export default async function AdminPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/sign-in')

  // Fetch all profiles (admin only — protect with RLS or env check)
  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) console.error(error)

  // Stats
  const total = profiles?.length ?? 0
  const mastery = profiles?.filter(p => p.plan === 'mastery').length ?? 0
  const free = profiles?.filter(p => p.plan === 'free').length ?? 0
  const today = profiles?.filter(p => {
    const d = new Date(p.created_at)
    const now = new Date()
    return d.toDateString() === now.toDateString()
  }).length ?? 0

  const thisWeek = profiles?.filter(p => {
    const d = new Date(p.created_at)
    const now = new Date()
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    return d >= weekAgo
  }).length ?? 0

  return (
    <AdminClient
      profiles={profiles ?? []}
      stats={{ total, mastery, free, today, thisWeek }}
      adminEmail={user.email ?? ''}
    />
  )
}
