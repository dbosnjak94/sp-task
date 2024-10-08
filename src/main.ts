import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

/**
 *  the app can be run with create(AppModule)
 */

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

/**
 * but when implementing NestFactory.createMicroservice I'm getting reflect-metadata error and I didn't have enough time to resolve this
 */

// async function bootstrap() {
//   const app = await NestFactory.createMicroservice<MicroserviceOptions>(
//     AppModule,
//     {
//       transport: Transport.TCP,
//     },
//   );
//   await app.listen();
// }
// bootstrap();
