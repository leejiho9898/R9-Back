import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Auth } from "src/auth/decorators/auth.decorator";
import { CurrentUser } from "src/common/decorators/current-user.decorator";
import { User } from "src/users/entities/user.entity";
import { CreateJobDto } from "./dto/create-job.dto";
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
  findAllJobs() {
    return this.jobsService.findJobs();
  }

  /** 특정  hashtag를 가진 공고 불러오기 */
  @Get("hashtag/:hashtagId")
  @ApiOperation({
    summary: "특정 해시태그를 가진 공고 불러오기API",
    description: "특정 해시태그를 가진 공고들을 불러온다.",
  })
  findJobsByHashtag(@Param("hashtagId") hashtagId: number) {
    return this.jobsService.findJobsByHashtag(hashtagId);
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
  deleteJob(@Param("id") id: number, @CurrentUser() writer: User) {
    return this.jobsService.deleteJob(id, writer);
  }

  @Patch(":id")
  updateJob(@Body() updateJobDto: UpdateJobDto, @Param("id") id: number) {
    return this.jobsService.updateJob(updateJobDto, id);
  }
}
