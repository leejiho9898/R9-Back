import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HashtagsController } from "./hashtags.controller";
import { HashtagsRepository } from "./hashtags.repository";
import { HashtagsService } from "./hashtags.service";

const typeOrmModule = TypeOrmModule.forFeature([HashtagsRepository]);
@Module({
	imports: [typeOrmModule],
	controllers: [HashtagsController],
	providers: [HashtagsService],
	exports: [HashtagsService],
})
export class HashtagsModule {}
