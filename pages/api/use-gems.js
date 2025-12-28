import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST allowed" });
  }

  const { email, cost } = req.body; // cost = kolik gemů stojí akce (např. video)

  if (!email || !cost) {
    return res.status(400).json({ message: "Missing email or cost" });
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.gems < cost) {
    return res.status(400).json({ message: "Not enough gems" });
  }

  const updatedUser = await prisma.user.update({
    where: { email },
    data: {
      gems: user.gems - cost,
    },
  });

  return res.status(200).json({
    message: "Gems deducted",
    remainingGems: updatedUser.gems,
  });
}

