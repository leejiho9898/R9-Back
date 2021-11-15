import {
  Controller,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { UploadsQueryDto } from "./dto/uploads.query.dto";
import { UploadsService } from "./uploads.service";

@Controller("uploads")
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post()
  @UseInterceptors(FileInterceptor("file"))
  uploadFile(
    @Query() querys: UploadsQueryDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.uploadsService.uploadFile(file, querys);
  }
}
