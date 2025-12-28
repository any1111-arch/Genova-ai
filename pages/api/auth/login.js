import { supabase } from '../../../lib/supabase'

export default async function handler(req, res) {
  const { email } = req.body
  const { error } = await supabase.auth.signInWithOtp({ email })
  if (error) return res.status(500).json({ error: error.message })
  res.status(200).json({ message: 'OTP sent to email' })
}
