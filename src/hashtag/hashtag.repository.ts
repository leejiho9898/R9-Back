import { EntityRepository, Repository } from "typeorm";
import { Hashtag } from "./entities/hashtag.entity";

@EntityRepository(Hashtag)
export class HashtagRepository extends Repository<Hashtag> {
	async findByCategory(category: string) {
		const found = await this.createQueryBuilder()
			.select("t1")
			.from(Hashtag, "t1")
			.where("t1.category = :category", { category })
			.getMany();
		return found;
	}

	async findCategory() {
		const found = await this.createQueryBuilder("t1")
			.select("t1.category", "category")
			.distinct(true)
			.getRawMany();
		return found;
	}
}
