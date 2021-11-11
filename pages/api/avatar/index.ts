import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { Avatar } from '../../../types'

const prisma = new PrismaClient()

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (_req.method !== 'POST') {
      return res.status(405).json({ message: 'Method Not Allowed' })
    }

    const avatarData = JSON.parse(_req.body) as Avatar

    const avatar = await prisma.avatar.findFirst({
      where: {
        id: avatarData.id,
      },
    })

    let savedAvatar

    if (!avatar) {
      savedAvatar = await prisma.avatar.create({
        data: {
          id: avatarData.id,
          name: avatarData.name,
          image: avatarData.image,
          description: avatarData.description,
          attributes: {
            create: avatarData.attributes,
          },
        },
      })
    } else {
      await prisma.attribute.deleteMany({
        where: {
          avatarId: avatarData.id,
        },
      })

      savedAvatar = await prisma.avatar.update({
        where: {
          id: avatarData.id,
        },
        data: {
          id: avatarData.id,
          name: avatarData.name,
          image: avatarData.image,
          description: avatarData.description,
          attributes: {
            create: avatarData.attributes,
          },
        },
      })
    }

    if (savedAvatar) {
      res.status(200).json(savedAvatar)
    } else {
      res
        .status(500)
        .json({ statusCode: 500, message: 'Error creating the avatar' })
    }
  } catch (err: any) {
    console.log(err)

    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
