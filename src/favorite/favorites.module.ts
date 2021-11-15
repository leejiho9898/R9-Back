import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FavoritesController } from "./favorites.controller";
import { FavoritesRepository } from "./favorites.repository";
import { FavoritesService } from "./favorites.service";

const typeOrmModule = TypeOrmModule.forFeature([FavoritesRepository]);

@Module({
  imports: [typeOrmModule],
  controllers: [FavoritesController],
  providers: [FavoritesService],
  exports: [FavoritesService],
})
export class FavoritesModule {}
