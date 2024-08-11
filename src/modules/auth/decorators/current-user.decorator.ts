import {
  createParamDecorator,
  ExecutionContext,
  Logger,
  NotFoundException,
} from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  async (data: unknown, context: ExecutionContext) => {
    const logger = new Logger(CurrentUser.name);
    const ctx = context.switchToHttp();
    const req = ctx.getRequest();
    const user = await req.user;

    if (!user?.id) {
      logger.error('User not found');
      throw new NotFoundException('User not found');
    }

    return user;
  },
);
