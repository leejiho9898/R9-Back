import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HashtagController } from "./hashtag.controller";
import { HashtagRepository } from "./hashtag.repository";
import { HashtagService } from "./hashtag.service";

const typeOrmModule = TypeOrmModule.forFeature([HashtagRepository]);
@Module({
	imports: [typeOrmModule],
	controllers: [HashtagController],
	providers: [HashtagService],
	exports: [HashtagService],
})
export class HashtagModule {}
