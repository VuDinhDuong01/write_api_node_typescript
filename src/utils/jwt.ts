import jwt from 'jsonwebtoken'

export const singJWT = ({
  token,
  privateKey,
  option = {
    algorithm: 'HS256'
  }
}: {
  token: object | string | Buffer
  privateKey: string
  option?: jwt.SignOptions
}): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(token, privateKey, option, function (err, token) {
      if (!err) {
        resolve(token as string)
      }
      reject(err)
    })
  })
}

export const verifyJWT = ({ token, privateKey }: { token: string; privateKey: string }) => {
  return new Promise<jwt.JwtPayload>((resolve, reject) => {
    jwt.verify(token, privateKey, function (err, decoded) {
      if (err) {
        reject('access_token lỗi')
      }
      resolve(decoded as jwt.JwtPayload)
    })
  })
}
