import { EntityRepository, Repository } from "typeorm";
import { Hashtag } from "./entities/hashtag.entity";

@EntityRepository(Hashtag)
export class HashtagsRepository extends Repository<Hashtag> {
  async findSmallCategory() {
    const found = await this.createQueryBuilder("t1")
      .select("t1.smallCategory", "smallCategory")
      .distinct(true)
      .getRawMany();
    return found;
  }

  async findLargeCategory() {
    const found = await this.createQueryBuilder("t1")
      .select("t1.largeCategory", "largeCategory")
      .distinct(true)
      .getRawMany();
    return found;
  }
}
