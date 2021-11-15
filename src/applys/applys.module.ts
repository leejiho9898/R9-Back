import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "~/auth/auth.module";
import { ApplysController } from "./applys.controller";
import { ApplysService } from "./applys.service";
import { Apply } from "./entities/apply.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Apply]), AuthModule],
  controllers: [ApplysController],
  providers: [ApplysService],
})
export class ApplysModule {}
