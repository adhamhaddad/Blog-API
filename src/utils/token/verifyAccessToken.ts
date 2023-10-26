import { Request as ExpressRequest, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { setAccessToken, DecodedToken } from '.';
import AccessToken from '../../models/accessToken';

const publicAccessKey = path.join(
  __dirname,
  '..',
  '..',
  '..',
  'keys',
  'accessToken',
  'public.key'
);
interface Request extends ExpressRequest {
  user?: DecodedToken;
}
const accessToken = new AccessToken();

export const verifyAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorization = req.headers.authorization as string;
    if (!authorization) {
      return res.status(401).json({
        message: 'Not Authorized'
      });
    }
    const [bearer, token] = authorization.split(' ');
    if (bearer !== 'Bearer' || !token) {
      throw new Error(
        'Invalid Authorization header format. Format is "Bearer <token>".'
      );
    }
    try {
      const publicKey = await fs.promises.readFile(publicAccessKey, 'utf8');
      const decoded = jwt.verify(token, publicKey, {
        algorithms: ['RS256'],
        issuer: 'Blog-App'
      }) as DecodedToken;

      const cachedToken = await accessToken.getAccessToken(decoded.id);
      if (!cachedToken || cachedToken !== token) {
        throw new Error('Access token not found or expired');
      }
      req.user = { id: decoded.id, uuid: decoded.uuid, email: decoded.email };

      return next();
    } catch (err) {
      if ((err as Error).name !== 'TokenExpiredError') {
        throw new Error('Invalid access token');
      }
      return res.status(401).send('You need to login again');
    }
  } catch (err) {
    res.status(401).json({ message: (err as Error).message });
  }
};
