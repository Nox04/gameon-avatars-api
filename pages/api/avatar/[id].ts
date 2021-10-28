import { NextApiRequest, NextApiResponse } from "next";
import { avatars } from "../../../data/avatars";

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!Array.isArray(avatars) || !_req?.query?.id) {
      throw new Error("Cannot find user data");
    }

    const avatar = avatars.find((a) => a.id === String(_req.query.id));

    if (!avatar) {
      res
        .status(404)
        .json({ statusCode: 404, message: "Cannot find user data" });
    }
    res.status(200).json(avatar);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
