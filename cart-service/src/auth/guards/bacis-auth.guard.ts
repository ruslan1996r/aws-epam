import { ExecutionContext, Injectable, UnauthorizedException, InternalServerErrorException } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './../../users/services/users.service';

@Injectable()
export class BasicAuthGuard extends AuthGuard('basic') {
  constructor(private userService: UsersService) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    try {
      const authHeader = req?.headers?.authorization || '';
      const [bearer, token] = authHeader?.split(" ")

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({ message: "User is not authorized!" })
      }

      const user = Buffer.from(token, 'base64').toString('ascii')

      if (!user) {
        throw new UnauthorizedException({ message: "Wrong token" })
      }

      const userName = user.split(':')[0];
      const userExists = await this.userService.findOne(userName);

      if (!userExists) {
        throw new UnauthorizedException({ message: "User is not exists" })
      }

      req.user = userExists;
      return true;
    } catch (error) {
      throw new InternalServerErrorException({ error: error?.message })
    }
  }
}
