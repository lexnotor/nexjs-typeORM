import { init } from "@/features/db";
import { User } from "@/features/USerModel";
import { NextApiRequest, NextApiResponse } from "next";

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  const db = await init();
  if (req.method == "POST") {
    const { names, email, age } = req.body;

    const pes = new User();
    pes.age = age;
    pes.email = email;
    pes.names = names;

    const data = await db.manager.save(pes);

    return res.status(201).json({ message: "CREATED", data });
  } else if (req.method == "GET") {
    const data = await db.manager.find(User, { relations: { photo: true } });
    return res.status(200).json({ message: "FOUND", data });
  } else {
    return res.status(404).json({ message: "data not found", data: {} });
  }
};

export default handle;
/*
, { relations: { photo: true } }*/
