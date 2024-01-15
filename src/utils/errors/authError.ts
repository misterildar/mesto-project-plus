import { StatusCodes } from '../constants';

class AuthError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.AUTH_ERROR;
  }
}

export default AuthError;
