import { NextApiRequest, NextApiResponse } from "next";
import { avatars } from "../../data/avatars";

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!Array.isArray(avatars)) {
      throw new Error("Cannot find user data");
    }

    res.status(200).json(avatars);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
