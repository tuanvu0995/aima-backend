import { DatabaseModule } from '@modules/database';
import {
  DynamicModule,
  ForwardReference,
  Type,
  ValidationPipe,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';

export async function createTestServer(
  modules: (
    | Type<unknown>
    | DynamicModule
    | Promise<DynamicModule>
    | ForwardReference<unknown>
  )[],
) {
  const moduleFixture = await Test.createTestingModule({
    imports: [...modules, DatabaseModule],
  }).compile();

  const app = moduleFixture.createNestApplication();
  app.useGlobalPipes(new ValidationPipe());
  await app.init();

  return app;
}
