import { supabase } from '../../lib/supabase'
import OpenAI from 'openai'
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export default async function handler(req, res) {
  const { prompt, userId } = req.body
  const { data: userMeta } = await supabase
    .from('users_meta').select('gems').eq('user_id', userId).single()

  if (!userMeta || userMeta.gems < 2)
    return res.status(403).json({ error: 'Not enough gems (2 required for image)' })

  try {
    const response = await openai.images.generate({
      model: 'dall-e-3', prompt, n: 1, size: '1024x1024'
    })
    const image_url = response.data[0].url

    await supabase.from('users_meta')
      .update({ gems: userMeta.gems - 2 }).eq('user_id', userId)

    await supabase.from('images')
      .insert({ user_id: userId, prompt, image_url })

    res.status(200).json({ image_url })
  } catch (err) {
    res.status(500).json({ error: 'Image generation failed' })
  }
}
