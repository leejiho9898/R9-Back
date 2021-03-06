import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateHashtagDto } from "./dto/create-hashtag.dto";
import { UpdateHashtagDto } from "./dto/update-hashtag.dto";
import { HashtagsRepository } from "./hashtags.repository";

@Injectable()
export class HashtagsService {
  constructor(
    @InjectRepository(HashtagsRepository)
    private readonly hashtagsRepository: HashtagsRepository
  ) {}

  async findHashtags() {
    const found = await this.hashtagsRepository.find();
    return found;
  }

  async searchHashtags(query) {
    const found = await this.hashtagsRepository.find({
      where: query,
    });
    if (found.length < 1) {
      throw new NotFoundException("no date");
    }
    return found;
  }

  async createHashtag(createHashtagDto: CreateHashtagDto, writerId) {
    const { name, category } = createHashtagDto;
    const hashtag = {
      writerId,
      name,
      category,
    };
    await this.hashtagsRepository.save(this.hashtagsRepository.create(hashtag));
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
      this.hashtagsRepository.create({ id, ...updateHashtagDto })
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

  async findCategory() {
    const arr = [];

    const found = await this.hashtagsRepository.findCategory();

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < found.length; i++) {
      arr.push(found[i].category);
    }
    if (!found) {
      throw new NotFoundException("no date");
    }
    return arr;
  }
}
