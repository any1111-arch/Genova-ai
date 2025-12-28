import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST allowed" });
  }

  const { email, prompt } = req.body;
  const VIDEO_COST = 5;

  if (!email || !prompt) {
    return res.status(400).json({ message: "Missing email or prompt" });
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.gems < VIDEO_COST) {
    return res.status(400).json({ message: "Not enough gems" });
  }

  // odečtení gemů
  const updatedUser = await prisma.user.update({
    where: { email },
    data: {
      gems: user.gems - VIDEO_COST,
    },
  });

  // FAKE generování videa
  const fakeVideoUrl = "https://genova.ai/videos/fake-video.mp4";

  return res.status(200).json({
    message: "Video generated",
    videoUrl: fakeVideoUrl,
    remainingGems: updatedUser.gems,
  });
}

