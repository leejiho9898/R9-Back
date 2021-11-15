import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import S3 from "aws-sdk/clients/s3";
import { v4 as uuid } from "uuid";
import { UploadsQueryDto } from "./dto/uploads.query.dto";

@Injectable()
export class UploadsService {
  constructor(private readonly configService: ConfigService) {}

  s3 = new S3({
    region: this.configService.get<string>("AWS_REGION"),
    accessKeyId: this.configService.get<string>("AWS_ACCESS_KEY"),
    secretAccessKey: this.configService.get<string>("AWS_SECRET_ACCESS_KEY"),
  });

  async uploadFile(file: Express.Multer.File, querys: UploadsQueryDto) {
    return await this.s3
      .upload({
        Bucket: this.configService.get<string>("AWS_S3_BUCKET_NAME"),
        Key: `${querys.type}/${uuid()}`,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: "public-read",
      })
      .promise();
  }
}
