import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class HasPermissionForDeleteAll implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log(request);
    const key = request.headers["key"];
    console.log(key);
    if (!key || key !== "true") throw new BadRequestException("no eccess");
    return true;
  }
}
