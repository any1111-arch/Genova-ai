import { supabase } from '../../../lib/supabase'

export default async function handler(req, res) {
  const { error } = await supabase.auth.signOut()
  if (error) return res.status(500).json({ error: error.message })
  res.status(200).json({ message: 'Logged out successfully' })
}
