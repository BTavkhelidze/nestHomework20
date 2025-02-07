import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class HasPermissionForDeleteAllUsers implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.headers["user-id"];
    if (!userId || userId !== "123")
      throw new BadRequestException("does not have a permissions ");

    return true;
  }
}
