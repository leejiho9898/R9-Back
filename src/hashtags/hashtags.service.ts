import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateHashtagDto } from "./dto/create-hashtag.dto";
import { UpdateHashtagDto } from "./dto/update-hashtag.dto";
import { HashtagsRepository } from "./hashtags.repository";

@Injectable()
export class HashtagsService {
	constructor(
		@InjectRepository(HashtagsRepository)
		private readonly hashtagsRepository: HashtagsRepository,
	) {}

	async findHashtags(query) {
		const found = await this.hashtagsRepository.find({
			order: query,
			take: 10,
		});
		if (found.length < 1) {
			throw new NotFoundException("no date");
		}
		return found;
	}

	async createHashtag(createHashtagDto: CreateHashtagDto) {
		await this.hashtagsRepository.save(
			this.hashtagsRepository.create(createHashtagDto),
		);
		return "성공적으로 생성되었습니다.";
	}

	async findHashtagById(id: number) {
		const found = await this.hashtagsRepository.findOne({ id });
		if (!found) {
			throw new NotFoundException(`Hashtag with id '${id}' does not exist`);
		}
		return found;
	}

	async updateHashtag(id: number, updateHashtagDto: UpdateHashtagDto) {
		const found = await this.hashtagsRepository.findOne({ id });
		if (!found) {
			throw new NotFoundException(`Hashtag with id '${id}' does not exist`);
		}
		await this.hashtagsRepository.save(
			this.hashtagsRepository.create({ id, ...updateHashtagDto }),
		);
		return "성공적으로 업데이트 되었습니다.";
	}

	async deleteHashtag(id: number) {
		const found = await this.hashtagsRepository.findOne({ id });
		if (!found) {
			throw new NotFoundException(`Hashtag with id '${id}' does not exist`);
		}
		await this.hashtagsRepository.softDelete({ id });
		return "성공적으로 삭제되었습니다.";
	}

	async findHashtagsCategory() {
		const found = await this.hashtagsRepository.findCategory();
		if (!found) {
			throw new NotFoundException("no date");
		}
		return found;
	}
}
