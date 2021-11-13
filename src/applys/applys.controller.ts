import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Auth } from "~/auth/decorators/auth.decorator";
import { CurrentUser } from "~/common/decorators/current-user.decorator";
import { User } from "~/users/entities/user.entity";
import { ApplysService } from "./applys.service";
import { CreateApplyDto } from "./dto/create-apply.dto";

@Controller("applys")
@ApiTags("applys")
export class ApplysController {
  constructor(private applyService: ApplysService) {}

  @Post()
  @ApiOperation({
    summary: "지원서 생성API",
    description: "지원서를 작성한다.(지원하기)",
  })
  @Auth(["ANY"])
  createApply(
    @Body() createApplyDto: CreateApplyDto,
    @CurrentUser() user: User
  ) {
    return this.applyService.createApply(createApplyDto, user);
  }

  @Get()
  @ApiOperation({
    summary: "내가쓴 지원서 불러오기API",
    description: "내가쓴 지원서를 모두 불러온다.",
  })
  @Auth(["ANY"])
  findMyApplys(@CurrentUser() user: User) {
    return this.applyService.findMyApplys(user);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "지원서 삭제 API",
    description: "지원서를 삭제한다 (지원을 취소한다.)",
  })
  deleteApply(@Param("id") id: number) {
    return this.applyService.deleteApply(id);
  }
}
