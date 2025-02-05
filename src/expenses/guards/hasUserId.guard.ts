import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from "@nestjs/common";
import { isValidObjectId } from "mongoose";

import { Observable } from "rxjs";

@Injectable()
export class HasUserId implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const userId = req.headers["user-id"];

    if (!userId || !isValidObjectId(userId))
      throw new BadRequestException("do not have permission ");
    req.userId = userId;
    return true;
  }
}
