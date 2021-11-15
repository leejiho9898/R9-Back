import { IsEnum, IsOptional } from "class-validator";

export enum UploadType {
  USER_PROFILE = "user-profile",
  BOARD = "board",
}

export class UploadsQueryDto {
  @IsEnum(UploadType)
  @IsOptional()
  type?: UploadType;
}
