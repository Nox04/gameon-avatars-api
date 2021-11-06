import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const avatar = await prisma.avatar.findFirst({
      where: {
        id: _req.query.id as string,
      },
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

    if (!avatar) {
      res
        .status(404)
        .json({ statusCode: 404, message: 'Cannot find user data' })
    }
    res.status(200).json(avatar)
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
