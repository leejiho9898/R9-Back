import { Injectable } from "@nestjs/common";
import { FavoritesRepository } from "./favorites.repository";

@Injectable()
export class FavoritesService {
  constructor(private readonly favoritesRepository: FavoritesRepository) {}

  async findAllFavorites() {
    return await this.favoritesRepository.find({ take: 10 });
  }
}
