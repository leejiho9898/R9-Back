import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";
import { Base } from "src/common/entities/base.entitiy";
import { Job } from "src/jobs/entities/job.entity";
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "~/users/entities/user.entity";

@Entity()
export class Hashtag extends Base {
  @PrimaryGeneratedColumn()
  @ApiProperty({ type: Number, description: "해시테그 ID" })
  @IsNumber()
  id: number;

  /** 작성자 */
  @ManyToOne(() => User, (user) => user.hashtags, { eager: true })
  writer: User;

  @Column({ nullable: true })
  @ApiProperty({ type: String, description: "대분류" })
  @IsString()
  largeCategory: string;

  @Column({ nullable: true })
  @ApiProperty({ type: String, description: "소분류" })
  @IsString()
  smallCategory: string;

  @Column()
  @ApiProperty({ type: String, description: "이름" })
  @IsString()
  name: string;

  @ManyToMany(() => Job, (job) => job.hashtags)
  @ApiProperty()
  @IsNumber()
  job: Job;
}
