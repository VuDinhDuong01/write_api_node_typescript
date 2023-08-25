import crypto from 'crypto'

export const hashPassword = (password: string) => {
  const salt = 'securitypassword'
  const hash = crypto.createHash('sha256');
  hash.update(password + salt);
  return hash.digest('hex');
}