import { Injectable, NotFoundException } from "@nestjs/common";
import { Page } from "~/common/page/page";
import { JobsService } from "~/jobs/jobs.service";
import { FavoritesRepository } from "./favorites.repository";

@Injectable()
export class FavoritesService {
  constructor(
    private readonly favoritesRepository: FavoritesRepository,
    private readonly jobsService: JobsService
  ) {}

  async findAllFavorites(page) {
    const total = await this.favoritesRepository.count();
    const found = await this.favoritesRepository.find({
      take: page.getLimit(),
      skip: page.getOffset(),
    });
    return new Page(total, page.pageSize, found);
  }

  async findMyFavorites(writer, page) {
    const total = await this.favoritesRepository.count({ writer });
    const found = await this.favoritesRepository.find({
      where: { writer },
      take: page.getLimit(),
      skip: page.getOffset(),
    });
    return new Page(total, page.pageSize, found);
  }

  async createFavorite(createFavoriteDto, writer) {
    const { jobId } = createFavoriteDto;
    const job = await this.jobsService.findJobById(jobId);
    if (!job) {
      throw new NotFoundException(
        `Job with id ${jobId} and user does not exist`
      );
    }
    const found = await this.favoritesRepository.findOne({ writer, job });

    if (found) {
      // 이미 관심이 있다면 삭제한다.
      const { id } = found;
      await this.favoritesRepository.delete(id);
    } else {
      // 관심이 없다면 생성한다.
      await this.favoritesRepository.save(
        this.favoritesRepository.create({ writer, job })
      );
    }
    return "success";
  }

  async deleteFavorite(id) {
    const found = await this.favoritesRepository.findOne({ id });
    if (!found) {
      throw new NotFoundException(
        `Favorite with id ${id} and user does not exist`
      );
    }
    await this.favoritesRepository.delete(id);
    return "success";
  }
}
