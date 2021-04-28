import { Request, Response, NextFunction } from 'express';
import L from '../../common/logger';
import { User } from '../../../src/model/user';
import { ErrorResponseInternal } from './error.handler';

function roleAuthorizer(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const user: User = req.user as User;
  const requiredRoles: string[] = this.roles;
  let isUserInRole = false;
  requiredRoles.forEach(role => {
    if (!isUserInRole) {
      isUserInRole = user.roles.includes(role);
    }
  });
  L.debug(`isUserInRole ${isUserInRole}`)
  if (isUserInRole) {
    next();
  } else {
    next(new ErrorResponseInternal(401,'User is not in required role'));
  }
}

export default function authorizedRoles(roles: string[]) {
  const _this = {
    roles: roles,
    authorizer: roleAuthorizer,
  };
  const fn = _this.authorizer;
  const boundFn = fn.bind(_this);
  return boundFn;
}