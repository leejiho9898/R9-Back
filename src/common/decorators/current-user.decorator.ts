import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "src/users/entities/user.entity";

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const { user }: { user: User } = request;

    if (!user) {
      return null;
    }

    return user;
  }
);
