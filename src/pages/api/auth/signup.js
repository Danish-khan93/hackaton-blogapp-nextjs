// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { saveUser } from "@/services/users";

export default function handler(req, res) {
  if (req.method !== "POST") {
    res.status(404).send();
  }
  const { firstName, lastName, email, password } = req.body;
  try {
    saveUser(firstName, lastName, email, password);
    res.status(201).send();
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error });
  }

}
