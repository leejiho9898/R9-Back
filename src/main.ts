import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import cookieParser from "cookie-parser";
import { AppModule } from "~/app.module";
import { ACCESS_TOKEN_NAME } from "~/common/constants/auth";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>("PORT");
  const origin = configService.get<string>("ORIGIN");
  const swaggerPath = configService.get<string>("SWAGGER_PATH");

  app.enableCors({
    origin,
    credentials: true,
  });

  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle("R9")
    .setDescription("R9 API")
    .setVersion("0.0.1")
    .addCookieAuth(
      ACCESS_TOKEN_NAME,
      { type: "apiKey", scheme: "", in: "cookie" },
      "auth"
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(swaggerPath, app, document);

  await app.listen(port);
}
bootstrap();
