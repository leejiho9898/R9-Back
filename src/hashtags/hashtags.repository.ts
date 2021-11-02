import { EntityRepository, Repository } from "typeorm";
import { Hashtag } from "./entities/hashtag.entity";

@EntityRepository(Hashtag)
export class HashtagsRepository extends Repository<Hashtag> {
  async findCategory() {
    const found = await this.createQueryBuilder("t1")
      .select("t1.category", "category")
      .distinct(true)
      .getRawMany();
    return found;
  }
}
