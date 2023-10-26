import { setAccessToken } from './setAccessToken';
import { verifyAccessToken } from './verifyAccessToken';

interface Payload {
  id: number;
  uuid: string;
  name: string;
  email: string;
}
interface DecodedToken {
  id: number;
  uuid: string;
  name?: string;
  email: string;
}

export { setAccessToken, verifyAccessToken, Payload, DecodedToken };
