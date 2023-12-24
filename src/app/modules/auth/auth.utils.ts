import jwt, { JwtPayload } from 'jsonwebtoken';


/* create token  */

export const createToken = (
  jwtPayload: { userId: string; role: string },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};


/* token verify  */

export const tokenVerify  = (
  encryptedToken: string,
  secret: string,
) => {
  return jwt.verify(encryptedToken,secret) as JwtPayload;
};
