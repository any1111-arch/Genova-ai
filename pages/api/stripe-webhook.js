import { buffer } from 'micro'
import Stripe from 'stripe'
import { supabase } from '../../lib/supabase'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
export const config = { api: { bodyParser: false } }

export default async function handler(req, res) {
  const sig = req.headers['stripe-signature']
  const buf = await buffer(req)
  let event

  try {
    event = stripe.webhooks.constructEvent(
      buf.toString(),
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    return res.status(400).send(`Webhook error: ${err.message}`)
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const userId = session.metadata.userId

    const { data } = await supabase
      .from('users_meta').select('gems').eq('user_id', userId).single()

    if (data) {
      await supabase.from('users_meta')
        .update({ gems: data.gems + 10 }).eq('user_id', userId)
    }
  }

  res.status(200).end()
}
