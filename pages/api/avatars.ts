import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { withSentry } from '@sentry/nextjs'

const prisma = new PrismaClient()

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const avatars = await prisma.avatar.findMany({
      select: {
        id: true,
        name: true,
        image: true,
        description: true,
        attributes: {
          select: {
            trait_type: true,
            value: true,
          },
        },
      },
    })
    res.status(200).json(avatars)
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default withSentry(handler)
