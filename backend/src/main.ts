import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './utils/HttpExeption.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');
  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      exceptionFactory: (errors) => {
        // Combine all error messages
        const errorMessages = errors.map((error) => {
          const constraint = Object.values(error.constraints)[0];
          return `${error.property}: ${constraint}`;
        });

        // Join all messages with semicolons
        const combinedMessage = errorMessages.join('; ');

        return new BadRequestException(combinedMessage);
      },
      // Remove stopAtFirstError since we want all errors
      // stopAtFirstError: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  const PORT = process.env.PORT || 8000;
  await app.listen(PORT);
  logger.verbose(`Application is running on: http://localhost:${PORT}`);
  logger.verbose(
    `Swagger documentation is available at: http://localhost:${PORT}/api/docs`,
  );
}
bootstrap();
