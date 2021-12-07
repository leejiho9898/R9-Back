import { IsString } from "class-validator";

export abstract class PageRequest {
  @IsString()
  pageNo: string | 1;

  @IsString()
  pageSize: string | 10;

  getOffset(): number {
    return (Number(this.pageNo) - 1) * Number(this.pageSize);
  }

  getLimit(): number {
    return Number(this.pageSize);
  }
}
