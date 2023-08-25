import bcrypt from "bcrypt";
const SALT = 10;
const salt = bcrypt.genSaltSync(SALT);
export const hashPassword = (password: string) => {
  return bcrypt.hashSync(password, salt);
}

export const comparePassword = (password: string, hash:string) => {
  return bcrypt.compareSync(password,hash)
}