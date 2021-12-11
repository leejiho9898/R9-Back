import { Injectable } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";
import { Base } from "src/common/entities/base.entitiy";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@Injectable()
export class Hashtag extends Base {
  @PrimaryGeneratedColumn()
  @ApiProperty({ type: Number, description: "해시테그 ID" })
  @IsNumber()
  id: number;

  @Column({ nullable: true })
  @ApiProperty({ type: String, description: "작성자 ID" })
  @IsString()
  writerId: string;

  @Column({ nullable: true })
  @ApiProperty({ type: String, description: "카테고리" })
  @IsString()
  category: string;

  @Column()
  @ApiProperty({ type: String, description: "이름" })
  @IsString()
  name: string;

  // @ManyToMany(() => Job, (job) => job.hashtags)
  // @ApiProperty()
  // @IsNumber()
  // job?: Job;

  // @ManyToMany(() => User, (user) => user.useHashtag)
  // @ApiProperty()
  // @IsString()
  // useUser?: User;
}
