import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersService } from "~/users/users.service";
import { UsersController } from "~/users/users.controller";
import { User } from "~/users/entities/user.entity";
import { Address } from "~/users/entities/address.entity";

const typeOrmModule = TypeOrmModule.forFeature([User, Address]);

@Module({
  imports: [typeOrmModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
