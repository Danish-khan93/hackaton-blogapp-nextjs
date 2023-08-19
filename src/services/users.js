import fs from "fs";
import path from "path";
import { hash, compare } from "bcryptjs";

const filePath = path.join(process.cwd(), "src", "data", "users.json");

export function getAll() {
  const allUserData = fs.readFileSync(filePath);
  //    console.log(JSON.parse(allUserData));
  return JSON.parse(allUserData);
}

export function getByEmail(email) {
  const data = getAll();
  return data.find((user) => user.email === email);
}
export async function varifyPassword(hashedPassword, password) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}

export async function saveUser(firstName, lastName, email, password) {
  const userFound = getByEmail(email);
  if (userFound) {
    throw new Error("user is already exist ");
  }
  const hashedPassword = await hash(password, 12);

  const data = getAll();
  data.push({
    id: data.length + 1,
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });
  fs.writeFileSync(filePath, JSON.stringify(data));
}
