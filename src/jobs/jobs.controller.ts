import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Auth } from "src/auth/decorators/auth.decorator";
import { CurrentUser } from "src/common/decorators/current-user.decorator";
import { User } from "src/users/entities/user.entity";
import { CreateJobDto } from "./dto/create-job.dto";
import { SearchJobDto } from "./dto/search-job.dto";
import { UpdateJobDto } from "./dto/update-job.dto";
import { JobsService } from "./jobs.service";

@Controller("jobs")
@ApiTags("Jobs")
export class JobsController {
  constructor(private jobsService: JobsService) {}

  /** 공고 생성 */
  @Post()
  @ApiOperation({
    summary: "공고 생성API",
    description: "공고를 만든다.",
  })
  @Auth(["ANY"])
  createJob(@Body() createJobDto: CreateJobDto, @CurrentUser() writer: User) {
    return this.jobsService.createJob(createJobDto, writer);
  }

  /** 모든 공고 불러오기 */
  @Get()
  @ApiOperation({
    summary: "모든 공고 불러오기API",
    description: "모든 공고를 불러온다",
  })
  findAllJobs(@Query() page: SearchJobDto) {
    return this.jobsService.findJobs(page);
  }

  /** 특정  hashtag를 가진 공고 불러오기 */
  @Get("hashtag")
  @ApiOperation({
    summary: "특정 해시태그를 가진 공고 불러오기API",
    description: "특정 해시태그를 가진 공고들을 불러온다.",
  })
  findJobsByHashtag(
    @Query("ids", new ParseArrayPipe({ items: Number, separator: "," }))
    ids: number[]
  ) {
    return this.jobsService.findJobsByHashtag(ids);
  }

  /** hashtag를 통한 맞춤 공고 불러오기 */
  @Get("custom")
  @ApiOperation({
    summary: "특정 해시태그를 가진 공고 불러오기API",
    description: "특정 해시태그를 가진 공고들을 불러온다.",
  })
  @Auth(["ANY"])
  findJobsByHashtags(@CurrentUser() writer: User, @Query() page: SearchJobDto) {
    const hashtagIds = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < writer.useHashtags.length; i++) {
      hashtagIds.push(writer.useHashtags[i].id);
    }
    return this.jobsService.findJobsByHashtags(hashtagIds, page);
  }

  /** 내가올린 공고 불러오기 */
  @Get("me")
  @ApiOperation({
    summary: "자신이 쓴 공고 불러오기API",
    description: "자신이 쓴 공고들을 불러온다",
  })
  @Auth(["ANY"])
  findMyJobs(@CurrentUser() writer: User) {
    return this.jobsService.findMyJobs(writer);
  }

  /** 조건에 따른 공고 검색 불러오기 */
  @Get("search")
  @ApiOperation({
    summary: "조건을 만족하는 공고 불러오기API",
    description: "조건을 만족하는 공고를 불러온다.",
  })
  async findJobsSearch(@Query() page: SearchJobDto) {
    const result = this.jobsService.findJobsList(
      await this.jobsService.searchJobList(page)
    );

    return result;
  }

  /** 특정 공고 불러오기 */
  @Get(":id")
  @ApiOperation({
    summary: "특정 공고 불러오기API",
    description: "특정 id값을 가진 공고를 불러온다.",
  })
  findJobById(@Param("id") id: number) {
    return this.jobsService.findJobById(id);
  }

  /** 공고 삭제 */
  @Delete(":id")
  @ApiOperation({
    summary: "공고 삭제API",
    description: "특정 id값을 가진 공고를 불러온다.",
  })
  @Auth(["ANY"])
  deleteJob(@Param("id") id: number, @CurrentUser() writer: User) {
    return this.jobsService.deleteJob(id, writer);
  }

  /** 공고 업데이트 */
  @Patch(":id")
  updateJob(@Body() updateJobDto: UpdateJobDto, @Param("id") id: number) {
    return this.jobsService.updateJob(updateJobDto, id);
  }

  /** 공고 상태 업데이트 */
  @Patch("status/:id")
  @ApiOperation({
    summary: "공고 상태 업데이트",
    description: "공고가 INACTIVE 면 ACTIVE로, 반대면 반대로 한다.",
  })
  @Auth(["ANY"])
  switchJobState(@Param("id") id: number) {
    return this.jobsService.switchJobState(id);
  }
}
