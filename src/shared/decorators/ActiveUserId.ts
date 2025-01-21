import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ActiveUserId = createParamDecorator<undefined>(
  (data, context: ExecutionContext) => {
    return '123456';
  },
);
