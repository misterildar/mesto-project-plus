import { StatusCodes } from '../constants';

class ConflictError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.CONFLICT_ERROR;
  }
}

export default ConflictError;
