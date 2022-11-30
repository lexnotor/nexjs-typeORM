import { init } from "@/features/db";
import { Photo } from "@/features/PhotoModel";
import { User } from "@/features/USerModel";
import { NextApiRequest, NextApiResponse } from "next";

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  const db = await init();
  if (req.method == "POST") {
    const { id, title } = req.body;

    const user = await db.manager.findOne(User, {
      where: { id },
      relations: { photo: true },
    });
    if (!user)
      return res.status(404).json({ message: "user not found", data: {} });

    const photo = new Photo();
    photo.title = title;
    photo.user = user;

    const elm = await db.manager.save(photo);
    console.log(elm);
    console.log(user, id);
    return res.status(201).json({ message: "CREATED", data: { elm } });
  } else if (req.method == "GET") {
    const data = await db.manager.find(User);
    return res.status(200).json({ message: "FOUND", data });
  } else {
    return res.status(404).json({ message: "data not found", data: {} });
  }
};

export default handle;
