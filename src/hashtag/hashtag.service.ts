import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateHashtagDto } from "./dto/create-hashtag.dto";
import { UpdateHashtagDto } from "./dto/update-hashtag.dto";
import { HashtagRepository } from "./hashtag.repository";

@Injectable()
export class HashtagService {
	constructor(
		@InjectRepository(HashtagRepository)
		private readonly hashtagRepository: HashtagRepository,
	) {}

	async findAll() {
		return await this.hashtagRepository.find();
	}

	async create(createHashtagDto: CreateHashtagDto) {
		await this.hashtagRepository.save(
			this.hashtagRepository.create(createHashtagDto),
		);
		return "성공적으로 생성되었습니다.";
	}

	async update(id: number, updateHashtagDto: UpdateHashtagDto) {
		const found = await this.hashtagRepository.findOne({ id });
		if (!found) {
			throw new NotFoundException(`Hashtag with id '${id}' does not exist`);
		}
		await this.hashtagRepository.save(
			this.hashtagRepository.create({ id, ...updateHashtagDto }),
		);
		return "성공적으로 업데이트 되었습니다.";
	}

	async delete(id: number) {
		const found = await this.hashtagRepository.findOne({ id });
		if (!found) {
			throw new NotFoundException(`Hashtag with id '${id}' does not exist`);
		}
		await this.hashtagRepository.softDelete({ id });
		return "성공적으로 삭제되었습니다.";
	}

	async findOneById(id: number) {
		const found = await this.hashtagRepository.findOne({ id });
		if (!found) {
			throw new NotFoundException(`Hashtag with id '${id}' does not exist`);
		}
		return found;
	}

	async findOneByName(name: string) {
		const found = await this.hashtagRepository.findOne({ name });
		if (!found) {
			throw new NotFoundException(`Hashtag with id '${name}' does not exist`);
		}
		return found;
	}

	async findByCategory(category: string) {
		const found = await this.hashtagRepository.find({ category });
		if (!found) {
			throw new NotFoundException(
				`Hashtag with id '${category}' does not exist`,
			);
		}
		return found;
	}

	async findCategory() {
		const found = await this.hashtagRepository.findCategory();
		if (!found) {
			throw new NotFoundException("no date");
		}
		return found;
	}
}
