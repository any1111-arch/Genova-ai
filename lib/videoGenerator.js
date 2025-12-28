export async function createVideoFromPrompt(prompt) {
  const res = await fetch('https://api.moonvalley.ai/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.MOONVALLEY_API_KEY}`,
    },
    body: JSON.stringify({ prompt })
  })
  const data = await res.json()
  return data.video_url
}
